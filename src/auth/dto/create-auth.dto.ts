import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
