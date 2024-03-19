import * as Yup from "yup"

export const aboutusSchema = Yup.object({
    title: Yup.string().required("Required Title"),
    description: Yup.string().required("Required description"),
    short_description: Yup.string().required("Required Title"),
    image1: Yup.string().required("Required Image"),
    image2: Yup.string().required("Required Image"),
    image3: Yup.string().required("Required Image"),
})