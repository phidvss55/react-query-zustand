import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user/types/user.type';

@ObjectType()
export class RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;
}
