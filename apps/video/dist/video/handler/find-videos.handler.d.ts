import { IQueryHandler } from '@nestjs/cqrs';
import { FindVideosQuery } from '../query/find-videos.query';
import { Video } from '../entity/video.entity';
import { Repository } from 'typeorm';
import { VideoWithSource } from '../../types/type';
import { S3Service } from '../../s3/s3.service';
export declare class FindVideosQueryHandler implements IQueryHandler<FindVideosQuery> {
    private videoRepository;
    private readonly s3Service;
    constructor(videoRepository: Repository<Video>, s3Service: S3Service);
    execute({ page, size }: FindVideosQuery): Promise<VideoWithSource[]>;
}
