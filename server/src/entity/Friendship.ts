import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => User)
  @JoinColumn()
  target: User;

  @ManyToOne(() => User)
  @JoinColumn()
  sender: User;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn()
  lastActionByUser: User;

  @Column()
  lastActionByUserId: number;

  @Column({
    type: 'enum',
    enum: FriendshipType,
    default: FriendshipType.PENDING,
  })
  status: FriendshipType;
}
