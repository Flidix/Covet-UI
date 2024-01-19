import * as yup from 'yup';

export const UpdateMessageSchema = yup.object().shape({
  text: yup
    .string()
    .required()
});