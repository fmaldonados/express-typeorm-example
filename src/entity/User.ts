import {Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, Unique} from "typeorm";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    role: string;
}
