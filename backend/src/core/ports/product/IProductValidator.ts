export const IProductValidator = Symbol('IProductValidator');

export interface IProductValidator {
    validateProductExists(id: number): Promise<any>;
    validateProductPermission(user: any, product: any, action: string): void;
    validateAdminAccess(user: any, action: string): void;
}
  