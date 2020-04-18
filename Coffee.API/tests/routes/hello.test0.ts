import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Server } from '../../server';
import { HelloRoute } from '../../routes/hello';

chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;
//Parse the assertion library to get the request function as chai.request is not found
let chaiLib = <any>chai;
let chaiRequestLib = chaiLib.default.request;
let chaiAsserLib = chaiLib.default.assert;
const server = new Server();
const helloRoute = new HelloRoute();
describe('Testing hellRoute', () => {
    it('Test', (done) => {
        chaiRequestLib(server.getApp()).get(helloRoute.getPath())
            .send({
                "id": 234242,
                "data": {
                    "displayname": "name",
                    "avatar": "displayname"
                }
            })
            .then((res: any) => {
                //chaiAsserLib(res.body.displayname).to.eql('name'); // assertion expression which will be true if "displayname" equal to "name" 
                chai.expect(res.status).to.eql(200);// expression which will be true if response status equal to 200 
                done();
            }).catch((err) => {
                console.log("Catched : " + JSON.stringify(err))
            });
    }).timeout(8000);
});
/*import chai from "chai";
import request from "supertest";
import 'mocha';
import { Server } from '../../server';
import { Log } from "../../log";
import { HelloRoute } from "../../routes/hello";
import { RouteSuccessResult } from "../../routes/route";
import { doesNotThrow } from "assert";

let route = new HelloRoute();
const expect = chai.expect;
const server = new Server();

describe('Testing helloRoute', () => {
    it('should return response on call', (done) => {
        request(server.getApp())
            .post(route.getPath())
            .set('Accept', 'application/json')
            .send({})
           //.expect('Content-Type', /json/)
            //.expect(200, done)
            .then(response => {
                chai.expect(response.body.email, 'foo@bar.com')
                done();
            })
        // return chai.request(server.getApp()).get(route.getPath())
        //     .then(res => {
         //        Log.i(JSON.stringify(res.body))
        //         chai.expect(res.body).to.eql(new RouteSuccessResult(HelloRoute.Message()));
        //     });W
    })
})*/