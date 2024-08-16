import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkhistoryService } from './linkhistory.service';
import { LinkhistoryController } from './linkhistory.controller';
import { LinkHistory, LinkHistorySchema } from './entities/linkhistory.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LinkHistory.name, schema: LinkHistorySchema },
    ]),
  ],
  controllers: [LinkhistoryController],
  providers: [LinkhistoryService],
})
export class LinkhistoryModule {}
