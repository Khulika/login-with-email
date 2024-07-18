import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/user.dto";
import { User } from "./user.entity";



export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async getAllUsers() {
        const users = await this.usersRepository.find();
        return users;
    }

    async getUserById(id: number) {
        const user = await this.usersRepository.findOne({
            where:{
                id:id
            },
        });
        if (user) {
            return user;
        }
        throw new NotFoundException('user tidak di temukan')
    }

    async createUser(createUserDto: CreateUserDto) {
        const newUser = await this.usersRepository.create(createUserDto);
        await this.usersRepository.save({
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
        });
        return newUser;
    }

    async deleteById(id: number) {
        const user = await this.usersRepository.findOne({
            where: {
                id:id,
            },
        });
        if (!user){
            return null;
        }
        await this.usersRepository.remove(user);
        return user;
    }
}
