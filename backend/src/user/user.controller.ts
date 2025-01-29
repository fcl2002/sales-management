import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../auth/enums/roles.enum';
import { Role as Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Roles(Role.USER)
@Controller('user')
export class UserController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true}))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  @Get()
  @Roles(Role.ADMIN)
  async getAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async getUserById(@Param('id') id: number) {
    return await this.userService.findUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
