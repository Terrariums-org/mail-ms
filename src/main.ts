import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { configService } from './shared/dto';
import { MAIL_QUEUE } from './shared/constants/MAIL_QUEUE';

async function bootstrap() {
  const logger = new Logger('Main-mail');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: configService.get('BROKER_HOST'),
        queue: MAIL_QUEUE.mailQueue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen();
  logger.log('Mail microservice started on port ');
}
bootstrap();
