import { Controller, Get, Param, ParseIntPipe, Request } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  findAll(@Request() request) {
    return this.shopService.findAll(request.shop);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() request) {
    return this.shopService.findOne(id, request.shop);
  }
}
