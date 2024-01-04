import * as yup from 'yup';

export const MainSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required'),
})