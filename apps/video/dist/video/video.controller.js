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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const video_service_1 = require("./video.service");
const create_video_command_1 = require("./command/create-video.command");
const cqrs_1 = require("@nestjs/cqrs");
const find_videos_query_1 = require("./query/find-videos.query");
const find_video_query_1 = require("./query/find-video.query");
let VideoController = class VideoController {
    constructor(videoService, commandBus, queryBus) {
        this.videoService = videoService;
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async sayPong() {
        return 'video-service pong';
    }
    async sentry() {
        throw new Error('SENTRY - ERROR TEST');
    }
    async upload({ title, displayName, email, mimetype, extension, buffer, }) {
        const command = new create_video_command_1.CreateVideoCommand(title, displayName, email, mimetype, extension, Buffer.from(buffer.data));
        const { id, username } = await this.commandBus.execute(command);
        return { id, username };
    }
    async findAll({ page, size, }) {
        const findVideosQuery = new find_videos_query_1.FindVideosQuery(page, size);
        const videos = await this.queryBus.execute(findVideosQuery);
        const result = videos.map(({ id, source, title, displayName, viewCount }) => {
            return {
                id,
                source,
                title,
                displayName,
                viewCount,
            };
        });
        return result;
    }
    async findOne({ id }) {
        const findVideoQuery = new find_video_query_1.FindVideoQuery(id);
        const { source, title, displayName, viewCount } = await this.queryBus.execute(findVideoQuery);
        const result = {
            id,
            source,
            title,
            displayName,
            viewCount,
        };
        return result;
    }
    async download({ id, }) {
        return await this.videoService.download(id);
    }
};
exports.VideoController = VideoController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'pong' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "sayPong", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'sentry' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "sentry", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'upload' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "upload", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find-all' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find-one' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'download' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "download", null);
exports.VideoController = VideoController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [video_service_1.VideoService,
        cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], VideoController);
//# sourceMappingURL=video.controller.js.map