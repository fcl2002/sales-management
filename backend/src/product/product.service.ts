import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';
import { ProductValidator } from './utils/product-validator';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly productValidator: ProductValidator,
  ) {}

  async create(createProductDto: CreateProductDto, user: any) {
    this.productValidator.validateAdminAccess(user, 'criar');

    const product = await this.prisma.product.create({ data: createProductDto });
    this.logger.log(`[ProductService] Produto criado com sucesso: ${product.name} (ID: ${product.id})`);
    
    return product;
  }

  async findAll(user: any) {
    this.logger.log(`[ProductService] ${user.email} está buscando produtos.`);

    if (user.role === UserRole.ADMIN) return this.prisma.product.findMany();

    return this.prisma.product.findMany({ where: { shopId: user.shopId } });
  }

  async findOne(id: number, user: any) {
    this.logger.log(`[ProductService] ${user.email} está buscando o produto ID: ${id}`);

    const product = await this.productValidator.validateProductExists(id);
    this.productValidator.validateProductPermission(user, product, 'visualizar');

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, user: any) {
    this.logger.log(`[ProductService] ${user.email} está tentando atualizar o produto ID: ${id}`);

    const product = await this.productValidator.validateProductExists(id);
    this.productValidator.validateProductPermission(user, product, 'atualizar');

    if (user.role !== UserRole.ADMIN) {
      updateProductDto = { stock: updateProductDto.stock };
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });

    this.logger.log(`[ProductService] Produto atualizado: ${updatedProduct.name} (ID: ${updatedProduct.id})`);
    return updatedProduct;
  }

  async remove(id: number, user: any) {
    this.logger.log(`[ProductService] ${user.email} está tentando remover o produto ID: ${id}`);

    this.productValidator.validateAdminAccess(user, 'excluir');

    const product = await this.productValidator.validateProductExists(id);
    await this.prisma.product.delete({ where: { id } });

    this.logger.log(`[ProductService] Produto deletado com sucesso: ${product.name} (ID: ${product.id})`);
    return { message: `Produto ${product.name} deletado com sucesso.` };
  }
}
