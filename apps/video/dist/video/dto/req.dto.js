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
exports.FindVideoReqDto = exports.CreateVideoReqDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateVideoReqDto {
}
exports.CreateVideoReqDto = CreateVideoReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideoReqDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: true }),
    __metadata("design:type", Object)
], CreateVideoReqDto.prototype, "video", void 0);
class FindVideoReqDto {
}
exports.FindVideoReqDto = FindVideoReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FindVideoReqDto.prototype, "id", void 0);
//# sourceMappingURL=req.dto.js.map