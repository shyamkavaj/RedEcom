import * as Yup from "yup"

export const testimonialValidationSchema = Yup.object({
    title: Yup.string().required('Required'),
    designation: Yup.string().required('Required'),
    image: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
})