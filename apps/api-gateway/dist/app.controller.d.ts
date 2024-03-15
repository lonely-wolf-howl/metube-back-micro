import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    sayPong(): string;
    sentry(): Promise<void>;
}
