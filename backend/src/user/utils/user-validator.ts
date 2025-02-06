import { ConflictException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class UserValidator {
  private readonly logger = new Logger(UserValidator.name);

  constructor(private readonly prisma: PrismaService) {}

  async validateUserExists(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      this.logger.warn(`[UserValidator] Usuário ID: ${id} não encontrado.`);
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async validateEmailNotExists(email: string, userId?: number) {
    const emailExists = await this.prisma.user.findUnique({ where: { email } });

    if (emailExists && (!userId || emailExists.id !== userId)) {
      this.logger.warn(`[UserValidator] Tentativa de usar um email já existente: ${email}`);
      throw new ConflictException('Este email já está em uso!');
    }
  }

  validateAdminAccess(user: any, action: string) {
    if (user.role !== UserRole.ADMIN) {
      this.logger.warn(`[UserValidator] Usuário ${user.email} tentou ${action} um usuário sem permissão.`);
      throw new ForbiddenException(`Apenas administradores podem ${action} usuários.`);
    }
  }
}
