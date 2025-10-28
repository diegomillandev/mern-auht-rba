import bcrypt from "bcrypt";

export const hashPassword = async (value, saltRounds) => bcrypt.hash(value, saltRounds || 10);