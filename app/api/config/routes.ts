import UserController from '../src/controller/UserController';
import AuthController from '../src/controller/AuthController';

export default {
  "/user/:email": {
    "get": UserController.get,
    "put": UserController.put,
  },
  "/user": {
    "post": UserController.post
  },
  "/auth": {
    "post": AuthController.post
  }
};
