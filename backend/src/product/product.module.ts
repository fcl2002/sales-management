import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaProductRepository } from 'src/infrastructure/repositories/PrismaProductRepository';
import { IProductRepository } from 'src/core/ports/product/IProductRepository';
import { IProductValidator } from 'src/core/ports/product/IProductValidator';
import { ProductValidator } from '../common/validators/product-validator';
import { ProductController } from './product.controller';
import { GenericValidator } from 'src/common/validators/generic-validator';
import { IProductService } from 'src/core/ports/product/IProductService';

@Module({
  controllers: [ProductController],
  providers: [
    GenericValidator, 
    { provide: IProductRepository, useClass: PrismaProductRepository },
    { provide: IProductValidator, useClass: ProductValidator },
    { provide: IProductService, useClass: ProductService },
  ],
  exports: [IProductService],
})
export class ProductModule {}
