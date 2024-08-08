import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { User, UserDocument } from '../users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
// import { UsersService } from 'src/users/users.service';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    // private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    this.logger.log('Sign up accessed');
    const { firstName, lastName, email, password } = signUpDto;

    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      this.logger.warn(`Signup attempt with existing email: ${email}`);
      throw new ConflictException('Email already in use');
    }

    this.logger.debug(`Creating a new user with email: ${signUpDto.email}`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });
    this.logger.debug(`User signed up: ${user.email}`);
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
  //     this.logger.warn(`Failed login attempt for email: ${email}`);
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   this.logger.debug(`User logged in: ${user.email}`);
  //   return this.jwtService.sign({ id: user._id });
  // }

  // async validateUser(id: string): Promise<User> {
  //   const user = await this.usersService.findUserById(id);

  //   if (!user) {
  //     this.logger.warn(`User validation failed for ID: ${id}`);
  //     throw new UnauthorizedException('Invalid token');
  //   }

  //   return user;
  // }
}
