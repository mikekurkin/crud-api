import { HandlersDictionary } from 'types';

export const routes: HandlersDictionary = {
  users: {
    list: () => {
      return { code: 200, data: 'list users placeholder' };
    },
    create: () => {
      return { code: 200, data: 'create user placeholder' };
    },
    read: () => {
      return { code: 200, data: 'read user placeholder' };
    },
    update: () => {
      return { code: 200, data: 'update user placeholder' };
    },
    delete: () => {
      return { code: 200, data: 'delete user placeholder' };
    },
  },
};
