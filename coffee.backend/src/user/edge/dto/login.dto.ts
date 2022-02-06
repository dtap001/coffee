export class LoginRequestDTO {
  email: string;
  passwordHash: string;
}

export class LoginResponseDTO {
  guid: string;
  token: string;
  email: string;
  name: string;
}
