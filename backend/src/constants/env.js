const getEnv = (key, defaultValue = undefined) => {
    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return value;
}

export const PORT = getEnv('PORT', 3000);
export const MONGO_URI = getEnv('MONGO_URI');
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');