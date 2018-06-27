# user-service-js-client

A NPM package used to authenticate to TKO-äly's services.

## Usage

```typescript
import Auth, { Service } from "user-service-js-client";

async () => {
  try {
    const res = await Auth.authenticate("test_user", "test_user", Service.KJYR);
    const token: string = res.token;
    console.log(token);
  } catch (err) {
    console.error(err);
  }
};

```