export const IUserValidator = Symbol('IUserValidator');

export interface IUserValidator {
    validateUserExists(id: number): Promise<any>;
    validateEmailNotExists(email: string, userId?: number): Promise<void>;
}
  