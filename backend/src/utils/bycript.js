import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
}
export const comparePassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
}