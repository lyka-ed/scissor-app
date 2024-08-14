import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './auth/config/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
// import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlsModule } from './url/url.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { QrcodeModule } from './qrcode/qrcode.module';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        uri: config.get('database.connectionstring'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
      }),
      global: true,
      inject: [ConfigService],
    }),
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 6000,
    //     limit: 10,
    //   },
    // ]),
    UrlsModule,
    UsersModule,
    AuthModule,
    AnalyticsModule,
    QrcodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
