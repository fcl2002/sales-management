import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: { email: string, password: string}) {
    const user = await this.authService.validateUser(body.email, body.password);
    const token = await this.authService.login(user.id);
    return { id: user.id, token };
  }
}
