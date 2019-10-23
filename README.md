# SCA Dev Test - API MicroService
[![CircleCI](https://circleci.com/gh/cypress-io/cypress-and-jest-typescript-example.svg?style=svg)](https://circleci.com/gh/cypress-io/cypress-and-jest-typescript-example)

Backend for Frontend Microservice for SCA Dev Test React App Written to NestJs and TypeScript


# Quick Start 
### Quick Links 
|  Link🦄 | URL |
| --- | --- |
| `Frontend repo` | https://github.com/mitni455/sca-dev-test |


##### Folder Structure
```
docker-compose.yml  --> docker compose
/microservice-spa   --> shared repo
	Dockerfile.dev 
	/server     --> NestJs server
```

### Running locally
* Run with Docker 
```bash
docker-compose up  
```

* Run without Docker 

## Installation

```bash
yarn 
```

## Running the app

```bash
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## Test

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```


