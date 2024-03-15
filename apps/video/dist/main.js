"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const sentry_interceptor_1 = require("./common/interceptors/sentry.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = 4001;
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port,
        },
    });
    app.useGlobalInterceptors(new sentry_interceptor_1.SentryInterceptor());
    await app.startAllMicroservices();
    await app.listen(port);
    console.info(`video-service listening on ${port} for TCP!`);
}
bootstrap();
//# sourceMappingURL=main.js.map