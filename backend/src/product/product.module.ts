import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductValidator } from './utils/product-validator';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ProductValidator],
  exports: [ProductService],
})
export class ProductModule {}
