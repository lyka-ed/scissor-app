import { PrismaService } from '../../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

// Optimized check for Sign Up (Selects ID only)
export const checkUserExists = async (prisma: PrismaService, email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (user)
    throw new BadRequestException('User with this email already exists');
};

// Standard fetch for Login/Verify
export const findUserByEmail = async (prisma: PrismaService, email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};
