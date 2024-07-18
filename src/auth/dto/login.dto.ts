import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsEmail({}, {message: 'silakan masukkan email yang benar'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}