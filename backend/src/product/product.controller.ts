import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Request, ParseIntPipe, Version } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Version('1')
  @Roles(UserRole.ADMIN)
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productService.create(createProductDto, req.user);
  }

  @Get()
  @Version('1')
  @Roles(UserRole.ADMIN, UserRole.USER)
  findAll(@Request() req) {
    return this.productService.findAll(req.user);
  }

  @Get(':id')
  @Version('1')
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.productService.findOne(id, req.user);
  }

  @Patch(':id')
  @Version('1')
  @Roles(UserRole.ADMIN, UserRole.USER)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @Request() req) {
    return this.productService.update(id, updateProductDto, req.user);
  }

  @Delete(':id')
  @Version('1')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.productService.remove(id, req.user);
  }
}
