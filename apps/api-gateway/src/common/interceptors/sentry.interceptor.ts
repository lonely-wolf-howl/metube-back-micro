import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { Request as ExpressRequest } from 'express';
import * as Sentry from '@sentry/node';
import { IncomingWebhook } from '@slack/webhook';

@Injectable()
export class SentryInterceptor<T, R> implements NestInterceptor<T, R> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<R> {
    const http = context.switchToHttp();
    const request = http.getRequest<ExpressRequest>();
    const { url } = request;
    return next.handle().pipe(
      catchError((error) => {
        Sentry.captureException(error);
        const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
        let value = `URL: ${url}`;
        if (error.message !== 'Internal server error') {
          value += `\n\n[ERROR STACK]\n${error.stack}`;
        }
        webHook.send({
          attachments: [
            {
              text: 'METUBE. API-GATEWAY',
              fields: [
                {
                  title: `ERROR MESSAGE: ${error.message}`,
                  value: value,
                  short: false,
                },
              ],
              ts: Math.floor(new Date().getTime() / 1000).toString(),
            },
          ],
        });
        throw error;
      })
    );
  }
}
