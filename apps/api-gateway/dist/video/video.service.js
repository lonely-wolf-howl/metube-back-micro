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
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const fs_1 = require("fs");
let VideoService = class VideoService {
    constructor(client) {
        this.client = client;
    }
    async sayPong() {
        const pattern = { cmd: 'pong' };
        const payload = {};
        const pong = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return pong;
    }
    async sentry() {
        const pattern = { cmd: 'sentry' };
        const payload = {};
        const error = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return error;
    }
    async upload(title, displayName, email, mimetype, extension, buffer) {
        const pattern = { cmd: 'upload' };
        const payload = { title, displayName, email, mimetype, extension, buffer };
        const { id, username } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return { id, username };
    }
    async findAll(page, size) {
        const pattern = { cmd: 'find-all' };
        const payload = { page, size };
        const videos = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return videos;
    }
    async findOne(id) {
        const pattern = { cmd: 'find-one' };
        const payload = { id };
        const video = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return video;
    }
    async download(id) {
        const pattern = { cmd: 'download' };
        const payload = { id };
        const { buffer, mimetype, size } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return {
            stream: fs_1.ReadStream.from(Buffer.from(buffer.data)),
            mimetype,
            size,
        };
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('VIDEO_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], VideoService);
//# sourceMappingURL=video.service.js.map