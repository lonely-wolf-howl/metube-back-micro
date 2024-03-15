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
exports.CreateVideoHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("typeorm");
const create_video_command_1 = require("../command/create-video.command");
const video_entity_1 = require("../entity/video.entity");
const s3_service_1 = require("../../s3/s3.service");
const video_created_event_1 = require("../event/video-created.event");
let CreateVideoHandler = class CreateVideoHandler {
    constructor(dataSource, s3Service, eventBus) {
        this.dataSource = dataSource;
        this.s3Service = s3Service;
        this.eventBus = eventBus;
    }
    async execute(command) {
        const { title, displayName, email, mimetype, buffer } = command;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        let error;
        try {
            const video = await queryRunner.manager.save(queryRunner.manager.create(video_entity_1.Video, {
                title,
                displayName,
                email,
                mimetype,
            }));
            await this.s3Service.uploadVideo(video.id, buffer);
            await queryRunner.commitTransaction();
            this.eventBus.publish(new video_created_event_1.VideoCreatedEvent(video.id));
            return video;
        }
        catch (transactionError) {
            await queryRunner.rollbackTransaction();
            error = transactionError;
        }
        finally {
            await queryRunner.release();
            if (error)
                throw error;
        }
    }
};
exports.CreateVideoHandler = CreateVideoHandler;
exports.CreateVideoHandler = CreateVideoHandler = __decorate([
    (0, common_1.Injectable)(),
    (0, cqrs_1.CommandHandler)(create_video_command_1.CreateVideoCommand),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        s3_service_1.S3Service,
        cqrs_1.EventBus])
], CreateVideoHandler);
//# sourceMappingURL=create-video.handler.js.map