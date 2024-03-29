import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { VideoService } from './video.service';
import { CreateVideoCommand } from './command/create-video.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindVideosQuery } from './query/find-videos.query';
import { FindVideoResDto } from './dto/res.dto';
import { FindVideoQuery } from './query/find-video.query';

@Controller()
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}

  @MessagePattern({ cmd: 'pong' })
  async sayPong(): Promise<string> {
    return 'video-service pong';
  }

  @MessagePattern({ cmd: 'sentry' })
  async sentry(): Promise<void> {
    throw new Error('SENTRY - ERROR TEST');
  }

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

  @MessagePattern({ cmd: 'find-all' })
  async findAll({
    page,
    size,
  }: {
    page: number;
    size: number;
  }): Promise<FindVideoResDto[]> {
    const findVideosQuery = new FindVideosQuery(page, size);
    const videos = await this.queryBus.execute(findVideosQuery);
    const result = videos.map(
      ({ id, source, title, displayName, viewCount }) => {
        return {
          id,
          source,
          title,
          displayName,
          viewCount,
        };
      }
    );
    return result;
  }

  @MessagePattern({ cmd: 'find-one' })
  async findOne({ id }: { id: string }): Promise<FindVideoResDto> {
    const findVideoQuery = new FindVideoQuery(id);
    const { source, title, displayName, viewCount } =
      await this.queryBus.execute(findVideoQuery);
    const result = {
      id,
      source,
      title,
      displayName,
      viewCount,
    };
    return result;
  }

  @MessagePattern({ cmd: 'download' })
  async download({
    id,
  }: {
    id: string;
  }): Promise<{ buffer: Buffer; mimetype: string; size: number }> {
    return await this.videoService.download(id);
  }
}
