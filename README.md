# CRUD API

This is an implementation of RS School assignment: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md

## Run

Install dependencies:
`npm install`
Install only production dependencies:
`npm install --production`

Start in development mode:
`npm run start:dev`
Start in production mode (compiles to dist folder):
`npm run start:prod`

Run tests:
`npm run test`

## Usage

This is an CRUD API server which accepts following actions:

- `GET api/users` to get all users
- `GET api/users/{userId}` to get details on user by id
- `POST api/users` to create new user record\
  Accepts fields in `x-www-form-urlencoded` form. Required fields:
  - `username`
  - `age`
  - `hobbies` (array)
- `PUT api/users/{userId}` to update existing user
- `DELETE api/users/{userId}` to delete existing user from database

`userId` is always UUID-v4.

Users database is run in-memory and non-persistent.

Default port is `8080`. You can override it with `PORT=` variable in system environment or in `.env` file.

