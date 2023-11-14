import { ObjectType, Field } from '@nestjs/graphql';
import { ErrorType } from './error.type';
import { User } from 'src/user/entities/user.model';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
