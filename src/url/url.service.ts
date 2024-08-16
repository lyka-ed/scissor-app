import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateUrlDto } from './dto/create-url.dto';
import { GetShortUrlDto } from './dto/getshorturl.dto.ts';
import { GetLinkHistoryDto } from '../linkhistory/dto/getlinkhistory.dto.ts';
import { Url } from './entities/url.entity';
import { LinkHistory } from '../linkhistory/entities/linkhistory.entity';
import { Analytics } from '../analytics/entities/analytics.entity';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Url.name) private readonly urlModel: Model<Url>,
    @InjectModel(LinkHistory.name)
    private readonly linkHistoryModel: Model<LinkHistory>,
    @InjectModel(Analytics.name)
    private readonly analyticsModel: Model<Analytics>,
  ) {}

  async createShortUrl(dto: CreateUrlDto, auth0Id: string): Promise<Url> {
    try {
      const { destination, customAlias } = dto;

      if (!destination) {
        throw new BadRequestException('Destination is required');
      }

      if (customAlias && (await this.urlModel.findOne({ customAlias }))) {
        throw new BadRequestException('Custom URL already in use');
      }

      const shortId = customAlias || nanoid(4);
      const newUrl = new this.urlModel({
        shortId,
        destination,
        auth0Id,
        clicks: 0,
        customAlias: customAlias?.trim() || undefined,
        createdAt: new Date(),
      });

      return await newUrl.save();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create short URL');
    }
  }

  async getShortUrlByShortId(dto: GetShortUrlDto): Promise<Url> {
    try {
      const { shortId } = dto;
      const shortUrl = await this.urlModel.findOne({
        $or: [{ shortId }, { customAlias: shortId }],
      });

      if (!shortUrl) {
        throw new NotFoundException('URL not found');
      }

      shortUrl.clicks += 1;
      await shortUrl.save();
      return shortUrl;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve short URL');
    }
  }

  async getLinkHistoryByUserId(dto: GetLinkHistoryDto): Promise<LinkHistory[]> {
    try {
      return this.linkHistoryModel.find({ userId: dto.userId }).lean();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve link history');
    }
  }

  async clearLinkHistory(auth0Id: string): Promise<void> {
    try {
      const userLinks = await this.urlModel.find({ auth0Id }).lean();
      const shortIds = userLinks.map((url) => url._id);
      await this.analyticsModel.deleteMany({ shortId: { $in: shortIds } });
      await this.urlModel.deleteMany({ auth0Id });
    } catch (error) {
      throw new InternalServerErrorException('Failed to clear link history');
    }
  }
}
