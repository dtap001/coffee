import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Log } from '../../log';
import { RoleEntity } from '../../storage/entities/Role';
import { UserEntity } from '../../storage/entities/User';
import { TestStorage } from '../utils';

chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;
//Parse the assertion library to get the request function as chai.request is not found
let chaiLib = <any>chai;
let chaiRequestLib = chaiLib.default.request;
let chaiAsserLib = chaiLib.default.assert;
describe('Filling DB', () => {
    it('Default roles', (done) => {
        try {
            const init = async () => {
                let storage = new TestStorage();
                await storage.initialize();
                let adminRole = await storage.con.getRepository(RoleEntity).findOne({ caption: "admin" });
                if (adminRole == null) { adminRole = new RoleEntity(); }
                adminRole.caption = "admin";

                let userRole = await storage.con.getRepository(RoleEntity).findOne({ caption: "user" });
                if (userRole == null) { userRole = new RoleEntity(); }
                userRole.caption = "user";
                await storage.con.getRepository(RoleEntity).save([adminRole, userRole]);
                return done();
            }
            init();
        } catch (err) {
            Log.e("Initialization interrupted. Exiting.", err);
        }
    }).timeout(8000);
    it('Default users', (done) => {
        try {
            const init = async () => {
                let storage = new TestStorage();
                await storage.initialize();

                let adminRole = await storage.con.getRepository(RoleEntity).findOne({ caption: "admin" } as RoleEntity);

                let admin = await storage.con.getRepository(UserEntity).findOne({ name: "admin" } as UserEntity);
                if (admin == null) {
                    admin = new UserEntity();
                }
                admin.name = "admin";
                admin.email = "admin@admin.hu";
                admin.passwordHash = "pass";
                admin.roles = [adminRole];

                await storage.con.getRepository(UserEntity).save(admin);
                done();
            }
            init();
        } catch (err) {
            Log.e("Initialization interrupted. Exiting.", err);
        }
    }).timeout(80000);
});
