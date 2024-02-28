import { check } from "express-validator";
import { validateFields } from "../../middlewares";

const validationFields = [
  check('email', 'The "email" is required !').not().isEmpty(),
  check('email', 'The "email" must be a valid format !').isEmail(),
  check('password', 'The "password" is required !').not().isEmpty(),
  check('password', 'The "password" must be minimum 6 characters long !').isLength({ min: 6 }),
  validateFields
];

export default validationFields;
