import { CreateProductDto } from "src/product/dto/create-product.dto";
import { ProductResponseDto } from "src/product/dto/response-product.dto";
import { UpdateProductDto } from "src/product/dto/update-product.dto";

export const IProductService = Symbol('IProductService');

export interface IProductService {
    create(createProductDto: CreateProductDto, user: any): Promise<ProductResponseDto>;
    findAll(user: any): Promise<ProductResponseDto[]>;
    findOne(id: number, user: any): Promise<ProductResponseDto | null>;
    update(id: number, updateProductDto: UpdateProductDto, user: any): Promise<ProductResponseDto>;
    remove(id: number, user: any): Promise<ProductResponseDto>;
}