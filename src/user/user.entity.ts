import { Column,Entity, PrimaryGeneratedColumn, } from "typeorm";

export @Entity()
class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;
}