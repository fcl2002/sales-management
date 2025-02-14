import { Controller, Get, Inject, Param, ParseIntPipe, Request, Version } from '@nestjs/common';
import { IShopService } from 'src/core/ports/shop/IShopService';

@Controller('shops')
export class ShopController {
  constructor(
    @Inject(IShopService) private readonly shopService: IShopService
  ) {}

  @Get()
  @Version('1')
  findAll(@Request() request) {
    return this.shopService.findAll(request.user);
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() request) {
    return this.shopService.findOne(id, request.user);
  }
}
