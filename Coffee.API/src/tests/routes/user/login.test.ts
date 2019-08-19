import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Server } from '../../../server';
import { LoginRoute, LoginRequest } from '../../../routes/users/login';
chai.use(chaiHttp);

let chaiLib = <any>chai;
let chaiRequestLib = chaiLib.default.request;
let chaiAsserLib = chaiLib.default.assert;

const server = new Server();
const route = new LoginRoute();
describe(`Testing ${route.getPath()}`, () => {
    it('Should 400 because invalid request', (done) => {
        chaiRequestLib(server.getApp()).post(route.getPath())
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

    it('Should return invalid login data', (done) => {
        chaiRequestLib(server.getApp()).post(route.getPath())
            .set('content-type', 'application/json')
            .send(
                new LoginRequest().init(
                    { passwordHash: "asd", user: "asd" })
            ).then((res: any) => {
                chaiAsserLib(res.body.displayname).to.eql('name'); // assertion expression which will be true if "displayname" equal to "name" 
                chai.expect(res.status).to.eql(200);// expression which will be true if response status equal to 200 
                done();
            }).catch((err) => {
                console.log("Catched : " + JSON.stringify(err))
            });
    }).timeout(8000);
});