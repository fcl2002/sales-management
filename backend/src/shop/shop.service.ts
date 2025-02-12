import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { IShopRepository } from 'src/core/ports/IShopRepository';

@Injectable()
export class ShopService {
  private readonly logger = new Logger(ShopService.name);

  constructor(
    @Inject(IShopRepository) private readonly shopRepository: IShopRepository
  ) {}

  createShopForUser(createShopDto: CreateShopDto) {
    this.logger.log(`[ShopService] Criando loja para ${createShopDto.users[0].name}...`);
    return this.shopRepository.createShopForUser(createShopDto.users[0].name);
  }

  findAll(user: any) {
    this.logger.log(`[ShopService] ${user.email} buscando todas as lojas.`);
    return this.shopRepository.findAll(user);
  }

  findOne(id: number, user: any) {
    this.logger.log(`[ShopService] ${user.email} buscando loja ID: ${id}`);
    return this.shopRepository.findOne(id, user);
  }
}
