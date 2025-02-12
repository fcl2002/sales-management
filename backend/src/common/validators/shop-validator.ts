import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenericValidator } from './generic-validator';

@Injectable()
export class ShopValidator {
  constructor(
    private readonly prisma: PrismaService,
    private readonly genericValidator: GenericValidator,
  ) {}

  async validateShopExists(id: number) {
    const shop = await this.prisma.shop.findUnique({ where: { id } });
    this.genericValidator.validateExists(shop, 'Shop', id);
    return shop;
  }

  validateAdminAccess(user: any, action: string) {
    this.genericValidator.validateAdminAccess(user, action);
  }
}
