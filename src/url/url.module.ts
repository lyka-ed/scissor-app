import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './entities/url.entity';
import { UrlsService } from './url.service';
import { UrlsController } from './url.controller';
import { QrcodeModule } from '../qrcode/qrcode.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { LinkhistoryModule } from 'src/linkhistory/linkhistory.module';
import {
  LinkHistory,
  LinkHistorySchema,
} from 'src/linkhistory/entities/linkhistory.entity';
import {
  Analytics,
  AnalyticsSchema,
} from 'src/analytics/entities/analytics.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Url.name, schema: UrlSchema },
      { name: LinkHistory.name, schema: LinkHistorySchema },
      { name: Analytics.name, schema: AnalyticsSchema },
    ]),
    CacheModule.register({ ttl: 5, max: 10 }),
    QrcodeModule,
    LinkhistoryModule,
    AnalyticsModule,
    RateLimiterModule,
  ],
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlsModule {}
