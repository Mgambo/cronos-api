# Cronos API

<p align="left">
    <img alt="Node 20.10.0" src="https://img.shields.io/badge/node-v20.10.0-blue">
    <img alt="NPM 10.2.3" src="https://img.shields.io/badge/npm-v10.2.3-blue">
</p>

## Project Instructions

### Install all the packages

```bash
npm install
```

```bash
pnpm install
```

```bash
yarn
```

### Setup local environment

```bash
cp .env.example .env
```

After copied, please make sure to update all the api key and database configuration.

### Start development

```bash
npm run dev
```

### Build project

```bash
npm run build
```

### Start project

```bash
npm start
```

### Test project

```bash
npm test
```

## Test Endpoint Example

```bash
## CRO balance
curl --location 'http://localhost:3000/api/v1/balance/{address}' \
--header 'x-app-key: abc'

## specific token balance
curl --location 'http://localhost:3000/api/v1/token-balance/${address}/${tokenAddress}' \
--header 'x-app-key: abc'
```

## Authentication and rate-limiting

For authentication, we are using x-app-key and you will need to setup the api key first in the config before start up the project.

Authentication and rate-limiting config are in [here](src/config/app.ts)

## Tasks

- [x] Technical
- [x] Security
- [x] Performance
- [x] Input Validation & Error Handling
- [x] Testing
- [x] Setup and Documentation
- [x] Swagger
- [x] Redis
- [x] Dockerfile
- [x] Analytics: API usage state per key
- [x] CI configuration
