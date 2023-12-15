// import { IsString } from 'class-validator';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsBoolean()
  done: boolean;
}
