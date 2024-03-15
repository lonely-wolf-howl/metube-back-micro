import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { SentryInterceptor } from './common/interceptors/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 4001;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port,
    },
  });

  // Interceptors
  app.useGlobalInterceptors(new SentryInterceptor());

  await app.startAllMicroservices();
  await app.listen(port);
  console.info(`video-service listening on ${port} for TCP!`);
}
bootstrap();
