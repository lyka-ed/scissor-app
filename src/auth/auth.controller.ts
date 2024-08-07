import {
  Controller,
  Post,
  Body,
  Get,
  // HttpCode,
  // HttpStatus,
  // UseGuards,
  // Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
// import { JwtAuthGuard } from './jwt.auth.guard';
// import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('')
  getHello() {
    return 'Hello world ';
  }

  // @Post('/signup')
  // async signUp(@Body() signUpDto: SignUpDto) {
  //   console.log('signuo accessed');
  //   return 'Work na';
  // return await this.authService.signUp(signUpDto);
  // return {
  //   message: 'Signup successful',y
  //   token,
  // };
  // }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
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
