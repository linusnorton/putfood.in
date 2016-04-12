import UserController from '../src/controller/UserController';

export default {
  "/user/:id": {
    "get": UserController.get
  }
};
