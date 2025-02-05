import { Role } from "../enums/roles.enum"

export type JwtPayload = {
    sub: number;
    email: string;
    role: Role;
    iat?: number;
    exp?: number;
}