import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcyrpt from 'bcryptjs'
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ){}

    async signUp(signUpDto: SignUpDto): Promise<{ token: string}> {
        const { name,email,password} = signUpDto;
        
        const hashedPassword = await bcyrpt.hash(password, 10);
        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        
        await this.userRepository.save(user);
        
        const token = this.jwtService.sign({id: user.id});

        return{token};
    }

    async login(loginDto: LoginDto): Promise<{token: string}>{
        const { email, password} = loginDto;

        const user = await this.userRepository.findOne({
            where: {email},
        });
        if (!user) {
            throw new UnauthorizedException ("email dan password tidak valid");
        }

        const isPasswordMatched = await bcyrpt.compare(password, user.password);

        if(!isPasswordMatched){
            throw new UnauthorizedException ("email dan password tidak valid");
        }
        const token = this.jwtService.sign({id: user.id});

        return {token};
    }
}
