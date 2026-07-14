/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_GEOCODE_API_URL: string;
  readonly VITE_GEOSUGGEST_API_URL: string;
  readonly VITE_GEOSUGGEST_API_KEY: string;
  readonly VITE_GEOCODE_API_KEY: string;
  readonly VITE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
