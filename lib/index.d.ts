declare module "user-service-js-client" {
  enum Service {
    KJYR = "433f7cd9-e7db-42fb-aceb-c3716c6ef2b7",
    EVENT_CALENDAR = "65a0058d-f9da-4e76-a00a-6013300cab5f"
  }

  interface AuthenticationResult {
    token?: string;
    error?: string;
    success?: boolean;
  }

  interface ClientOptions {
    baseURL?: string;
    timeout?: number;
  }
}
