import * as yup from 'yup';

export const AuthSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .email('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
  username: yup
    .string()
    .required('Username is required'),
});