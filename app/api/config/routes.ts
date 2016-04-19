import UserController from '../src/controller/UserController';

export default {
  "/user/:email": {
    "get": UserController.get
  }
};
