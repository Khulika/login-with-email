import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsEmail({}, {message: 'silakan masukkan email yang benar'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6,{message: 'kata sandi harus terdiri dari minimal 6 karakter'})
    password: string;
}