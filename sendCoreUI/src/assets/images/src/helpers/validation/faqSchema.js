import * as Yup from "yup"

export const faqValidationSchema = Yup.object({
    question: Yup.string().required('Required'),
    answer: Yup.string().required('Required'),
})