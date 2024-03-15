/// <reference types="node" />
import { Repository } from 'typeorm';
import { Video } from '../video/entity/video.entity';
import { ClientProxy } from '@nestjs/microservices';
export declare class S3Service {
    private videoRepository;
    private client;
    private readonly s3Client;
    constructor(videoRepository: Repository<Video>, client: ClientProxy);
    uploadVideo(fileName: string, buffer: Buffer): Promise<void>;
    getVideoUrl(videoId: string): Promise<string>;
    downloadVideo(videoId: string): Promise<{
        buffer: Buffer;
        mimetype: string;
        size: number;
    }>;
}
