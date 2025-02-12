import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';
import { GenericValidator } from './generic-validator';

@Injectable()
export class UserValidator {
  constructor(
    private readonly prisma: PrismaService,
    private readonly genericValidator: GenericValidator
  ) {}

  async validateUserExists(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    this.genericValidator.validateExists(user, 'User', id);
    return user;
  }

  async validateEmailNotExists(email: string, userId?: number) {
    const emailExists = await this.prisma.user.findUnique({ where: { email } });
    const isDuplicate = emailExists && (!userId || emailExists.id !== userId);
    this.genericValidator.validateUniqueField(Boolean(isDuplicate), 'email');
  }

  validateAdminAccess(user: any, action: string) {
    this.genericValidator.validateAdminAccess(user, action);
  }
}
