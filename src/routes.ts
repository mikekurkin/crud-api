import { HandlersDictionary } from 'types';
import {
  badRequestHandler,
  notFoundHandler,
  serverErrorHandler,
} from './route.ts';
import { User, users } from './users.ts';

export const routes: HandlersDictionary = {
  users: {
    list: () => {
      return { code: 200, data: users.list() };
    },
    create: (data) => {
      var userData = data?.post as User;
      const user = users.create(
        userData.username,
        userData.age,
        userData.hobbies,
      );
      return { code: 200, data: user };
    },
    read: (data) => {
      const { resourceId } = data!;
      if (!resourceId) return badRequestHandler();
      let user;
      try {
        user = users.read(resourceId);
      } catch (err) {
        if (err instanceof RangeError) return notFoundHandler();
        return serverErrorHandler();
      }
      return { code: 200, data: user };
    },
    update: () => {
      return { code: 200, data: 'update user placeholder' };
    },
    delete: () => {
      return { code: 200, data: 'delete user placeholder' };
    },
  },
};
