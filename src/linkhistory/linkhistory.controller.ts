import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LinkhistoryService } from './linkhistory.service';
// import { CreateLinkhistoryDto } from './dto/clear-history';

@Controller('linkhistory')
export class LinkhistoryController {
  constructor(private readonly linkhistoryService: LinkhistoryService) {}

  // @Post()
  // create(@Body() createLinkhistoryDto: CreateLinkhistoryDto) {
  //   return this.linkhistoryService.create(createLinkhistoryDto);
  // }

  // @Get()
  // findAll() {
  //   return this.linkhistoryService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.linkhistoryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateLinkhistoryDto: UpdateLinkhistoryDto,
  // ) {
  //   return this.linkhistoryService.update(+id, updateLinkhistoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.linkhistoryService.remove(+id);
  // }
}
