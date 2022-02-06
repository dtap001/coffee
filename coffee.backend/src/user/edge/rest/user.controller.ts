import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/business/user.service';
import { LoginRequestDTO, LoginResponseDTO } from '../dto/login.dto';
import { Response } from 'express';
import { ErrorResponseDTO } from 'src/shared/edge/error-response.dto';
import { BusinessError } from 'src/shared/errors/business.error';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Res() res: Response, @Body() dto: LoginRequestDTO) {
    try {
      const result = await this.userService.validateLogin(
        dto.email,
        dto.passwordHash,
      );
      return res
        .status(HttpStatus.OK)
        .json({ email: result.user.email } as LoginResponseDTO);
    } catch (err) {
      switch (err.constructor) {
        case BusinessError:
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json(new ErrorResponseDTO(err));
        default:
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(new ErrorResponseDTO(err));
      }
    }
  }
}
