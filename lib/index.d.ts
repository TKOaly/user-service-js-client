export declare enum Service {
    KJYR = "433f7cd9-e7db-42fb-aceb-c3716c6ef2b7",
    EVENT_CALENDAR = "65a0058d-f9da-4e76-a00a-6013300cab5f"
}
export interface AuthenticationResult {
    ok?: boolean;
    message?: string;
    payload: TokenPayload;
}
export interface TokenPayload {
    token?: string;
}
export interface ClientOptions {
    baseURL?: string;
    timeout?: number;
}
export interface AuthenticationModel {
    token?: string;
    success: boolean;
    error?: string;
}
declare function authenticate(username: string, password: string, serviceIdentifier: Service | string, options?: ClientOptions): Promise<AuthenticationModel>;
declare function getMyData(token: string, serviceIdentifier: Service | string, options?: ClientOptions): Promise<any>;
declare const _default: {
    authenticate: typeof authenticate;
    getMyData: typeof getMyData;
};
export default _default;
//# sourceMappingURL=index.d.ts.map