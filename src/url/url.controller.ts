import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Query,
  Param,
  Req,
  UseGuards,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { Request } from 'express';
import { UrlsService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { GetLinkHistoryDto } from '../linkhistory/dto/getlinkhistory.dto.ts';
import { Url } from './entities/url.entity';
import { LinkHistory } from '../linkhistory/entities/linkhistory.entity';

@Controller('urls')
@UseGuards(AuthGuard)
export class UrlsController {
  constructor(private readonly urlService: UrlsService) {}

  @Post('shorten')
  async createShortUrl(
    @Body() createUrlDto: CreateUrlDto,
    @Req() req: Request,
  ): Promise<Url> {
    const auth0Id = req.user['sub'];
    try {
      return await this.urlService.createShortUrl(createUrlDto, auth0Id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create short URL');
    }
  }

  @Get(':shortId')
  async getShortUrlByShortId(@Param('shortId') shortId: string): Promise<Url> {
    try {
      return await this.urlService.getShortUrlByShortId({ shortId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve short URL');
    }
  }

  @Get('history')
  async getLinkHistoryByUserId(
    @Query() getLinkHistoryDto: GetLinkHistoryDto,
  ): Promise<LinkHistory[]> {
    try {
      return await this.urlService.getLinkHistoryByUserId(getLinkHistoryDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve link history');
    }
  }

  @Delete('history')
  async clearLinkHistory(@Req() req: Request): Promise<void> {
    const auth0Id = req.user['sub'];
    try {
      await this.urlService.clearLinkHistory(auth0Id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to clear link history');
    }
  }
}
