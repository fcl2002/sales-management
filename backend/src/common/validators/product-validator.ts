import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenericValidator } from './generic-validator';

@Injectable()
export class ProductValidator {
  constructor(
    private readonly prisma: PrismaService,
    private readonly genericValidator: GenericValidator
  ) {}

  async validateProductExists(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    this.genericValidator.validateExists(product, 'Product', id);
    return product;
  }

  validateProductPermission(user: any, product: any, action: string) {
    this.genericValidator.validateUserPermission(user, product, 'produto', action);
  }

  validateAdminAccess(user: any, action: string) {
    this.genericValidator.validateAdminAccess(user, action);
  }
}
