import * as Yup from "yup"

export const homeValidationSchema = Yup.object({
    header_logo: Yup.string().required("Required Header Logo"),
    banner_image: Yup.string().required("Required Banner Image"),
    banner_title: Yup.string().required("Required Banner Title"),
    banner_sub_title: Yup.string().required("Required Banner Sub Title"),
    l_title: Yup.string().required("Required Legal Service Title"),
    l_service_sub_title: Yup.string().required("Required Legale Service Sub Title"),
    image: Yup.string().required("Required Image"),
    image_sub_title: Yup.string().required("Required Image Sub Title"),
    image1: Yup.string().required("Required Image"),
    image_sub_title_1: Yup.string().required("Required Image Sub Title"),
    image2: Yup.string().required("Required Image"),
    image_sub_title_2: Yup.string().required("Required Image Sub Title"),
    image3: Yup.string().required("Required Image Sub Title"),
    image_sub_title_3: Yup.string().required("Required Image Sub Title"),
    r_title: Yup.string().required("Required Title"),
    r_sub_title: Yup.string().required("Required Sub Title"),
    footer_logo: Yup.string().required("Required Footer Logo")
})