import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

export enum FriendshipType {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  BLOCKED = 'blocked',
}

@Entity()
export class Friendship extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  target: User;

  @OneToOne(() => User)
  @JoinColumn()
  sender: User;

  @Column({
    type: 'enum',
    enum: FriendshipType,
    default: FriendshipType.PENDING,
  })
  status: FriendshipType;
}
