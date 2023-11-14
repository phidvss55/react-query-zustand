import { ObjectType, Field } from '@nestjs/graphql';
import { ErrorType } from './error.type';
import { User } from 'src/user/entities/user.model';

@ObjectType()
export class RegisterResponse {
  @Field(() => User, { nullable: true }) // Assuming User is another ObjectType you have
  user?: User;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
