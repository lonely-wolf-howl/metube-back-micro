import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { S3Module } from '../s3/s3.module';
import { CreateVideoHandler } from './handler/create-video.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), CqrsModule, S3Module],
  controllers: [VideoController],
  providers: [VideoService, CreateVideoHandler],
})
export class VideoModule {}
