import axios, { AxiosResponse } from "axios";

const user_service_url: string = "http://localhost:8080";
const auth_endpoint: string = "/api/auth/authenticate";
const user_endpoint: string = "/api/users/me";

/**
 * Service enums.
 *
 * @export
 * @enum {number}
 */
export enum Service {
  KJYR = "433f7cd9-e7db-42fb-aceb-c3716c6ef2b7",
  EVENT_CALENDAR = "65a0058d-f9da-4e76-a00a-6013300cab5f"
}

/**
 * Authentication result interface.
 *
 * @export
 * @interface AuthenticationResult
 */
export interface AuthenticationResult {
  /**
   * True if the request succeeds.
   *
   * @type {boolean}
   * @memberof AuthenticationResult
   */
  ok?: boolean;
  /**
   * Response message.
   *
   * @type {string}
   * @memberof AuthenticationResult
   */
  message?: string;
  /**
   * Token payload.
   *
   * @type {TokenPayload}
   * @memberof AuthenticationResult
   */
  payload: TokenPayload;
}

/**
 * Token payload.
 *
 * @export
 * @interface TokenPayload
 */
export interface TokenPayload {
  /**
   * JWT.
   *
   * @type {string}
   * @memberof TokenPayload
   */
  token?: string;
}

/**
 * Client options.
 *
 * @export
 * @interface ClientOptions
 */
export interface ClientOptions {
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

/**
 * Authentication model.
 *
 * @export
 * @interface AuthenticationModel
 */
export interface AuthenticationModel {
  token?: string;
  success: boolean;
  error?: string;
}

/**
 * Authenticates the user.
 *
 * @param {string} username Username
 * @param {string} password Password
 * @param {(Service | string)} serviceIdentifier Service idenfitier
 * @param {ClientOptions} [options] Request options
 * @returns {Promise<AuthenticationModel>} Authentication model
 */
async function authenticate(
  username: string,
  password: string,
  serviceIdentifier: Service | string,
  options?: ClientOptions
): Promise<AuthenticationModel> {
  try {
    const res: AxiosResponse<AuthenticationResult> = await axios
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

    return {
      token: res.data.payload.token,
      success: true
    } as AuthenticationModel;
  } catch (err) {
    throw {
      success: false,
      error: err.response
    } as AuthenticationModel;
  }
}

async function getMyData(
  token: string,
  serviceIdentifier: Service | string,
  options?: ClientOptions
) {
  const res: AxiosResponse<any> = await axios
    .create({
      baseURL: options && options.baseURL ? options.baseURL : user_service_url,
      timeout: options && options.timeout ? options.timeout : 2000,
      headers: {
        Authorization: "Bearer " + token,
        Service: serviceIdentifier
      }
    })
    .get(user_endpoint);
}

export default {
  authenticate,
  getMyData
};
