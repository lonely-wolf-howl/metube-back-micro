"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModule = void 0;
const common_1 = require("@nestjs/common");
const video_controller_1 = require("./video.controller");
const video_service_1 = require("./video.service");
const typeorm_1 = require("@nestjs/typeorm");
const video_entity_1 = require("./entity/video.entity");
const cqrs_1 = require("@nestjs/cqrs");
const s3_module_1 = require("../s3/s3.module");
const create_video_handler_1 = require("./handler/create-video.handler");
const find_videos_handler_1 = require("./handler/find-videos.handler");
const find_video_handler_1 = require("./handler/find-video.handler");
let VideoModule = class VideoModule {
};
exports.VideoModule = VideoModule;
exports.VideoModule = VideoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([video_entity_1.Video]), cqrs_1.CqrsModule, s3_module_1.S3Module],
        controllers: [video_controller_1.VideoController],
        providers: [
            video_service_1.VideoService,
            create_video_handler_1.CreateVideoHandler,
            find_videos_handler_1.FindVideosQueryHandler,
            find_video_handler_1.FindVideoQueryHandler,
        ],
    })
], VideoModule);
//# sourceMappingURL=video.module.js.map