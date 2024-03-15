"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const postgres_config_1 = require("./config/postgres.config");
const typeorm_1 = require("@nestjs/typeorm");
const video_module_1 = require("./video/video.module");
const s3_module_1 = require("./s3/s3.module");
const sentry_config_1 = require("./config/sentry.config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [postgres_config_1.default, sentry_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    let object = {
                        type: 'postgres',
                        host: configService.get('postgres.host'),
                        port: configService.get('postgres.port'),
                        database: configService.get('postgres.database'),
                        username: configService.get('postgres.username'),
                        password: configService.get('postgres.password'),
                        autoLoadEntities: true,
                        synchronize: true,
                    };
                    if (configService.get('STAGE') === 'LOCAL') {
                        object = Object.assign(object, {
                            logging: false,
                        });
                    }
                    return object;
                },
            }),
            video_module_1.VideoModule,
            s3_module_1.S3Module,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map