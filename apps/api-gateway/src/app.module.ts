import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VideoModule } from './video/video.module';
import swaggerConfig from './config/swagger.config';
import { ThrottlerModule } from '@nestjs/throttler';
import sentryConfig from './config/sentry.config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'video',
        ttl: 60, // 1 min
        limit: 20,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [swaggerConfig, sentryConfig],
    }),
    VideoModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
