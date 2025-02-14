import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IProductRepository } from 'src/core/ports/product/IProductRepository';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UserRole } from '@prisma/client';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { ProductResponseDto } from 'src/product/dto/response-product.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, user: any): Promise<ProductResponseDto> {
    const product = await this.prisma.product.create({ data: createProductDto });
    return plainToInstance(ProductResponseDto, product, { excludeExtraneousValues: true });
  }

  async findAll(user: any): Promise<ProductResponseDto[]> {

    let products;

    if (user.role === UserRole.ADMIN) {
      products = await this.prisma.product.findMany({
        select: { id: true, name: true, price: true, stock: true, shopId: true },
      });
    } else {
      products = await this.prisma.product.findMany({
        where: { shopId: user.shopId },
        select: { id: true, name: true, price: true, stock: true },
      });
    }

    return products.map(product => plainToInstance(ProductResponseDto, product, { excludeExtraneousValues: true }));
  }

  async findOne(id: number, user: any): Promise<ProductResponseDto | null> {
    return this.prisma.product.findUnique({
      where: { id, ...(user.role !== UserRole.ADMIN ? { shopId: user.shopId } : {}) },
      select: { id: true, name: true, description: true, price: true, stock: true, shopId: true },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
    });

    return plainToInstance(ProductResponseDto, updatedProduct, { excludeExtraneousValues: true });
  }

  async remove(id: number) {
    const deletedProduct = await this.prisma.product.delete({ where: { id } });
    return plainToInstance(ProductResponseDto, deletedProduct, { excludeExtraneousValues: true });
  }
}
