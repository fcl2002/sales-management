import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class ProductValidator {
  private readonly logger = new Logger(ProductValidator.name);

  constructor(private readonly prisma: PrismaService) {}

  async validateProductExists(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      this.logger.warn(`[ProductValidator] Produto ID: ${id} não encontrado.`);
      throw new NotFoundException('Produto não encontrado.');
    }

    return product;
  }

  validateProductPermission(user: any, product: any, action: string) {
    if (user.role !== UserRole.ADMIN && product.shopId !== user.shopId) {
      this.logger.warn(`[ProductValidator] Usuário ${user.email} tentou ${action} um produto fora do seu Shop.`);
      throw new ForbiddenException(`Você não tem permissão para ${action} esse produto.`);
    }
  }

  validateAdminAccess(user: any, action: string) {
    if (user.role !== UserRole.ADMIN) {
      this.logger.warn(`[ProductValidator] Usuário ${user.email} tentou ${action} um produto sem permissão.`);
      throw new ForbiddenException(`Apenas administradores podem ${action} produtos.`);
    }
  }
}
