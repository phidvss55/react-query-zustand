import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import {
  CreateSessionInput,
  CreateSessionResponseDto,
} from './dto/session.dto';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CreateSessionResponseDto)
  createCheckoutSession(
    @Args({ name: 'items', type: () => [CreateSessionInput] })
    createPaymentInput: CreateSessionInput[],
  ) {
    return this.paymentService.createCheckoutSession(createPaymentInput);
  }
}
