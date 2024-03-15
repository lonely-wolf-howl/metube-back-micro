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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const video_entity_1 = require("../video/entity/video.entity");
const microservices_1 = require("@nestjs/microservices");
let S3Service = class S3Service {
    constructor(videoRepository, client) {
        this.videoRepository = videoRepository;
        this.client = client;
        this.s3Client = new client_s3_1.S3Client({
            region: 'ap-northeast-2',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    async uploadVideo(fileName, buffer) {
        try {
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: fileName,
                Body: buffer,
                ACL: 'public-read',
            }));
        }
        catch (error) {
            throw error;
        }
    }
    async getVideoUrl(videoId) {
        try {
            const url = `https://${process.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/${videoId}`;
            return url;
        }
        catch (error) {
            throw error;
        }
    }
    async downloadVideo(videoId) {
        try {
            const { Body, ContentLength } = await this.s3Client.send(new client_s3_1.GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: videoId,
            }));
            const stream = Body;
            const chunks = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);
            const size = ContentLength;
            const video = await this.videoRepository.findOne({
                where: { id: videoId },
            });
            if (!video)
                throw new common_1.NotFoundException();
            const { mimetype } = video;
            this.client.emit('video_downloaded', {
                id: video.id,
                title: video.title,
            });
            return { buffer, mimetype, size };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __param(1, (0, common_1.Inject)('S3_SERVICE')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        microservices_1.ClientProxy])
], S3Service);
//# sourceMappingURL=s3.service.js.map