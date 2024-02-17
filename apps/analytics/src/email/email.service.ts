import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Analytics } from '../analytics/entity/analytics.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(analytics: Analytics[]) {
    const data = analytics.map(({ videoId, videoTitle, downloadCount }) => {
      return `<tr><td>${videoId}</td><td>${videoTitle}</td><td>${downloadCount}</td>,</tr>`;
    });
    await this.mailerService.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'metube',
      html: `
      <table style="border: 1px solid black; width: 60%; margin: auto; text-align: center">
      <tr><th>id</th><th>title</th><th>download count</th></tr>
      ${data}
      </table>
      `,
    });
  }
}
