import chai from "chai";
import chaiHttp = require('chai-http');
import 'mocha';



import { Server } from '../../server';
import { Log } from "../../log";
import { HelloRoute } from "../../routes/hello";

chai.use(chaiHttp);
let route = new HelloRoute();
const expect = chai.expect;
const server = new Server();
describe('Testing helloRoute', () => {
    it('should return response on call', () => {
        return chai.request(server.getApp()).get(route.getPath())
            .then(res => {
                chai.expect(res.text).to.eql(HelloRoute.Response());
            })
    })
})