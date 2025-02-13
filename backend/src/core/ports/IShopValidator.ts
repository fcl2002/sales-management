export const IShopValidator = Symbol('IShopValidator');

export interface IShopValidator {
    validateShopExists(id: number): Promise<any>;
    validateAdminAccess(user: any, action: string): Promise<void>;
}