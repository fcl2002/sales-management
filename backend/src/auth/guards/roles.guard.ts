import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<Role>('role', context.getHandler());
    if (!requiredRole) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(!user) {
      console.log('user is undefined in request!');
      return false;
    }
    
    return user.role === requiredRole;
  }
}