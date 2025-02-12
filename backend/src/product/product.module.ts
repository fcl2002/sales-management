import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaProductRepository } from 'src/infrastructure/repositories/PrismaProductRepository';
import { IProductRepository } from 'src/core/ports/IProductRepository';
import { IProductValidator } from 'src/core/ports/IProductValidator';
import { ProductValidator } from '../common/validators/product-validator';
import { ProductController } from './product.controller';
import { GenericValidator } from 'src/common/validators/generic-validator';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    GenericValidator, 
    { provide: IProductRepository, useClass: PrismaProductRepository },
    { provide: IProductValidator, useClass: ProductValidator },
  ],
  exports: [ProductService],
})
export class ProductModule {}
