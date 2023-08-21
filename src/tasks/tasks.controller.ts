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
import { TaskResponse, TasksService } from './tasks.service';
import { Task } from 'src/tasks/interfaces/task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Observable<CreateTaskDto> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(): Observable<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<TaskResponse> {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: Task): Observable<Task> {
    task.id = +id;
    return this.taskService.update(task);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<Task> {
    return this.taskService.delete(id);
  }
}
