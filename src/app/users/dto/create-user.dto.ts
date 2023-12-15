import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { REGEX_HELPERS } from 'src/helpres/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(REGEX_HELPERS.password, {
    message:
      'A senha deve conter letras maiúscula, minuscula, símbulo e número',
  })
  password: string;

  @IsNotEmpty()
  name: string;
}
