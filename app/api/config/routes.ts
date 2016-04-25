import UserController from '../src/controller/UserController';

export default {
  "/user/:email": {
    "get": UserController.get,
    "put": UserController.put,
  },
  "/user/": {
    "post": UserController.post
  }
};
