import { Controller, Get, Param, ParseIntPipe, Request, Version } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

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
