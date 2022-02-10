import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as mocks from 'node-mocks-http';
import { UserModule } from '../../../user/user.module';
import { CoffeeSecurity } from '../../../shared/util/security';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('gets default hash', () => {
    const hash = new CoffeeSecurity().hash('admin');
    console.log(hash);
  });
  it('work finally fucker', async () => {
    const req = mocks.createRequest();
    req.res = mocks.createResponse();

    expect(controller).toBeDefined();
    const result = await controller.login(req.res, {
      email: 'asd',
      passwordHash: 'asd',
    });
  });
});
