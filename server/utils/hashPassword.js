import bcrypt from 'bcryptjs'

export const hashPasswod = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashPasswod) => {
    return await bcrypt.compare(password, hashPasswod);
};