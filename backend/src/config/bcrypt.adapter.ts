import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

const bcryptAdapter = {
  hash: (password: string) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  },
  compare: (password: string, hashedPassword: string) => {
    return compareSync(password, hashedPassword);
  } 
};

export default bcryptAdapter;
