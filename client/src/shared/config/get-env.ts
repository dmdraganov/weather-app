type EnvKey = Extract<keyof ImportMetaEnv, `VITE_${string}`>;

export function getEnv(key: EnvKey): string {
  const value = import.meta.env[key];

  if (!value) {
    const error = new Error(`Environment variable ${key} is not defined`);
    console.error(error);
    throw error;
  }

  return value;
}
