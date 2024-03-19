import * as Yup from 'yup'

export const loginValidationSchema = Yup.object({
    email: Yup.string().required('Email is required').email(),
    password: Yup.string().required('Password is required'),
})