import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  passwordHash: string;
}

export class LoginResponseDTO {
  guid: string;
  token: string;
  email: string;
  name: string;
}
