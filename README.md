## Description

This API gives suggestions of counties based on the parameter given by the user.

## Installation

```bash
$ npm install
```

## Running the app
Creates two services, one for MongoDB and one for the API. It also automatically seeds the database.
```bash
# production mode
$ docker compose up
```

## Unit Test

```bash
$ npm run test --watch
```

## Test
Go to your postman or browser.
In you production, find out the IP and connect to the webapp using the port `3000`;
In local dev, you can connect by going to `http://localhost:3000/suggest?q=foo,foo`
