import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/business/user.service';
import { UserController } from './user.controller';
import * as mocks from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', async () => {
    const req = mocks.createRequest();
    req.res = mocks.createResponse();

    expect(controller).toBeDefined();
    const result = await controller.login(req.res, {
      email: 'asd',
      passwordHash: 'asd',
    });
  });
});
