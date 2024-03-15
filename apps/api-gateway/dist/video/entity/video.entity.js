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
exports.Video = void 0;
const typeorm_1 = require("typeorm");
let Video = class Video {
};
exports.Video = Video;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Video.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Video.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_name' }),
    __metadata("design:type", String)
], Video.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Video.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Video.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'view_count', default: 0 }),
    __metadata("design:type", Number)
], Video.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'download_count', default: 0 }),
    __metadata("design:type", Number)
], Video.prototype, "downloadCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Video.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Video.prototype, "updatedAt", void 0);
exports.Video = Video = __decorate([
    (0, typeorm_1.Entity)()
], Video);
//# sourceMappingURL=video.entity.js.map