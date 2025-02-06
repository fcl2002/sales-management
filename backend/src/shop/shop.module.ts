import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ShopController],
  providers: [ShopService, PrismaService],
  exports: [ShopService],
})
export class ShopModule {}
