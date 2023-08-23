import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto): Observable<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('all')
  findAll(): Observable<Task[]> {
    return this.taskService.getTasks();
  }

  @Get('/:taskId')
  findOne(@Param('taskId') taskId: number): Observable<Task> {
    return this.taskService.getTask(taskId);
  }

  @Put('/edit/:taskId')
  update(
    @Param('taskId') taskId: number,
    @Body() task: Task,
  ): Observable<Task> {
    return this.taskService.updateTask(taskId, task);
  }

  @Delete('/delete/:taskId')
  delete(@Param('taskId') taskId: number) {
    this.taskService.delete(taskId);
  }
}
