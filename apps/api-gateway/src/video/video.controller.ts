import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { HeaderGuard } from '../auth/guards/header.guard';
import { ApiConsumes, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  ApiPostResponse,
  ApiGetItemsResponse,
  ApiGetResponse,
} from '../common/decorators/swagger.decorator';
import { CreateVideoReqDto, FindVideoReqDto } from './dto/req.dto';
import { CreateVideoResDto, FindVideoResDto } from './dto/res.dto';
import { PageReqDto } from '../common/dto/req.dto';
import { ThrottlerBehindProxyGuard } from '../common/guards/throttler-behind-proxy.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@ApiTags('Video')
@ApiExtraModels(
  CreateVideoReqDto,
  CreateVideoResDto,
  PageReqDto,
  FindVideoReqDto,
  FindVideoResDto
)
@UseGuards(ThrottlerBehindProxyGuard)
@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @SkipThrottle()
  @Get('test/ping')
  async sayPong(): Promise<string> {
    return await this.videoService.sayPong();
  }

  @SkipThrottle()
  @Get('test/sentry')
  async sentry(): Promise<void> {
    return await this.videoService.sentry();
  }

  @ApiConsumes('multipart/form-data')
  @ApiPostResponse(CreateVideoResDto)
  @UseGuards(HeaderGuard)
  @UseInterceptors(FileInterceptor('video'))
  @Throttle({ default: { limit: 6, ttl: 60 } })
  @Post()
  async upload(
    @Headers('displayname') displayName: string,
    @Headers('email') email: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'mp4',
        })
        .addMaxSizeValidator({
          maxSize: 100 * 1024 * 1024, // 100 MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File,
    @Body() createVideoReqDto: CreateVideoReqDto
  ): Promise<CreateVideoResDto> {
    const { title } = createVideoReqDto;
    const { mimetype, originalname, buffer } = file;
    const extension = originalname.split('.')[1];

    const decodedDisplayName = decodeURIComponent(displayName);

    const { id, username } = await this.videoService.upload(
      title,
      decodedDisplayName,
      email,
      mimetype,
      extension,
      buffer
    );
    return { id, title, username };
  }

  @ApiGetItemsResponse(FindVideoResDto)
  @SkipThrottle()
  @Get()
  async findAll(
    @Query() { page, size }: PageReqDto
  ): Promise<FindVideoResDto[]> {
    return await this.videoService.findAll(page, size);
  }

  @ApiGetResponse(FindVideoResDto)
  @SkipThrottle()
  @Get(':id')
  async findOne(@Param() { id }: FindVideoReqDto): Promise<FindVideoResDto> {
    return await this.videoService.findOne(id);
  }
}
