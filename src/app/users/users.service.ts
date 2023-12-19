import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, of } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entity/users.entity';

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

  async findOne(id: number): Promise<CreateUserDto> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(`User with ${id} not found`);
      }

      this.usersRepository.findOneBy({ id });
      return await user;
    } catch (error) {
      throw error;
    }
  }

  async store(data: CreateUserDto): Promise<CreateUserDto> {
    const existingUser = await this.usersRepository.findOneBy({
      email: data.email,
    });
    if (existingUser) {
      throw new NotFoundException(`Email já cadastrado.`);
    }

    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async update(id: number, data: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      this.usersRepository.merge(user, data);

      const updatedUser = await this.usersRepository.save(user);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  delete(id: number): Observable<CreateUserDto> {
    from(this.usersRepository.findOneByOrFail({ id }));
    this.usersRepository.softDelete({ id });
    return of(null);
  }
}
