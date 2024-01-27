import * as Yup from "yup";

export const NewOrderSchema = Yup.object().shape({
    type: Yup.string().required("Type is required!"),
    size: Yup.string().required("Size is required!"),
    base: Yup.string().required("Base is required!"),
})