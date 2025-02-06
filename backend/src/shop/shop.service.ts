import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShopService {
  private readonly logger = new Logger(ShopService.name);

  constructor(private readonly prisma: PrismaService) { }

  async createShopForUser(userName: string) {
    this.logger.log(`[ShopService] Criando uma loja para o usuário ${userName}...`);

    const shop = await this.prisma.shop.create({
      data: { 
        name: `Loja de ${userName}`, 
        location: 'A definir' 
      },
    });

    this.logger.log(`[ShopService] Loja criada com sucesso: ID ${shop.id}`);
    return shop;
  }

  async findAll(user: any) {
    this.logger.log(`[ShopService] ${user.email} está buscando todas as lojas.`);

    if (user.role === 'ADMIN') {
      return this.prisma.shop.findMany({ include: { products: true, users: true } });
    }

    return this.prisma.shop.findMany({
      where: { id: user.shopId },
      include: { products: true, users: true },
    });
  }

  async findOne(id: number, user: any) {
    this.logger.log(`[ShopService] ${user.email} está buscando a loja ID: ${id}`);

    const shop = await this.prisma.shop.findUnique({ where: { id }, include: { products: true, users: true } });
    if (!shop) {
      this.logger.warn(`[ShopService] Loja ID: ${id} não encontrada.`);
      throw new NotFoundException('Loja não encontrada.');
    }

    if (user.role !== 'ADMIN' && shop.id !== user.shopId) {
      this.logger.warn(`[ShopService] Usuário ${user.email} tentou acessar uma loja que não pertence a ele.`);
      throw new ForbiddenException('Você não tem permissão para acessar essa loja.');
    }

    return shop;
  }
}
