import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { BusinessServiceModule } from './business-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(BusinessServiceModule, {
    transport: Transport.KAFKA,

    options: {
      client: {
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'auth-consumer',
      },
    },
  });
  await app.listen();
}
bootstrap();
