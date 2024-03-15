/// <reference types="node" />
import { VideoService } from './video.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindVideoResDto } from './dto/res.dto';
export declare class VideoController {
    private readonly videoService;
    private commandBus;
    private queryBus;
    constructor(videoService: VideoService, commandBus: CommandBus, queryBus: QueryBus);
    sayPong(): Promise<string>;
    sentry(): Promise<void>;
    upload({ title, displayName, email, mimetype, extension, buffer, }: {
        title: string;
        displayName: string;
        email: string;
        mimetype: string;
        extension: string;
        buffer: {
            type: 'buffer';
            data: number[];
        };
    }): Promise<{
        id: string;
        username: string;
    }>;
    findAll({ page, size, }: {
        page: number;
        size: number;
    }): Promise<FindVideoResDto[]>;
    findOne({ id }: {
        id: string;
    }): Promise<FindVideoResDto>;
    download({ id, }: {
        id: string;
    }): Promise<{
        buffer: Buffer;
        mimetype: string;
        size: number;
    }>;
}
