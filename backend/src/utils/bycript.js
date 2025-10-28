import bcrypt from "bcryptjs";

export const hashValue = async (value, saltRounds) => bcrypt.hash(value, saltRounds || 10);
export const compareValue = async (valuel, hashedValue) =>
    bcrypt.compare(val, hashedValue).catch(() => false);