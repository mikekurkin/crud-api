import { v4 as uuid } from 'uuid';

export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export class UsersDB {
  private entries: { [id: string]: User };
  constructor(users?: User[]) {
    this.entries =
      users?.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}) || {};
  }

  list() {
    return this.entries;
  }

  create(username: string, age: number, hobbies?: string[]) {
    const newUser: User = {
      id: uuid(),
      username,
      age,
      hobbies: hobbies || [],
    };
    if (this.entries[newUser.id]) throw new Error('user can not be created');
    this.entries[newUser.id] = newUser;
    return newUser;
  }

  read(userId: string) {
    if (!this.entries[userId]) throw new RangeError('user not found');
    return this.entries[userId]!;
  }

  update(userId: string, username?: string, age?: number, hobbies?: string[]) {
    const user = this.entries[userId];
    if (!user) throw new RangeError('user not found');

    if (username) user.username = username;
    if (age) user.age = age;
    if (hobbies) user.hobbies = hobbies;

    return user;
  }

  delete(userId: string) {
    const user = this.entries[userId];
    if (!user) throw new RangeError('user not found');

    delete this.entries[userId];
    return;
  }
}

export const users = new UsersDB();
