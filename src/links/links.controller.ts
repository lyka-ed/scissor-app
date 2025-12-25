import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  UseGuards,
  HttpStatus,
  Req,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { GetUser } from '../utils/decorators/get-user.decorator';

@ApiTags('Links')
@Controller('link')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  // SHORTEN LINK
  @Post('shorten')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({ type: CreateLinkDto })
  async shorten(@Body() dto: CreateLinkDto, @GetUser('sub') userId: number) {
    return this.linksService.shorten(userId, dto);
  }

  // LINK HISTORY
  @Get('link-history')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getHistory(@GetUser('sub') userId: number) {
    return this.linksService.getUserLinks(userId);
  }

  // REDIRECT (Public)
  @Get(':code')
  async redirect(
    @Param('code') code: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const ip = req.ip;
    const userAgent = req.get('User-Agent');

    const url = await this.linksService.getOriginalUrl(code, ip, userAgent);
    return res.redirect(HttpStatus.FOUND, url);
  }
}
