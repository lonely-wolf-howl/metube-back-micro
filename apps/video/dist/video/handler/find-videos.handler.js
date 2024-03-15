"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindVideosQueryHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const find_videos_query_1 = require("../query/find-videos.query");
const typeorm_1 = require("@nestjs/typeorm");
const video_entity_1 = require("../entity/video.entity");
const typeorm_2 = require("typeorm");
const s3_service_1 = require("../../s3/s3.service");
let FindVideosQueryHandler = class FindVideosQueryHandler {
    constructor(videoRepository, s3Service) {
        this.videoRepository = videoRepository;
        this.s3Service = s3Service;
    }
    async execute({ page, size }) {
        const videos = await this.videoRepository.find({
            skip: (page - 1) * size,
            take: size,
            order: {
                createdAt: 'DESC',
            },
        });
        const videosWithSource = [];
        for (const video of videos) {
            const videoId = video.id;
            const source = await this.s3Service.getVideoUrl(videoId);
            const videoWithSource = {
                ...video,
                source: source,
            };
            videosWithSource.push(videoWithSource);
        }
        return videosWithSource;
    }
};
exports.FindVideosQueryHandler = FindVideosQueryHandler;
exports.FindVideosQueryHandler = FindVideosQueryHandler = __decorate([
    (0, common_1.Injectable)(),
    (0, cqrs_1.QueryHandler)(find_videos_query_1.FindVideosQuery),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        s3_service_1.S3Service])
], FindVideosQueryHandler);
//# sourceMappingURL=find-videos.handler.js.map