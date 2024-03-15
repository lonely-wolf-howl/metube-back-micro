/// <reference types="node" />
import { S3Service } from '../s3/s3.service';
export declare class VideoService {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    download(id: string): Promise<{
        buffer: Buffer;
        mimetype: string;
        size: number;
    }>;
}
