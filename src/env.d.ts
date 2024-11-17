/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly PUBLIC_VAPI_PUBLIC_KEY: string;
    readonly SECRET_PASSWORD_PIVATE_KEY: string;
    readonly PUBLIC_VAPI_ASSISTANT_ID: string;
    readonly SECRET_PASSWORD_PHONE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
