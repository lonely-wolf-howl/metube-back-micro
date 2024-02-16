import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { VideoService } from './video.service';
import { CreateVideoCommand } from './command/create-video.command';
import { CommandBus } from '@nestjs/cqrs';

@Controller()
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private commandBus: CommandBus
  ) {}

  @MessagePattern({ cmd: 'upload' })
  async upload({
    title,
    displayName,
    email,
    mimetype,
    extension,
    buffer,
  }: {
    title: string;
    displayName: string;
    email: string;
    mimetype: string;
    extension: string;
    buffer: { type: 'buffer'; data: number[] };
  }): Promise<{ id: string; username: string }> {
    const command = new CreateVideoCommand(
      title,
      displayName,
      email,
      mimetype,
      extension,
      Buffer.from(buffer.data)
    );
    const { id, username } = await this.commandBus.execute(command);
    return { id, username };
  }
}
