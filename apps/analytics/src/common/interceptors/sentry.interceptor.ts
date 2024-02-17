import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import * as Sentry from '@sentry/node';
import { IncomingWebhook } from '@slack/webhook';

@Injectable()
export class SentryInterceptor<T, R> implements NestInterceptor<T, R> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<R> {
    return next.handle().pipe(
      catchError((error) => {
        Sentry.captureException(error);
        const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
        webHook.send({
          attachments: [
            {
              text: 'METUBE. VIDEO SERVICE',
              fields: [
                {
                  title: `ERROR MESSAGE: ${error.message}`,
                  value: `[ERROR STACK]\n${error.stack}`,
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
