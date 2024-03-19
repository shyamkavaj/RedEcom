import * as Yup from "yup"

export const subCategoryChildValidationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
})