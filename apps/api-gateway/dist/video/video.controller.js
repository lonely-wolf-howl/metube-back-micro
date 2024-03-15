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
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const video_service_1 = require("./video.service");
const platform_express_1 = require("@nestjs/platform-express");
const header_guard_1 = require("../auth/guards/header.guard");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../common/decorators/swagger.decorator");
const req_dto_1 = require("./dto/req.dto");
const res_dto_1 = require("./dto/res.dto");
const req_dto_2 = require("../common/dto/req.dto");
const throttler_behind_proxy_guard_1 = require("../common/guards/throttler-behind-proxy.guard");
const throttler_1 = require("@nestjs/throttler");
let VideoController = class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
    }
    async sayPong() {
        return await this.videoService.sayPong();
    }
    async sentry() {
        return await this.videoService.sentry();
    }
    async upload(displayName, email, file, createVideoReqDto) {
        const { title } = createVideoReqDto;
        const { mimetype, originalname, buffer } = file;
        const extension = originalname.split('.')[1];
        const decodedDisplayName = decodeURIComponent(displayName);
        const { id, username } = await this.videoService.upload(title, decodedDisplayName, email, mimetype, extension, buffer);
        return { id, title, username };
    }
    async findAll({ page, size }) {
        return await this.videoService.findAll(page, size);
    }
    async findOne({ id }) {
        return await this.videoService.findOne(id);
    }
    async download({ id }, res) {
        const { stream, mimetype, size } = await this.videoService.download(id);
        res.set({
            'Content-Length': size,
            'Content-Type': mimetype,
        });
        return new common_1.StreamableFile(stream);
    }
};
exports.VideoController = VideoController;
__decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Get)('test/ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "sayPong", null);
__decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Get)('test/sentry'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "sentry", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_decorator_1.ApiPostResponse)(res_dto_1.CreateVideoResDto),
    (0, common_1.UseGuards)(header_guard_1.HeaderGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('video')),
    (0, throttler_1.Throttle)({ default: { limit: 6, ttl: 60 } }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('displayname')),
    __param(1, (0, common_1.Headers)('email')),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: 'mp4',
    })
        .addMaxSizeValidator({
        maxSize: 100 * 1024 * 1024,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, req_dto_1.CreateVideoReqDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "upload", null);
__decorate([
    (0, swagger_decorator_1.ApiGetItemsResponse)(res_dto_1.FindVideoResDto),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dto_2.PageReqDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "findAll", null);
__decorate([
    (0, swagger_decorator_1.ApiGetResponse)(res_dto_1.FindVideoResDto),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_dto_1.FindVideoReqDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "findOne", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 6, ttl: 60 } }),
    (0, common_1.Get)(':id/download'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "download", null);
exports.VideoController = VideoController = __decorate([
    (0, swagger_1.ApiTags)('Video'),
    (0, swagger_1.ApiExtraModels)(req_dto_1.CreateVideoReqDto, res_dto_1.CreateVideoResDto, req_dto_2.PageReqDto, req_dto_1.FindVideoReqDto, res_dto_1.FindVideoResDto),
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoController);
//# sourceMappingURL=video.controller.js.map