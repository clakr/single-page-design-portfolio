/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_NAME: string;
  readonly VITE_PROJECT_LINK: string;
  readonly VITE_PROJECT_REPOSITORY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
