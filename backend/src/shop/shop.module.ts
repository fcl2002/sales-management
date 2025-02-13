import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaShopRepository } from 'src/infrastructure/repositories/PrismaShopRepository';
import { IShopService } from 'src/core/ports/IShopService';
import { GenericValidator } from 'src/common/validators/generic-validator';
import { IShopRepository } from 'src/core/ports/IShopRepository';
import { IShopValidator } from 'src/core/ports/IShopValidator';
import { ShopValidator } from 'src/common/validators/shop-validator';

@Module({
  controllers: [ShopController],
  providers: [
    GenericValidator,
    { provide: IShopRepository, useClass: PrismaShopRepository },
    { provide: IShopValidator, useClass: ShopValidator },
    { provide: IShopService, useClass: ShopService },
  ],
  exports: [IShopService],
})
export class ShopModule {}
