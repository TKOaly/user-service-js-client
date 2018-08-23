/**
 *  TKO-äly User Service JavaScript client.
 */

import axios, { AxiosResponse } from "axios";

export const USER_SERVICE_URL: string = "https://users.tko-aly.fi";
const user_endpoint: string = "/api/users/me";

/**
 * Service enums to help the user find the correct service.
 *
 * @export
 * @enum {number}
 */
export enum Service {
  KJYR = "433f7cd9-e7db-42fb-aceb-c3716c6ef2b7",
  EVENT_CALENDAR = "65a0058d-f9da-4e76-a00a-6013300cab5f"
}

/**
 * User object.
 *
 * @export
 * @interface UserObject
 */
export interface UserObject {
  /**
   * User id
   *
   * @type {number}
   * @memberof UserObject
   */
  id?: number;
  /**
   * Username
   *
   * @type {string}
   * @memberof UserObject
   */
  username?: string;
  /**
   * Name
   *
   * @type {string}
   * @memberof UserObject
   */
  name?: string;
  /**
   * Screen name
   *
   * @type {string}
   * @memberof UserObject
   */
  screenName?: string;
  /**
   * Email
   *
   * @type {string}
   * @memberof UserObject
   */
  email?: string;
  /**
   * Residence
   *
   * @type {string}
   * @memberof UserObject
   */
  residence?: string;
  /**
   * Phone
   *
   * @type {string}
   * @memberof UserObject
   */
  phone?: string;
  /**
   * Is the user a HYY member or not
   *
   * @type {boolean}
   * @memberof UserObject
   */
  isHYYMember?: boolean;
  /**
   * Membership status
   *
   * @type {string}
   * @memberof UserObject
   */
  membership?: string;
  /**
   * Role
   *
   * @type {string}
   * @memberof UserObject
   */
  role?: string;
  /**
   * Date when the user was created at.
   *
   * @type {Date}
   * @memberof UserObject
   */
  createdAt?: Date;
  /**
   * Date when the user was last modified.
   *
   * @type {Date}
   * @memberof UserObject
   */
  modifiedAt?: Date;
  /**
   * Is the user a TKTL member or not.
   *
   * @type {boolean}
   * @memberof UserObject
   */
  isTKTL?: boolean;
  /**
   * Is the user deleted or not.
   *
   * @type {boolean}
   * @memberof UserObject
   */
  isDeleted?: boolean;
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
 * Generic service response.
 *
 * @export
 * @interface ServiceResponse
 * @template T
 */
export interface ServiceResponse<T> {
  /**
   * Payload
   *
   * @type {T}
   * @memberof ServiceResponse
   */
  payload?: T;
  /**
   * Message
   *
   * @type {string}
   * @memberof ServiceResponse
   */
  message: string;
  /**
   * Request status
   *
   * @type {(boolean | null)}
   * @memberof ServiceResponse
   */
  ok: boolean | null;
}

/**
 * Returns user data.
 *
 * @param {string} token User service token
 * @param {(Service | string)} serviceIdentifier Service identifier
 * @param {ClientOptions} [options] Client options
 * @returns {Promise<ServiceResponse<User>>} Service response.
 */
async function getMyData(
  token: string,
  serviceIdentifier: Service | string,
  options?: ClientOptions
): Promise<ServiceResponse<UserObject>> {
  const res: AxiosResponse<ServiceResponse<UserObject>> = await axios
    .create({
      baseURL: options && options.baseURL ? options.baseURL : USER_SERVICE_URL,
      timeout: options && options.timeout ? options.timeout : 2000,
      headers: {
        Authorization: "Bearer " + token,
        Service: serviceIdentifier
      }
    })
    .get(user_endpoint);
  return res.data;
}

export default {
  getMyData
};
