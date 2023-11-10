import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }

  @Get()
  getHello(): string {
    this.authClient.emit('create_user', JSON.stringify('createUserDto'));
    this.authClient
      .send('get_user', JSON.stringify('{ userId }'))
      .subscribe((user) => {
        console.log(user);

        console.log(`process payment for user ${user?.name} - amount:  `);
      });

    return this.apiGatewayService.getHello();
  }
}
