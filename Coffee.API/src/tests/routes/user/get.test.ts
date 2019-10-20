import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Server } from '../../../server';
import { UsersSearchRoute } from '../../../routes/users/search';
chai.use(chaiHttp);

let chaiLib = <any>chai;
let chaiRequestLib = chaiLib.default.request;
let chaiAsserLib = chaiLib.default.assert;
/*
const server = new Server();
const route = new UsersSearchRoute();
describe(`Testing ${route.getPath()}`, () => {
    it('Should return invalid login data', (done) => {
        chaiRequestLib(server.getApp()).post(route.getPath())
            .set('content-type', 'application/json')
            .send({ querystring: "" } as UsersSearchRoute)
            .then((res: any) => {
                chaiAsserLib(res.body.displayname).to.eql('name'); // assertion expression which will be true if "displayname" equal to "name"
                chai.expect(res.status).to.eql(200);// expression which will be true if response status equal to 200
                done();
            }).catch((err) => {
                console.log("Catched : " + JSON.stringify(err))
            });
    }).timeout(8000);
});*/