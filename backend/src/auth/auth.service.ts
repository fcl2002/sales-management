import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './types/jwtPayload';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ id: number; access_token: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    this.logger.log(`[AuthService] Login bem sucedido para: ${user.email}`);

    return this.generateTokens(user.id, user.email, user.role);
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findEmail(email);

    if(!user) {
      this.logger.log('[AuthService} User not found!');
      throw new UnauthorizedException('Invalid credencials!');
    }
    
    const isPasswordMatch = await bcrypt.compare(pass, user.password);    
    if(!isPasswordMatch){
      this.logger.log(`[AuthService} Password does not match!`);
      throw new UnauthorizedException('Invalid credencials!');
    }

    this.logger.log(`[AuthService] Usuário autenticado: ${email}`);
    const { password, ...result} = user;
    return result;
  }

  async generateTokens(id: number, email: string, role: UserRole) {
    const payload: JwtPayload = { sub: id, email, role };

    this.logger.log(`Gerando token JWT para: ${email}`)
    const access_token = await this.jwtService.signAsync(payload);

    return { id, access_token };
  }

  async getSessionInfo(user: any) {
    const { iat, exp, email, role } = user;

    if(!iat || !exp) {
      return { message: 'Token inválido!' };
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = exp - currentTime;

    this.logger.log(`[AuthService] Tempo restante de sessão para ${email}: ${remainingTime} segundos`);

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    const remainingTimeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return {
      email, role, iat, exp, 
      remainingTime: remainingTime > 0 ? remainingTime : 0,
      remaining_time_readable: remainingTime > 0 ? remainingTimeFormatted : 'Token expirado'
    };
  }
}
