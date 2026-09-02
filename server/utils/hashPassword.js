
import bcrypt from "bcryptjs";

// HASH PASSWORD
export const hashPasswod = async (password) => {
  return await bcrypt.hash(password, 10);
};

// COMPARE PASSWORD
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

