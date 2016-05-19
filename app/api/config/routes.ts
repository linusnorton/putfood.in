import UserController from '../src/controller/UserController';
import AuthController from '../src/controller/AuthController';
import HouseController from '../src/controller/HouseController';

export default {
  "/user/:email": {
    "get": UserController.get,
    "put": UserController.put,
  },
  "/user/:email/house/": {
    "post": UserController.invite,
  },
  "/user/:email/house/:houseid": {
    "delete": UserController.uninvite
  },
  "/user": {
    "post": UserController.post
  },
  "/auth": {
    "post": AuthController.post
  },
  "/house": {
    "post": HouseController.post,
  }
};
