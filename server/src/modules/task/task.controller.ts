import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseData } from '@common/response.util';

@Controller('tasks')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(): Promise<any> {
    const res = await this.taskService.getAllTasks();
    return new ResponseData(200, res);
  }
}
