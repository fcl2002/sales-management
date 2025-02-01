import { Role } from "../enums/roles.enum"

export type JwtPayload = {
    sub: number,
    email: string,
    role: Role
}