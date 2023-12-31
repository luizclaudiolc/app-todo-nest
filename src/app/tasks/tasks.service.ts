import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, catchError, from, map, of, throwError } from 'rxjs';
// import { Task as TaskInterface } from 'src/tasks/interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/tasks.entity';
import { Repository } from 'typeorm';

// export interface TaskResponse {
//   task?: Task;
//   errorMessage?: string;
// }

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  createTask(task: CreateTaskDto): Observable<Task> {
    const newTask = this.taskRepository.create(task);
    return from(this.taskRepository.save(newTask));
  }

  getTasks(): Observable<Task[]> {
    return from(this.taskRepository.find());
  }

  getTask(taskId: number): Observable<Task> {
    return from(
      this.taskRepository.findOne({
        where: { id: taskId },
      }),
    );
    /* para selecionar diretamento na coluna */
    // return from(this.taskRepository.findOneBy({ id: taskId }));
  }

  updateTask(taskId: number, taks: CreateTaskDto): Observable<Task> {
    return from(this.taskRepository.findOneBy({ id: taskId })).pipe(
      catchError(() => throwError(new NotFoundException('Task not found'))),
      map((editTask) => {
        if (!editTask) {
          throw new NotFoundException('Task not found');
        }
        this.taskRepository.update({ id: taskId }, taks);
        return editTask;
      }),
    );
  }

  delete(taskId: number): Observable<void> {
    this.taskRepository.delete(taskId);
    return of();
  }
}
