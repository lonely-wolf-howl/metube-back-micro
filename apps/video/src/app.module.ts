import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import postgresConfig from './config/postgres.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { VideoModule } from './video/video.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let object: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get('postgres.host'),
          port: configService.get('postgres.port'),
          database: configService.get('postgres.database'),
          username: configService.get('postgres.username'),
          password: configService.get('postgres.password'),
          autoLoadEntities: true,
          synchronize: true,
        };
        if (configService.get('STAGE') === 'LOCAL') {
          object = Object.assign(object, {
            logging: true,
          });
        }
        return object;
      },
    }),
    VideoModule,
    S3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
