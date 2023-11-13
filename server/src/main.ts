import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppValidationPipe } from './configs/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('API endpoints configuration')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  // Global Pipe
  app.useGlobalPipes(
    new AppValidationPipe({
      transform: true, // remove all properties not list in the class-validator
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      whitelist: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');

  const PORT = process.env.PORT;
  console.log('PORT', PORT);
  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
