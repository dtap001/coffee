"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Server = /** @class */ (function () {
    function Server() {
        var app = express_1.default();
        var port = 3000;
        app.get('/', function (req, res) {
            res.send('The sedulous hyena ate the antelope!');
        });
        app.listen(port, function (err) {
            if (err) {
                return console.error(err);
            }
            return console.log("server is listening on " + port);
        });
    }
    return Server;
}());
exports.Server = Server;
