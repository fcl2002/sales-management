import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { LoginDto } from 'src/user/dto/login.dto';

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

  @Post('logout')
  @UseGuards(LocalAuthGuard)
  async logout(@Request() request) {
    return request.logout();
  }

  // @UseGuards(RefreshJwtGuard)
  // @Post('refresh')
  // async refresh(@Request() request) {
  //   return this.authService.refreshToken(request.user.id);
  // }
}
