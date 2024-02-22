import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@InputType()
export class UpdatePaymentInput extends PartialType(CreatePaymentInput) {
  @Field(() => Int)
  id: number;
}
