import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Task } from 'src/tasks/interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';

export interface TaskResponse {
  task?: Task;
  errorMessage?: string;
}

@Injectable()
export class TasksService {
  private readonly task: Task[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Title ${i + 1}`,
    body: `Body ${i + 1}`,
    done: i % 2 === 0 ? true : false,
  }));

  create(task: CreateTaskDto): Observable<CreateTaskDto> {
    let lastId = 0;
    if (this.task.length > 0) {
      lastId = this.task[this.task.length - 1].id;
    }

    task.id = lastId + 1;
    this.task.push(task);
    return of(task);
  }

  findAll(): Observable<Task[]> {
    return of(this.task);
  }

  findOne(id: string): Observable<TaskResponse> {
    const task = this.task.find((d) => d.id === +id);
    return task
      ? of({ task })
      : of({ errorMessage: `Tarefa com id: ${id} não encontrada!` });
  }

  update(task: Task): Observable<Task> {
    const taskForUpdate = this.task.find((d) => d.id === task.id);
    if (taskForUpdate) {
      taskForUpdate.id = task.id;
      taskForUpdate.title = task.title;
      taskForUpdate.body = task.body;
      taskForUpdate.done = task.done;
    }

    return of(taskForUpdate);
  }

  delete(id: string): Observable<Task> {
    const index = this.task.findIndex((value) => value.id === +id);
    const [taskRemoved] = this.task.splice(index, 1);
    return of(taskRemoved);
  }
}
