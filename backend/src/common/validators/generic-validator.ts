import { ConflictException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRole } from '@prisma/client';

@Injectable()
export class GenericValidator {
  private readonly logger = new Logger(GenericValidator.name);

  validateExists(entity: any, entityName: string, id: number) {
    if (!entity) {
      this.logger.warn(`[GenericValidator] ${entityName} ID: ${id} não encontrado.`);
      throw new NotFoundException(`${entityName} não encontrado.`);
    }
  }

  validateAdminAccess(user: any, action: string) {
    if (user.role !== UserRole.ADMIN) {
      this.logger.warn(`[GenericValidator] Usuário ${user.email} tentou ${action} sem permissão.`);
      throw new ForbiddenException(`Apenas administradores podem ${action}.`);
    }
  }

  validateUniqueField(isDuplicate: boolean, fieldName: string) {
    if (isDuplicate) {
      this.logger.warn(`[GenericValidator] Tentativa de duplicação de ${fieldName}.`);
      throw new ConflictException(`Este ${fieldName} já está em uso.`);
    }
  }

  validateUserPermission(user: any, entity: any, entityName: string, action: string) {
    if (user.role !== UserRole.ADMIN && entity.shopId !== user.shopId) {
      this.logger.warn(`[GenericValidator] Usuário ${user.email} tentou ${action} um ${entityName} fora do seu Shop.`);
      throw new ForbiddenException(`Você não tem permissão para ${action} este ${entityName}.`);
    }
  }
}
