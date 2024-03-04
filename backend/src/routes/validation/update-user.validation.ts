import { check } from 'express-validator';
import { validateFields } from '../../middlewares';
import { invalidPasswords } from './constants';

const validationFields = [
  check('name', 'The "name" must be at least 3 characters long !').optional().isLength({ min: 3 }),
  check('name', 'The "name" must be maximum 40 characters long !').optional().isLength({ max: 40 }),

  check('email', 'The "email" must be a valid format !').optional().isEmail(),

  check('password', 'The "password" must be minimum 6 characters long !').optional().isLength({ min: 6 }),

  check('password').optional().custom((value) => {    
    if (invalidPasswords.includes(value)) {
      throw new Error(`The "${value}" password, is a very easy to hack, please choose another one !`);
    }
    return true;
  }),

  check('jobTitle', 'The "jobTitle" must be minimum 4 characters long !').optional().isLength({ min: 4 }),
  check('jobTitle', 'The "jobTitle" must be maximum 40 characters long !').optional().isLength({ max: 40 }),

  check('course', 'The "course" must be minimum 4 characters long !').optional().isLength({ min: 4 }),
  check('course', 'The "course" must be maximum 40 characters long !').optional().isLength({ max: 40 }),

  check('schedule', "The 'schedule' must be 'morning', 'afternoon' or 'evening' !")
    .optional()
    .isIn(['morning', 'afternoon', 'evening']),

  validateFields
];

export default validationFields;
