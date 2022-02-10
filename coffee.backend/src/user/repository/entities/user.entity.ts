import { CoffeeEntity } from '../../../shared/respository/entity.interface';
import { UserBO } from '../../../user/business/bos/user.bo';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('Users')
export class UserEntity extends CoffeeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  guid: string;
  @Column()
  passwordHash: string;
  @Column()
  email: string;
  @Column()
  name: string;
  @ManyToMany(type => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];

  toBO(): UserBO {
    const bo = new UserBO();
    bo.guid = this.guid;
    bo.email = this.email;
    bo.name = this.name;
    bo.passwordHash = this.passwordHash;
    bo.roles = this.roles.map(e => e.toBO());
    return bo;
  }
}
