/// <reference types="node" />
/// <reference types="node" />
import { ClientProxy } from '@nestjs/microservices';
import { FindVideoResDto } from './dto/res.dto';
export declare class VideoService {
    private client;
    constructor(client: ClientProxy);
    sayPong(): Promise<string>;
    sentry(): Promise<void>;
    upload(title: string, displayName: string, email: string, mimetype: string, extension: string, buffer: Buffer): Promise<{
        id: string;
        username: string;
    }>;
    findAll(page: number, size: number): Promise<FindVideoResDto[]>;
    findOne(id: string): Promise<FindVideoResDto>;
    download(id: string): Promise<{
        stream: import("stream").Readable;
        mimetype: string;
        size: number;
    }>;
}
