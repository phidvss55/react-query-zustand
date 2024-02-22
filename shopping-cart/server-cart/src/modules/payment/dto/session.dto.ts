import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSessionInput {
  @Field()
  id: number;
  @Field()
  quantity: number;
}

@ObjectType()
export class CreateSessionResponseDto {
  @Field()
  url: string;
}
