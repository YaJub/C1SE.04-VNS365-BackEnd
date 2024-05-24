import { JwtAdminAuthGuard } from '@app/modules/auth/guards/admin-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/shared/decorators';
import { StoryService } from './story.service';

@Controller('admin/story')
export class StoryController {
  constructor(private readonly service: StoryService) {}

  @UseGuards(JwtAdminAuthGuard)
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,

    @Query('id') id?: number,
    @Query('name') name?: string,
    @Query('status') status?: string,
    @Query('region') region?: string,
  ) {
    return this.service.findAll({
      page: +page,
      perPage: +perPage,
      region,
      filter: { id: Number(id), name, status },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Post()
  create(@Body() createTaskDto: any, @GetCurrentUserId() userId: number) {
    return this.service.create(userId, {
      ...createTaskDto,
    });
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateTaskDto: any) {
    return this.service.updateStatus(+id, updateTaskDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: any) {
    return this.service.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
