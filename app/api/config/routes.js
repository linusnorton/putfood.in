"use strict";
var UserController_1 = require('../src/controller/UserController');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "/user": {
        "get": UserController_1.default.get
    }
};
