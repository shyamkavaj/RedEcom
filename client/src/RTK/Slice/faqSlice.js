import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import faqServices from "../Services/faqServices";

export const getAllFaq = createAsyncThunk(
    "faq/getallfaq",
    async () => {
        try{
            // console.log("faq")
            const res = await faqServices.getAllFaq();
            return res;
        } catch (error) {
            console.log("error get all faq ",error)
            throw error
        }
    }
)

const faqSlice = createSlice({
    name: "faq",
    initialState: {
        faqs:[],
        loading: ""
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getAllFaq.pending ,(state) => {
                state.loading = true
            })
            .addCase(getAllFaq.fulfilled ,(state,action) => {
                state.loading = false
                // console.log("all faq action ",action.payload);
                state.faqs = action.payload
            })
            .addCase(getAllFaq.rejected, (state) => {
                state.loading = false
            })
    }
})

export default faqSlice.reducer