export function loadEnv(key: string): string | null {
    const val = process.env[key];
    if (!val) {
        console.error(`missing env var ${key}`);
    }
    return val ?? null;
}