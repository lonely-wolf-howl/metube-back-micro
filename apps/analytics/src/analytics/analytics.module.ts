import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analytics } from './entity/analytics.entity';
import { EmailService } from '../email/email.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Analytics]), ScheduleModule.forRoot()],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, EmailService],
})
export class AnalyticsModule {}
