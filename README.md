## Installation

```bash
$ npm install
```

## Database set up

1. Create Database "task_management" in MySql.
  Execute Query-> CREATE DATABASE `task_management;

2. Copy the content of the "example.env" file to a new ".env" file and replace Username and Password for the MySql. 
 
## Swagger API Documentation

1. checkout the API documentation on http://localhost:8888/api

2. Postman Collection is provided in the root folder.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
