import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Task } from 'src/tasks/interfaces/task.interface';

@Injectable()
export class TasksService {
  private readonly task: Task[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Title ${i + 1}`,
    body: `Body ${i + 1}`,
    done: true,
  }));

  create(task: Task) {
    this.task.push(task);
  }

  findAll(): Observable<Task[]> {
    return of(this.task);
  }

  findOne(id: string): Observable<Task> {
    return of(this.task.find((d) => d.id === +id));
  }
}
