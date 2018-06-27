import axios from "axios";

const user_service_url: string = "http://localhost:8080";
const auth_endpoint: string = "/api/auth/authenticate";

export enum Service {
  KJYR = "433f7cd9-e7db-42fb-aceb-c3716c6ef2b7",
  EVENT_CALENDAR = "65a0058d-f9da-4e76-a00a-6013300cab5f"
}

export interface AuthenticationResult {
  token?: string;
  error?: string;
  success?: boolean;
}

export interface ClientOptions {
  baseURL?: string;
  timeout?: number;
}

const authenticate = async (
  username: string,
  password: string,
  serviceIdentifier: Service | string,
  options?: ClientOptions
): Promise<AuthenticationResult> => {
  let authRes: AuthenticationResult;

  try {
    const res = await axios
      .create({
        baseURL:
          options && options.baseURL ? options.baseURL : user_service_url,
        timeout: options && options.timeout ? options.timeout : 2000
      })
      .post(auth_endpoint, {
        username,
        password,
        serviceIdentifier
      });

    authRes = {
      token: res.data.payload.token,
      success: true
    };

    return authRes;
  } catch (err) {
    authRes = {
      success: false,
      error: err.response
    };

    throw authRes;
  }
};

export default {
  authenticate
};
