import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailService } from '../utils/email/email.service';
import { AccessTokenStrategy } from '../strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../strategies/refreshToken.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UsersController],
  providers: [
    UsersService,
    EmailService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class UsersModule {}
