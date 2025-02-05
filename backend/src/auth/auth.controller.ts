import { Controller, Get, Post, Body, Request, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginDto } from 'src/user/dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  async getProfile(@Req() request) {
    console.log('[AuthController] Requisição recebida para /auth/me');
    console.log('[AuthController] request.user:', request.user);

    if (!request.user) {
      return { message: 'Token inválido!' };
    }
    
    return this.authService.getSessionInfo(request.user);
  }

  @Post('logout')
  @UseGuards(LocalAuthGuard)
  async logout(@Request() request) {
    return request.logout();
  }
}
