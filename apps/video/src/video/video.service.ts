import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class VideoService {
  constructor(private readonly s3Service: S3Service) {}

  async download(
    id: string
  ): Promise<{ buffer: Buffer; mimetype: string; size: number }> {
    return await this.s3Service.downloadVideo(id);
  }
}
