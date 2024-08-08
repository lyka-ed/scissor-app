import {
  Controller,
  Post,
  Body,
  Req,
  // HttpCode,
  // HttpStatus,
  // UseGuards,
  // Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { SignUpDto } from './dto/signup-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { Request } from 'express';
// import { JwtAuthGuard } from './jwt.auth.guard';
// import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Req() req: Request) {
    try {
      console.log(req);
      // return this.authService.signUp(signUpDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('validate')
  // async validateUser(@Req() req: Request) {
  //   const user = await this.authService.validateUser(req.user['id']);
  //   return {
  //     message: 'User validated',
  //     user,
  //   };
  // }
}
