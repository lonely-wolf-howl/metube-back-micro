/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoReqDto, FindVideoReqDto } from './dto/req.dto';
import { CreateVideoResDto, FindVideoResDto } from './dto/res.dto';
import { PageReqDto } from '../common/dto/req.dto';
import { Response } from 'express';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    sayPong(): Promise<string>;
    sentry(): Promise<void>;
    upload(displayName: string, email: string, file: Express.Multer.File, createVideoReqDto: CreateVideoReqDto): Promise<CreateVideoResDto>;
    findAll({ page, size }: PageReqDto): Promise<FindVideoResDto[]>;
    findOne({ id }: FindVideoReqDto): Promise<FindVideoResDto>;
    download({ id }: {
        id: string;
    }, res: Response): Promise<StreamableFile>;
}
