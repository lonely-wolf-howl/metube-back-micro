"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const cors = require("cors");
const basicAuth = require("express-basic-auth");
const config_1 = require("@nestjs/config");
const sentry_interceptor_1 = require("./common/interceptors/sentry.interceptor");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger({
            transports: [
                new winston.transports.Console({
                    level: process.env.STAGE === 'PRODUCTION' ? 'info' : 'debug',
                    format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike('metube-micro', { prettyPrint: true })),
                }),
            ],
        }),
    });
    const port = 4000;
    app.setGlobalPrefix('api');
    const configService = app.get(config_1.ConfigService);
    app.use(['/docs', '/docs-json'], basicAuth({
        challenge: true,
        users: {
            [configService.get('swagger.user')]: configService.get('swagger.password'),
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('MeTube')
        .setDescription('MeTube API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.use(cors({
        origin: ['http://localhost:3000'],
        methods: 'GET, POST',
    }));
    app.useGlobalInterceptors(new sentry_interceptor_1.SentryInterceptor());
    await app.listen(port);
    common_1.Logger.log(`STAGE: ${process.env.STAGE}`);
    common_1.Logger.log(`listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map