import { HandlersDictionary } from 'types';
import {
  badRequestHandler,
  notFoundHandler,
  serverErrorHandler,
} from './route.ts';
import { users } from './users.ts';

export const routes: HandlersDictionary = {
  users: {
    list: () => {
      return { code: 200, data: users.list() };
    },
    create: () => {
      return { code: 200, data: 'create user placeholder' };
    },
    read: (id) => {
      if (!id) return badRequestHandler();
      let user;
      try {
        user = users.read(id);
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
