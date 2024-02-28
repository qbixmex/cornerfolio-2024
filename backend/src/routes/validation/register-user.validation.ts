import { check } from "express-validator";
import { validateFields } from "../../middlewares";
import { invalidPasswords } from "./constants";

const validationFields = [
  check('name', 'The "name" is required !').trim().not().isEmpty(),
  check('name', 'The "name" must be at least 3 characters long !').isLength({ min: 3 }),
  check('name', 'The "name" must be maximum 40 characters long !').isLength({ max: 40 }),

  check('email', 'The "email" is required !').not().isEmpty(),
  check('email', 'The "email" must be a valid format !').isEmail(),

  check('password', 'The "password" is required !').not().isEmpty(),
  check('password', 'The "password" must be minimum 6 characters long !').isLength({ min: 6 }),

  check('password').custom((value) => {    
    if (invalidPasswords.includes(value)) {
      throw new Error(`The "${value}" password, is a very easy to hack, please choose another one !`);
    }
    return true;
  }),

  check('jobTitle', 'The "jobTitle" is required !').not().isEmpty(),
  check('jobTitle', 'The "jobTitle" must be minimum 4 characters long !').isLength({ min: 4 }),
  check('jobTitle', 'The "jobTitle" must be maximum 40 characters long !').isLength({ max: 40 }),

  check('course', 'The "course" is required !').not().isEmpty(),
  check('course', 'The "course" must be minimum 4 characters long !').isLength({ min: 4 }),
  check('course', 'The "course" must be maximum 40 characters long !').isLength({ max: 40 }),

  check('schedule', 'The "schedule" is required !').not().isEmpty(),
  check('schedule', 'The "schedule" must be "morning", "afternoon" or "night" !')
    .isIn(['morning', 'afternoon', 'night']),

  validateFields
];

export default validationFields;
