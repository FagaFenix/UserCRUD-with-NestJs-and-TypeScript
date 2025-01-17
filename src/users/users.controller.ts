import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    // @Get('/') //With Express
    // async getUsers(@Req() request: Request, @Res() response: Response) {
    //     return response.json(await this.userService.getUsers());
    // }

    @Get('/') //Native NestJs
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('/who')//Native NestJs
    getFilteredUsers(@Query('id') id?: string, @Query('role') role?: "ENGINEER" | "INTERN" | "ADMIN") {

        if (id) {
            return this.userService.getUserById(id);
        } else if (role) {
            return this.userService.getUsersByRole(role);
        }
    }

    @Get('/:id')
    @HttpCode(200)
    getUserById(@Param('id', /**ParseIntPipe usage for type transformation*/) id: string) {
        return this.userService.getUserById(id);
    }

    @Post('/createNewUser')
    createNewUser(@Body() data: createUserDto) {
        return this.userService.createUser(data);
    }

    @Put('/updateUser')
    updateUser(@Body() Reqbody: any) {
        interface Data {
            id: number,
            name: string,
            email: string,
            role: string
        }
        const data: Data = Reqbody
        return this.userService.updateUser(data);
    }

    @Delete('/deleteUser/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
