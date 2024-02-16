import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [VideoController],
  providers: [
    VideoService,
    {
      provide: 'VIDEO_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'video-service',
            port: 4001,
          },
        });
      },
    },
  ],
})
export class VideoModule {}
