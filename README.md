# user-service-js-client

An NPM package used to authenticate to TKO-äly's services. Includes TypeScript typings.

## Usage

```typescript
import Auth, { Service } from "user-service-js-client";

async () => {
  try {
    const res = await Auth.authenticate("test_user", "test_user", Service.KJYR);
    const token: string = res.token;
  } catch (err) {
  }
};
```