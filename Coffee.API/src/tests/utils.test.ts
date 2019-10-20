import 'mocha';
import * as chai from 'chai';
import { CommonUtil } from '../utils'
import { LoginRequest } from '../routes/users/login';
import { JobSaveRequest } from '../routes/jobs/save';
import { Job } from '../models/job';
let chaiLib = <any>chai;
let chaiAsserLib = chaiLib.default.assert;

describe(`Testing`, () => {
    /* it('It should be ok', (done) => {
      let object = { "email": "asdasd", "passwordHash": "asdasd" };
      CommonUtil.deepEqual(object, new LoginRequest(), "");
  }).timeout(8000);*/

    it('It should be ok', (done) => {
        let object = { "job": "asdasd", "passwordHash": "asdasd" };
        let request = new JobSaveRequest();
        request.job = new Job();
        CommonUtil.deepEqual(object, request, "");
    }).timeout(8000);
});