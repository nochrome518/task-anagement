import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "./enums/status.enum";
import { IsNotEmpty } from "class-validator";

@Entity({ name: 'tasks'})
export class Task {
    @PrimaryGeneratedColumn() 
    id: number;

    @IsNotEmpty({ always: true })
    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ type: 'enum', enum: Status, default: Status.openTask })
    status: Status;

    @CreateDateColumn({ name: 'created_date', type: 'timestamp', update: false, nullable: true })
    createdDate: Date;
    
    @UpdateDateColumn({ name: 'updated_date', type: 'timestamp', nullable: true })
    updatedDate: Date;

}

