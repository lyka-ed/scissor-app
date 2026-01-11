import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { CreateLinkDto } from './dto/create-link.dto';
import { LinksService } from './links.service';
import { GetUser } from '../utils/decorators/get-user.decorator';

@ApiTags('Links')
@Controller('link')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('shorten')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({ type: CreateLinkDto })
  async shorten(@Body() dto: CreateLinkDto, @GetUser('sub') userId: number) {
    return this.linksService.shorten(userId, dto);
  }

  @Get('link-history')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getHistory(@GetUser('sub') userId: number) {
    return this.linksService.getUserLinks(userId);
  }

  @Get(':code')
  async redirect(
    @Param('code') code: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');

    const url = await this.linksService.getOriginalUrl(code, ip, userAgent);

    return res.redirect(HttpStatus.FOUND, url);
  }
}
