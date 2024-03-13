import * as yup from 'yup';

export const formUpdateSchema = yup.object().shape({
  name: yup.string()
    .min(4, 'Name must be at least 4 characters')
    .required('Name is required !'),
  jobTitle: yup.string()
    .min(4, 'Job Title must be at least 4 characters')
    .required('Job Title is required !'),
  email: yup.string()
    .email('Invalid email format !')
    .required('Email is required !'),
  course: yup.string()
    .required('Course is required !')
    .min(8, 'Course must be at least 8 characters')
    .max(50, 'Course must be maximum 100 characters'),
  startDate: yup.string().required('Start Date is required !'),
  endDate: yup.string().required('End Date is required !'),
});

export const formPasswordsSchema = yup.object().shape({
  password: yup.string()
    .required('Password is required !')
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be maximum 100 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      'Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.'
    ),
  passwordConfirmation: yup.string()
    .required('Password Confirmation is required !')
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be maximum 100 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      'Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.'
    )
    .oneOf([yup.ref('password'), ''], 'Passwords must match !'),
});
