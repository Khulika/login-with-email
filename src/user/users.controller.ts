import { Body,Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import {User} from "./user.entity"
import {UserService} from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "./dto/user.dto";



@Controller('users')

export class UsersController{
    constructor(private readonly userService:UserService){}

    @Get()
    async getAllUsers(): Promise<User[]>{
        const users = await this.userService.getAllUsers();
        return users;
    }
    @Get('id')
    async getUserById(@Param('id') id: string): Promise<User>{
        const user = await this.userService.getUserById(Number(id));
        return user;
    }
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createUser(@Body() createUserDto: CreateUserDto){
        const newUser = await this.userService.createUser(createUserDto);
        return newUser;
    }
    @Delete(':id')
    async deleteById(@Param('id') id:string): Promise<User>{
        const user = await this.userService.deleteById(Number(id));
        return user;

    }
    
}