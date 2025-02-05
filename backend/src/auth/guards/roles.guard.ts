import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(!user) {
      console.log('[RolesGuard] User is undefined in request!');
      throw new ForbiddenException('Acesso negado: usuário não autenticado.');
    }

    console.log(`[RolesGuard] Usuário autenticado: ${user.email}, Role: ${user.role}`);
    console.log(`[RolesGuard] Permissões necessárias: ${requiredRoles}`);
    
    if (!requiredRoles.some((role) => user.role === role)) {
      console.log('[RolesGuard] Access denied!');
      throw new ForbiddenException('Acesso negado: você não tem permissão para acessar esta rota.');
    }
    
    return true;
  }
}