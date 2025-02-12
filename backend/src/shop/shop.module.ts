import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaShopRepository } from 'src/infrastructure/repositories/PrismaShopRepository';
import { IShopService } from 'src/core/ports/IShopService';
import { GenericValidator } from 'src/common/validators/generic-validator';
import { IShopRepository } from 'src/core/ports/IShopRepository';

@Module({
  controllers: [ShopController],
  providers: [
    ShopService,
    GenericValidator,
    { provide: IShopRepository, useClass: PrismaShopRepository },
    { provide: IShopService, useClass: ShopService },
  ],
  exports: [IShopService],
})
export class ShopModule {}
