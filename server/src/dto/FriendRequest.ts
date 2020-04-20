import { IsEmail } from 'class-validator';

export default class FriendRequest {
  @IsEmail({}, { message: 'Email is not valid.' })
  public email: string;
}
