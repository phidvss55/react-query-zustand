import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentCreateInput {
  @Field()
  text: string;
}
