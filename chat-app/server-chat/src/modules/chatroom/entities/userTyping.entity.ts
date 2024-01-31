import { User } from '@/modules/user/types/user.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserTyping {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  chatroomId?: number;
}

@ObjectType()
export class UserStoppedTyping extends UserTyping {}
