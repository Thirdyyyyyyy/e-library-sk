import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const saltRounds = parseInt(salt);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};

export const checkHashedPassword = async (
  password: string,
  userPassword: string
) => {
  console.log('Checking password', password);
  const isPasswordValid: boolean = await bcrypt.compare(password, userPassword);
  console.log('isPasswordValid', isPasswordValid);

  return isPasswordValid;
};
