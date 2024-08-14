import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { User, UserDocument } from '../users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { SignUpDto } from './dto/signup-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RefreshToken } from './entities/refreshToken.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { firstName, lastName, email, password } = signUpDto;

    // Check if the user already exists
    const emailInUse = await this.UserModel.findOne({ email: signUpDto.email });
    if (emailInUse) {
      this.logger.warn(`Signup attempt with existing email: ${email}`);
      throw new ConflictException('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    await this.UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt,
    });
  }

  // Login logic
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Wrong Email');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Wrong Password');
    }

    const tokens = await this.generateUserToken(user._id);
    return {
      ...tokens,
      userId: user._id,
    };
  }

  // Refresh token
  async refreshToken(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOneAndDelete({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh Token is Invalid');
    }

    return this.generateUserToken(token.userId);
  }

  // Generate JWT Token
  async generateUserToken(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  // Store Refresh Token
  async storeRefreshToken(token: string, userId) {
    // Calculate expiry date 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.RefreshTokenModel.create({ token, userId, expiryDate });
  }
}
