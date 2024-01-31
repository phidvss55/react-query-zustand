import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Message } from './message.entity';
import { User } from '@/modules/user/types/user.type';

@ObjectType({ description: 'Chatroom' })
export class Chatroom {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => [User], { nullable: true }) // array of user IDs
  users?: User[];

  @Field(() => [Message], { nullable: true }) // array of message IDs
  messages?: Message[];
}
