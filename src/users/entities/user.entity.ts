import { User } from '@prisma/client';

export class UserEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.isVerified = user.isVerified;
    this.createdAt = user.createdAt;
  }
}
