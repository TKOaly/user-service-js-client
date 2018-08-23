export declare const USER_SERVICE_URL: string;
export declare enum Service {
    KJYR = "433f7cd9-e7db-42fb-aceb-c3716c6ef2b7",
    EVENT_CALENDAR = "65a0058d-f9da-4e76-a00a-6013300cab5f"
}
export interface UserObject {
    id?: number;
    username?: string;
    name?: string;
    screenName?: string;
    email?: string;
    residence?: string;
    phone?: string;
    isHYYMember?: boolean;
    membership?: string;
    role?: string;
    createdAt?: Date;
    modifiedAt?: Date;
    isTKTL?: boolean;
    isDeleted?: boolean;
}
export interface ClientOptions {
    baseURL?: string;
    timeout?: number;
}
export interface ServiceResponse<T> {
    payload?: T;
    message: string;
    ok: boolean | null;
}
declare function getMyData(token: string, serviceIdentifier: Service | string, options?: ClientOptions): Promise<ServiceResponse<UserObject>>;
declare const _default: {
    getMyData: typeof getMyData;
};
export default _default;
//# sourceMappingURL=index.d.ts.map