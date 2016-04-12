import * as Router from 'koa-router';
import UserController from '../src/controller/UserController';

export default {
  "/user": {
    "get": UserController.get
  }
};
