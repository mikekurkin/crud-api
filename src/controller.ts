import { HandlersDictionary } from 'types';
import { validate as uuidValidate } from 'uuid';
import { BadRequestError, NotFoundError, ServerError } from './errors';
import { User, users } from './users';

export const routes: HandlersDictionary = {
  users: {
    list: () => {
      return { code: 200, data: users.list() };
    },
    create: (data) => {
      const requiredFields = ['username', 'age', 'hobbies'];
      if (
        !(
          data?.post &&
          requiredFields.every((key) => Object.keys(data?.post).includes(key))
        )
      )
        throw new BadRequestError(
          `Required Fields: ${requiredFields.join(', ')}`,
        );
      const userData = data?.post as User;

      const user = users.create(
        userData.username,
        userData.age,
        userData.hobbies,
      );
      if (user === null) throw new ServerError('User Cannot Be Created');
      return { code: 201, data: user };
    },
    read: (data) => {
      const { resourceId } = data!;
      if (!resourceId || !uuidValidate(resourceId))
        throw new BadRequestError('Invalid ID');
      const user = users.read(resourceId);
      if (user === null) throw new NotFoundError('User Not Found');
      return { code: 200, data: user };
    },
    update: (data) => {
      const { resourceId } = data!;
      if (!resourceId || !uuidValidate(resourceId))
        throw new BadRequestError('Invalid ID');
      const userData = data?.post as User;
      const user = users.update(
        resourceId,
        userData.username,
        userData.age,
        userData.hobbies,
      );
      if (user === null) throw new NotFoundError('User Not Found');
      return { code: 200, data: user };
    },
    delete: (data) => {
      const { resourceId } = data!;
      if (!resourceId || !uuidValidate(resourceId))
        throw new BadRequestError('Invalid ID');
      const user = users.delete(resourceId);
      if (user === null) throw new NotFoundError('User Not Found');
      return { code: 204, data: {} };
    },
  },
};
