import { CreateShopDto } from "src/shop/dto/create-shop.dto";
import { UpdateShopDto } from "src/shop/dto/update-shop.dto";

export const IShopRepository = Symbol('IShopRepository');

export interface IShopRepository {
    createShopForUser(userName: string): Promise<any>;
    findAll(user: any): Promise<any[]>;
    findOne(id: number, user: any): Promise<any>;
}
  