import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from 'src/tasks/interfaces/task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(): Observable<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Task> {
    return this.taskService.findOne(id);
  }
}
