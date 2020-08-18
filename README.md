# esn-api-client
REST API client for OpenPaaS ESN

## Installation

NPM and Yarn:

`npm install https://github.com/OpenPaaS-Suite/esn-api-client`

`yarn add https://github.com/OpenPaaS-Suite/esn-api-client`

## Usage

```javascript
const {
  Client,
  applicationDiscoveryServiceApi
} = require('esn-api-client');

const client = new Client({
  baseURL: 'https://open-paas.org/api',
  auth: {
    type: 'basic',
    username: '<username>',
    password: '<password>'
    // OR by JWT
    // type: 'jwt',
    // token: '<token>'
  }
});

adsApi = applicationDiscoveryServiceApi(client);

adsApi.listServices()
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

Available APIs are:
  - `applicationDiscoveryServiceApi`: API to manage application discovery services

## Developing
- `npm run test` run lint & unit tests
- `npm run lint` run lint
- `npm run build:dev` to bundle with development mode
- `npm run build:prod` to bundle with production mode
- `npm run unit-test` to run unit tests