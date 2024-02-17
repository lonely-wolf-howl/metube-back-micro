import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../video/entity/video.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video]),
    ClientsModule.register([
      {
        name: 'S3_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 's3',
            brokers: ['host.docker.internal:9092'],
          },
        },
      },
    ]),
  ],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
