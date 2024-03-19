import * as Yup from "yup"

export const contactusSchema = Yup.object({
    title: Yup.string().required("Required Banner Title"),
    description: Yup.string().required("Required Description"),
    email_title: Yup.string().required("Required Title"),
    email: Yup.string().required("Required email").email(),
    email_title1: Yup.string().required("Required Title"),
    email1: Yup.string().required("Required email").email(),
    email_title2: Yup.string().required("Required Title"),
    email2: Yup.string().required("Required email").email(),
    email_title3: Yup.string().required("Required Title"),
    email3: Yup.string().required("Required email").email(),
    email_title4: Yup.string().required("Required Title"),
    email4: Yup.string().required("Required email").email(),
    email_title5: Yup.string().required("Required Title"),
    email5: Yup.string().required("Required email").email(),
    location1: Yup.string().required("Required Location"),
    location2: Yup.string().required("Required Location"),
    location3: Yup.string().required("Required Location"),
    image: Yup.string().required("Required Image"),


})