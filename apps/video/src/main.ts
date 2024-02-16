import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 4001;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'video-service',
        port: port,
      },
    }
  );

  await app.listen();
  console.info(`video-service listening on ${port} for TCP`);
}
bootstrap();
