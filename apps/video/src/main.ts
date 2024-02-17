import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { SentryInterceptor } from './common/interceptors/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'video-service',
        port: 4001,
      },
    }
  );

  // Interceptors
  app.useGlobalInterceptors(new SentryInterceptor());

  await app.listen();
  console.info(`video-service listening on 4001 for TCP`);
}
bootstrap();
