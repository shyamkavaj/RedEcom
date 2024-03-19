import * as Yup from 'yup'
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const partnerValidationSchema = Yup.object({
    email: Yup.string().email("Enter Your valid email address").required('Email is required').max(35),
    password: Yup.string().required('Password is required'),
    mobile_number: Yup.string()
        .required('Mobile number is Required')
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'Add 10 digit mobile number')
        .max(10, 'Add 10 digit mobile number'),

})