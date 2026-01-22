/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_AGORA_APP_ID: string
  readonly VITE_AGORA_RTC_TOKEN: string
  readonly VITE_AGORA_CHANNEL_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
