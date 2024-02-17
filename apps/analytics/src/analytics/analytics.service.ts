import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analytics } from './entity/analytics.entity';
import { EmailService } from '../email/email.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>,
    private readonly emailService: EmailService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleEmailCron() {
    console.info('EMAIL TASK CALLED');
    const analytics = await this.findTop5Download();
    this.emailService.send(analytics);
  }

  async increaseDownloadCount(videoId: string, videoTitle: string) {
    const analytics = await this.analyticsRepository.findOneBy({ videoId });
    if (!analytics) {
      this.analyticsRepository.save(
        this.analyticsRepository.create({
          videoId,
          videoTitle,
          downloadCount: 1,
        })
      );
      return;
    }

    await this.analyticsRepository.update(
      { id: analytics.id },
      { downloadCount: () => 'download_count + 1' }
    );
  }

  async findTop5Download(): Promise<Analytics[]> {
    const analytics = await this.analyticsRepository.find({
      order: {
        downloadCount: 'DESC',
      },
      take: 5,
    });
    return analytics;
  }
}
