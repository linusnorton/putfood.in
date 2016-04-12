import * as Router from 'koa-router';
import UserController from '../controller/UserController';

export default {
  "/user": {
    "get": UserController.get
  }
};
