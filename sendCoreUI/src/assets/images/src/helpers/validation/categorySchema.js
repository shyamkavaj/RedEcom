import * as Yup from "yup"

export const categoryValidationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
})