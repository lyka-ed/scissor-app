import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import {
  generateRandomCode,
  generateQrCode,
} from '../utils/helper/link.helper';

@Injectable()
export class LinksService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // --- 1. CREATE LINK (Shorten + QR) ---
  async shorten(userId: number, dto: CreateLinkDto) {
    let shortCode = dto.alias;

    // A. Handle Alias / Random Generation
    if (shortCode) {
      // FIX: Changed .Link to .link
      const exists = await this.prisma.link.findUnique({
        where: { shortUrl: shortCode },
      });
      if (exists) throw new BadRequestException('This alias is already taken.');
    } else {
      let isUnique = false;
      while (!isUnique) {
        shortCode = generateRandomCode();

        // FIX: Ensure this is .link (lowercase)
        const exists = await this.prisma.link.findUnique({
          where: { shortUrl: shortCode },
        });
        if (!exists) isUnique = true;
      }
    }

    // B. Save to DB
    const link = await this.prisma.link.create({
      data: {
        originalUrl: dto.originalUrl,
        shortUrl: shortCode!,
        userId,
      },
    });

    // C. Generate QR Code
    const domain = process.env.DOMAIN || 'http://localhost:3000';
    const fullUrl = `${domain}/${link.shortUrl}`;
    const qrCode = await generateQrCode(fullUrl);

    return {
      ...link,
      shortUrl: fullUrl,
      qrCode: qrCode,
    };
  }

  // --- 2. GET ORIGINAL URL (Redirect) ---
  async getOriginalUrl(code: string, ip?: string, userAgent?: string) {
    // A. Check Cache
    const cachedUrl = await this.cacheManager.get<string>(`link_${code}`);
    if (cachedUrl) {
      this.trackClick(code, ip, userAgent);
      return cachedUrl;
    }

    // B. Check DB
    const link = await this.prisma.link.findUnique({
      where: { shortUrl: code },
    });
    if (!link) throw new NotFoundException('Link not found or expired');

    // C. Cache it for 1 hour
    await this.cacheManager.set(`link_${code}`, link.originalUrl, 3600 * 1000);

    // D. Track Analytics
    this.trackClick(code, ip, userAgent, link.id);

    return link.originalUrl;
  }

  // --- 3. LINK HISTORY ---
  async getUserLinks(userId: number) {
    return this.prisma.link.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // --- 4. ANALYTICS HELPER ---
  private async trackClick(
    code: string,
    ip?: string,
    userAgent?: string,
    linkId?: number,
  ) {
    if (!linkId) {
      const link = await this.prisma.link.findUnique({
        where: { shortUrl: code },
      });
      if (!link) return;
      linkId = link.id;
    }

    await this.prisma.link.update({
      where: { id: linkId },
      data: { clicks: { increment: 1 } },
    });

    // Ensure 'analytics' model exists in schema.prisma and is lowercase here
    await this.prisma.analytics.create({
      data: {
        linkId: linkId,
        ipAddress: ip || 'unknown',
        userAgent: userAgent || 'unknown',
      },
    });
  }
}
