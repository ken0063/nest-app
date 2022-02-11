import { Exclude } from 'class-transformer';
import { Auth } from 'src/auth/entities/auth.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne((_type) => Auth, (auth) => auth.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  auth: Auth;
}
