import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  @InjectRepository(Task)
  private repository: Repository<Task>;

  async getAllTasks() {
    return await this.repository.find();
  }
}
