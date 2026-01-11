import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { LinkEntity } from './entities/link.entity';
import {
  generateQrCode,
  generateRandomCode,
} from '../utils/helper/link.helper';

@Injectable()
export class LinksService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async shorten(userId: number, dto: CreateLinkDto): Promise<LinkEntity> {
    let shortCode = dto.alias;

    if (shortCode) {
      const exists = await this.prisma.link.findUnique({
        where: { shortUrl: shortCode },
      });
      if (exists) {
        throw new BadRequestException('This alias is already taken.');
      }
    } else {
      let isUnique = false;
      while (!isUnique) {
        shortCode = generateRandomCode();
        const exists = await this.prisma.link.findUnique({
          where: { shortUrl: shortCode },
        });
        if (!exists) isUnique = true;
      }
    }

    const link = await this.prisma.link.create({
      data: {
        originalUrl: dto.originalUrl,
        shortUrl: shortCode!,
        userId,
      },
    });

    let qrCodeData: string | undefined;
    if (dto.generateQr) {
      const baseUrl = process.env.APP_URL || 'http://localhost:3000';
      qrCodeData = await generateQrCode(`${baseUrl}/${link.shortUrl}`);
    }

    return new LinkEntity(link, qrCodeData);
  }

  async getOriginalUrl(
    code: string,
    ip?: string,
    userAgent?: string,
  ): Promise<string> {
    const cachedUrl = await this.cacheManager.get<string>(`link_${code}`);
    if (cachedUrl) {
      this.trackClick(code, ip, userAgent);
      return cachedUrl;
    }

    const link = await this.prisma.link.findUnique({
      where: { shortUrl: code },
    });

    if (!link) {
      throw new NotFoundException('Link not found or expired');
    }

    await this.cacheManager.set(`link_${code}`, link.originalUrl, 3600 * 1000);
    await this.trackClick(code, ip, userAgent, link.id);

    return link.originalUrl;
  }

  async getUserLinks(userId: number) {
    const links = await this.prisma.link.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { analytics: true } } },
    });

    return links.map((link) => new LinkEntity(link));
  }

  private async trackClick(
    code: string,
    ip?: string,
    userAgent?: string,
    linkId?: number,
  ) {
    if (!linkId) {
      const link = await this.prisma.link.findUnique({
        where: { shortUrl: code },
        select: { id: true },
      });
      if (!link) return;
      linkId = link.id;
    }

    await this.prisma.link.update({
      where: { id: linkId },
      data: { clicks: { increment: 1 } },
    });

    // Keep record Detailed Analytics
    await this.prisma.analytics.create({
      data: {
        linkId: linkId,
        ipAddress: ip || 'unknown',
        userAgent: userAgent || 'unknown',
      },
    });
  }
}
