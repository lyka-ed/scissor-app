import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResendOtpDto } from './dto/resend-otp-dto';
import { GetUser } from '../utils/decorators/get-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  async signUp(@Body() dto: CreateUserDto) {
    return this.usersService.signUp(dto);
  }

  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ResendOtpDto })
  async resendOtp(@Body() dto: ResendOtpDto) {
    return this.usersService.resendOtp(dto.email);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: VerifyOtpDto })
  async verify(@Body() dto: VerifyOtpDto) {
    return this.usersService.verifyOtp(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginUserDto })
  async login(@Body() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async logout(@GetUser('sub') userId: number) {
    return this.usersService.logout(userId);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async refresh(@GetUser() user: any) {
    return this.usersService.refreshTokens(user.sub, user.refreshToken);
  }
}
