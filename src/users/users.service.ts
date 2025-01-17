import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getUsers() {
        return await this.prisma.user.findMany()
    }

    async getUsersByRole(role: 'INTERN' | 'ENGINEER' | 'ADMIN') {

        const userwithRoleFound = await this.prisma.user.findMany({
            where: {
                role: role
            }
        })
        if (userwithRoleFound && userwithRoleFound.length > 0) return userwithRoleFound
        else throw new NotFoundException(`No active User with ${role} role`)
    }

    async getUserById(id: string) {

        const results = await this.prisma.user.findFirst({
            where: {
                id: id.toString()
            }
        })
        if (results) return results
        else throw new NotFoundException(`User with id ${id} not found`);
    }

    async createUser(user: createUserDto) {

        return await this.prisma.user.create(
            {
                data: user
            }
        )
    }

    async updateUser(user: updateUserDto) {

        return await this.prisma.user.update(
            {
                where: {
                    email: user.email
                },
                data: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        )
    }

    async deleteUser(id: string) {
        return await this.prisma.user.delete({
            where: {
                id: id.toString()
            }
        })
    }
}
