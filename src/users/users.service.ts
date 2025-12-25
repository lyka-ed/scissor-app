import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../utils/email/email.service';
import {
  findUserByEmail,
  checkUserExists,
  generateTokens,
  updateRefreshTokenHash,
} from '../utils/helper/user.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private email: EmailService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // SIGN UP
  async signUp(dto: CreateUserDto) {
    await checkUserExists(this.prisma, dto.email);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashedPassword,
        otp: otp,
      },
    });

    this.email.sendOtp(user.email, user.firstName, otp);
    return { message: 'Signup successful. Check email for OTP.' };
  }

  // VERIFY OTP
  async verifyOtp(dto: VerifyOtpDto) {
    const user = await findUserByEmail(this.prisma, dto.email);

    if (!user) throw new UnauthorizedException('User not found');
    if (user.isVerified) return { message: 'Already verified' };
    if (user.otp !== dto.otp) throw new UnauthorizedException('Invalid OTP');

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, otp: null },
    });

    await this.cacheManager.del(`user_${dto.email}`);

    this.email.sendWelcome(updatedUser.email, updatedUser.firstName);
    return { message: 'Verified', user: new UserEntity(updatedUser) };
  }

  //nLOGIN
  async login(dto: LoginUserDto) {
    const cacheKey = `user_${dto.email}`;
    let user: any = await this.cacheManager.get(cacheKey);

    if (!user) {
      user = await findUserByEmail(this.prisma, dto.email);
      if (user) await this.cacheManager.set(cacheKey, user);
    }

    if (!user || !user.isVerified)
      throw new UnauthorizedException('Access Denied');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Access Denied');

    const tokens = await generateTokens(this.jwtService, user.id, user.email);
    await updateRefreshTokenHash(this.prisma, user.id, tokens.refreshToken);

    return {
      message: 'Login successful',
      user: new UserEntity(user),
      Tokens: tokens,
    };
  }

  // REFRESH TOKEN
  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.refreshToken);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await generateTokens(this.jwtService, user.id, user.email);

    await updateRefreshTokenHash(this.prisma, user.id, tokens.refreshToken);

    return tokens;
  }

  // LOGOUT
  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: { id: userId, refreshToken: { not: null } },
      data: { refreshToken: null },
    });
    return { message: 'Logged out successfully' };
  }
}
