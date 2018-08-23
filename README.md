# user-service-js-client

An NPM package used to access data from TKO-äly user service. Includes TypeScript typings.

## Installation

1. Install the dependency with `npm install --save https://github.com/TKOaly/user-service-js-client.git` or `yarn add https://github.com/TKOaly/user-service-js-client.git` depending on if you use npm or Yarn.

2. Import the dependency in your code using ES6's import syntax `import userService from "@tkoaly/user-service-client";` or by the classic way: `const userService = require("@tkoaly/user-service-client");`

## Example

```typescript
import userService, { Service, ServiceResponse, UserObject } from "@tkoaly/user-service-client";

// This async block of code returns user data for a service from https://users.tko-aly.fi
// Before the user can benefit from the use of this library, the user must authenticate him/herself in https://users.tko-aly.fi.
// The token can then be obtained from the browser's cookies.

try {
    const res: ServiceResponse<UserObject> = await userService.getMyData("JWT_TOKEN", Service.KJYR);
    console.log(res);
} catch(ex) {
    console.error(ex);
}

```

The client can be customized by the ClientOptions object:

```typescript
interface ClientOptions {
  /**
   * Base URL of the request.
   *
   * @type {string}
   * @memberof ClientOptions
   */
  baseURL?: string;
  /**
   * Request timeout.
   *
   * @type {number}
   * @memberof ClientOptions
   */
  timeout?: number;
}
```

## License

This project has been licensed with MIT license.