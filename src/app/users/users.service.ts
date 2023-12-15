import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Observable,
  catchError,
  from,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { Repository } from 'typeorm';
import { UsersEntity } from './entity/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  findAll(): Observable<any> {
    return from(
      this.usersRepository.find({
        select: ['id', 'name', 'email'],
      }),
    );
  }

  findOne(id: number): Observable<any> {
    return from(this.usersRepository.findOne({ where: { id } })).pipe(
      catchError(() =>
        throwError(new NotFoundException(`User with ${id} not found`)),
      ),
      map((user) => {
        if (!user) {
          throw new NotFoundException(`User with ${id} not found`);
        }
        this.usersRepository.findOneBy({ id });
        return user;
      }),
    );
  }

  store(data: CreateUserDto): Observable<any> {
    const user = this.usersRepository.create(data);
    return from(this.usersRepository.save(user));
  }

  update(id: number, data: UpdateUserDto): Observable<any> {
    return from(this.usersRepository.findOne({ where: { id } })).pipe(
      catchError(() => throwError(new NotFoundException('User not found'))),
      switchMap((user) => {
        if (!user) {
          throw new NotFoundException('User not found');
        }

        this.usersRepository.merge(user, data);

        return from(this.usersRepository.save(user));
      }),
    );
  }

  delete(id: number): Observable<any> {
    from(this.usersRepository.findOneByOrFail({ id }));
    this.usersRepository.softDelete({ id });
    return of(null);
  }
}
