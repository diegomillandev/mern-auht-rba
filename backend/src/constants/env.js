const getEnv = (key, defaultValue = undefined) => {
    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return value;
}

export const PORT = getEnv('PORT', 3000);