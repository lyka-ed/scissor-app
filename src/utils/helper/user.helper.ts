import { PrismaService } from '../../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// For Sign Up
export const checkUserExists = async (prisma: PrismaService, email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (user)
    throw new BadRequestException('User with this email already exists');
};

// Fetch for Login/Verify
export const findUserByEmail = async (prisma: PrismaService, email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const generateTokens = async (
  jwtService: JwtService,
  userId: number,
  email: string,
) => {
  const [at, rt] = await Promise.all([
    //Access Token (15 minutes)
    jwtService.signAsync(
      { sub: userId, email },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
    ),
    //Refresh Token (7 days)
    jwtService.signAsync(
      { sub: userId, email },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
    ),
  ]);

  return { accessToken: at, refreshToken: rt };
};

export const updateRefreshTokenHash = async (
  prisma: PrismaService,
  userId: number,
  refreshToken: string,
) => {
  const hash = await bcrypt.hash(refreshToken, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: hash },
  });
};
