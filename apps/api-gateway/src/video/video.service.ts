import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FindVideoResDto } from './dto/res.dto';
import { ReadStream } from 'fs';

@Injectable()
export class VideoService {
  constructor(@Inject('VIDEO_SERVICE') private client: ClientProxy) {}

  async sayPong(): Promise<string> {
    const pattern = { cmd: 'pong' };
    const payload = {};

    const pong = await firstValueFrom(
      this.client.send<string>(pattern, payload)
    );
    return pong;
  }

  async sentry(): Promise<void> {
    const pattern = { cmd: 'sentry' };
    const payload = {};

    const error = await firstValueFrom(
      this.client.send<void>(pattern, payload)
    );
    return error;
  }

  async upload(
    title: string,
    displayName: string,
    email: string,
    mimetype: string,
    extension: string,
    buffer: Buffer
  ): Promise<{ id: string; username: string }> {
    const pattern = { cmd: 'upload' };
    const payload = { title, displayName, email, mimetype, extension, buffer };

    const { id, username } = await firstValueFrom<{
      id: string;
      username: string;
    }>(this.client.send<{ id: string; username: string }>(pattern, payload));
    return { id, username };
  }

  async findAll(page: number, size: number): Promise<FindVideoResDto[]> {
    const pattern = { cmd: 'find-all' };
    const payload = { page, size };

    const videos = await firstValueFrom<FindVideoResDto[]>(
      this.client.send<FindVideoResDto[]>(pattern, payload)
    );
    return videos;
  }

  async findOne(id: string): Promise<FindVideoResDto> {
    const pattern = { cmd: 'find-one' };
    const payload = { id };

    const video = await firstValueFrom<FindVideoResDto>(
      this.client.send<FindVideoResDto>(pattern, payload)
    );
    return video;
  }

  async download(id: string) {
    const pattern = { cmd: 'download' };
    const payload = { id };
    const { buffer, mimetype, size } = await firstValueFrom<{
      buffer: { type: 'buffer'; data: number[] };
      mimetype: string;
      size: number;
    }>(
      this.client.send<{
        buffer: { type: 'buffer'; data: number[] };
        mimetype: string;
        size: number;
      }>(pattern, payload)
    );
    return {
      stream: ReadStream.from(Buffer.from(buffer.data)),
      mimetype,
      size,
    };
  }
}
