import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  done: boolean;

  @CreateDateColumn({ name: 'create_at' })
  createAt: string;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: string;
}
