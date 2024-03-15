import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class SentryInterceptor<T, R> implements NestInterceptor<T, R> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<R>;
}
