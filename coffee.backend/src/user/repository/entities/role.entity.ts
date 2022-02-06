import { RoleBO } from 'src/user/business/bos/role.bo';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caption: string;

  toBO(): RoleBO {
    return {
      caption: this.caption,
    };
  }
}
