import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserRole } from '@prisma/client';
import { IProductRepository } from 'src/core/ports/IProductRepository';
import { IProductValidator } from 'src/core/ports/IProductValidator';
import { ProductResponseDto } from './dto/response-product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @Inject(IProductRepository) private readonly productRepository: IProductRepository,
    @Inject(IProductValidator)  private readonly productValidator: IProductValidator,
  ) { }

  async create(createProductDto: CreateProductDto, user: any): Promise<ProductResponseDto> {
    this.logger.log('[ProductService] Criando um novo produto...');
    this.productValidator.validateAdminAccess(user, 'criar');
    
    return this.productRepository.create(createProductDto, user);
  }

  async findAll(user: any): Promise<ProductResponseDto[]> {
    this.logger.log(`[ProductService] ${user.email} está buscando produtos.`);
    return await this.productRepository.findAll(user);
  }

  async findOne(id: number, user: any): Promise<ProductResponseDto | null> {
    this.logger.log(`[ProductService] ${user.email} está buscando o produto ID: ${id}`);

    const product = await this.productValidator.validateProductExists(id);
    this.productValidator.validateProductPermission(user, product, 'visualizar');

    return this.productRepository.findOne(id, user);
  }

  async update(id: number, updateProductDto: UpdateProductDto, user: any): Promise<ProductResponseDto> {
    this.logger.log(`[ProductService] ${user.email} está tentando atualizar o produto ID: ${id}`);

    const product = await this.productValidator.validateProductExists(id);
    this.productValidator.validateProductPermission(user, product, 'atualizar');

    const updateData: Partial<UpdateProductDto> = user.role === UserRole.ADMIN
      ? updateProductDto : { stock: updateProductDto.stock };

    return this.productRepository.update(id, updateData, user);
  }

  async remove(id: number, user: any): Promise<ProductResponseDto> {
    this.logger.log(`[ProductService] ${user.email} está tentando remover o produto ID: ${id}`);
    
    this.productValidator.validateAdminAccess(user, 'excluir');
    await this.productValidator.validateProductExists(id);
    
    return this.productRepository.remove(id, user);
  }
}
