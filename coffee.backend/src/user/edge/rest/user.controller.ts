import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from '../../../user/business/user.service';
import { LoginRequestDTO, LoginResponseDTO } from '../dto/login.dto';
import { Response } from 'express';
import { BaseController } from '../../../shared/edge/base.controller';

@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post('login')
  async login(@Res() res: Response, @Body() dto: LoginRequestDTO) {
    const result = await this.userService.validateLogin(
      dto.email,
      dto.passwordHash,
    );
    return res.status(HttpStatus.OK).json({
      email: result.user.email,
      token: result.token,
    } as LoginResponseDTO);
  }
}
