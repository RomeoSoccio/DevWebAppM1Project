import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ClientId = string & { __brand: 'Client' };

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ClientId;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email?: string;

  @Column({ name: 'photo_url', type: 'varchar', nullable: true })
  photoUrl?: string;
}
