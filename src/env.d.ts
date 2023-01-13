/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_AXIOS_PREFIX: string;
}
interface ImportMeta {
  env: ImportMetaEnv;
}
