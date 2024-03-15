import { IQueryHandler } from '@nestjs/cqrs';
import { FindVideoQuery } from '../query/find-video.query';
import { Video } from '../entity/video.entity';
import { Repository } from 'typeorm';
import { VideoWithSource } from '../../types/type';
import { S3Service } from '../../s3/s3.service';
export declare class FindVideoQueryHandler implements IQueryHandler<FindVideoQuery> {
    private videoRepository;
    private readonly s3Service;
    constructor(videoRepository: Repository<Video>, s3Service: S3Service);
    execute({ id }: FindVideoQuery): Promise<VideoWithSource>;
}
