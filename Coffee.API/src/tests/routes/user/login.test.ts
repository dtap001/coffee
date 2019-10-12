import "reflect-metadata" // type ORM needs the invocation in global namespace
import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
//import { LoginRoute, LoginRequest } from '../../../routes/users/login';
import { API } from "../../../api";
chai.use(chaiHttp);

let chaiLib = <any>chai;
let chaiRequestLib = chaiLib.default.request;
let chaiAsserLib = chaiLib.default.assert;
let _api;
//let route;//= new LoginRoute();

describe(`Testing `, () => {
    beforeEach(function () {
        _api = new API();
        _api.start().then(function () {
            return;
        });
    });
    it('Should 400 because invalid request', (done) => {
        chaiRequestLib(_api.server.getApp()).post()//route.getPath())
            .set('content-type', 'application/json')
            .send(
                { "passwordHashX": "asd", "userX": "asd" }
            )
            .then((res: any) => {
                chai.expect(res.status).to.eql(400);
                done();
            }).catch((err) => {
                console.log("Catched : " + JSON.stringify(err))
            });
    }).timeout(8000);

    it('Should test login with correct credentials', (done) => {
        chaiRequestLib(_api.server.getApp()).post()//route.getPath())
            .set('content-type', 'application/json')
            .send(
                //  new LoginRequest().init(
                //        { passwordHash: "pass", email: "admin" })
            ).then((res: any) => {
                chai.expect(res.status).to.eql(200);
                done();
            }).catch((err) => {
                console.log("Catched : " + JSON.stringify(err))
            });
    }).timeout(8000);
});