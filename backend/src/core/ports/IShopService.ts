export const IShopService = Symbol('IShopService');

export interface IShopService {
    createShopForUser(userName: string): Promise<{ id: number; name: string }>;
    findAll(user: any): Promise<any[]>;
    findOne(id: number, user: any): Promise<any>;
}
  