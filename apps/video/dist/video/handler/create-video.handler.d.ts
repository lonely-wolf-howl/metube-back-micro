import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { CreateVideoCommand } from '../command/create-video.command';
import { Video } from '../entity/video.entity';
import { S3Service } from '../../s3/s3.service';
export declare class CreateVideoHandler implements ICommandHandler<CreateVideoCommand> {
    private dataSource;
    private readonly s3Service;
    private readonly eventBus;
    constructor(dataSource: DataSource, s3Service: S3Service, eventBus: EventBus);
    execute(command: CreateVideoCommand): Promise<Video>;
}
