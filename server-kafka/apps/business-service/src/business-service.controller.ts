import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class BusinessServiceController {
  @EventPattern('create_user')
  killDragon(@Payload() message: any, @Ctx() context: KafkaContext): any {
    console.log('create_user');
    console.log(`Topic: ${context.getTopic()}`);
  }

  @MessagePattern('get_user')
  handleGetUser(@Payload() userId: number) {
    console.log('get_user');

    return { status: 'ok' };
  }
}
