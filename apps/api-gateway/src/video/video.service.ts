import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VideoService {
  constructor(@Inject('VIDEO_SERVICE') private client: ClientProxy) {}

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
}
