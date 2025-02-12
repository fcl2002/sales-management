import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IShopRepository } from 'src/core/ports/IShopRepository';

@Injectable()
export class PrismaShopRepository implements IShopRepository {
  private readonly logger = new Logger(PrismaShopRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async createShopForUser(userName: string) {
    this.logger.log(`[PrismaShopRepository] Criando loja para usuário ${userName}...`);

    const shop = await this.prisma.shop.create({
      data: { 
        name: `Loja de ${userName}`, 
        location: 'A definir' 
      },
    });

    this.logger.log(`[PrismaShopRepository] Loja criada com sucesso: ID ${shop.id}`);
    return shop;
  }

  async findAll(user: any) {
    this.logger.log(`[PrismaShopRepository] ${user.email} buscando todas as lojas.`);

    if (user.role === 'ADMIN') {
      return this.prisma.shop.findMany({ include: { products: true, users: true } });
    }

    return this.prisma.shop.findMany({
      where: { id: user.shopId },
      include: { products: true, users: true },
    });
  }

  async findOne(id: number, user: any) {
    this.logger.log(`[PrismaShopRepository] ${user.email} buscando loja ID: ${id}`);

    const shop = await this.prisma.shop.findUnique({ where: { id }, include: { products: true, users: true } });
    if (!shop) {
      this.logger.warn(`[PrismaShopRepository] Loja ID: ${id} não encontrada.`);
      throw new NotFoundException('Loja não encontrada.');
    }

    if (user.role !== 'ADMIN' && shop.id !== user.shopId) {
      this.logger.warn(`[PrismaShopRepository] Usuário ${user.email} tentou acessar uma loja que não pertence a ele.`);
      throw new ForbiddenException('Você não tem permissão para acessar essa loja.');
    }

    return shop;
  }
}
