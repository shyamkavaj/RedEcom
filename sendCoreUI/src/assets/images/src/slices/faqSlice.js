import FaqService from "src/services/FaqService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFaqById = createAsyncThunk('faq/getFaqById', async (id) => {
    try {
        const res = await FaqService.getFaqById(id)
        return await res.data.data
    } catch (error) {
        console.log(error)

    }
}
)
export const getAllFaq = createAsyncThunk('faq/getAllFaq', async () => {
    try {
        const res = await FaqService.getAllFaq()
        return res.data.data
    } catch (error) {
        console.log(error);
    }
})
export const addFaq = createAsyncThunk("faq/addFaq", async (data) => {
    try {
        const res = await FaqService.createFaq(data);
        return res.data.data;
    } catch (error) {
        console.log(error)
    }

});
export const updateFaq = createAsyncThunk("faq/updateFaq", async (data) => {
    try {
        // const id = data.id
        const res = await FaqService.updateFaq(data);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }

});
export const deleteFaq = createAsyncThunk("faq/deleteFaq", async (id) => {
    try {
        const res = await FaqService.deleteFaq(id)
        return id
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    faqs: [],
    loading: false,
    error: "",
    faq: {
        id: undefined,
        question: "",
        answer: "",
        sub_category_id: undefined
    }
}


const faqSlice = createSlice({
    name: "faq",
    initialState,
    extraReducers(builder) {

        // GET ALL FAQS
        builder
            .addCase(getAllFaq.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllFaq.fulfilled, (state, action) => {
                state.loading = false
                state.faqs = action.payload
            })
            .addCase(getAllFaq.rejected, (state, action) => {
                state.loading = false
                state.faqs = []
            })

        // Add FAQS
        builder
            .addCase(addFaq.pending, (state) => {
                state.loading = true
            })
            .addCase(addFaq.fulfilled, (state, { payload }) => {
                state.loading = false
                state.faqs = [...state.faqs, payload]
            })
            .addCase(addFaq.rejected, (state, action) => {
                state.loading = false
                state.faq = {
                    id: undefined,
                    question: '',
                    answer: '',
                }
                state.error = action.payload
            })

        //GET BY ID FAQS

        //
        builder
            .addCase(getFaqById.pending, (state) => {
                state.loading = true
            })
            .addCase(getFaqById.fulfilled, (state, { payload }) => {
                state.loading = false
                state.faq = payload
            })
            .addCase(getFaqById.rejected, (state, { payload }) => {
                state.loading = false
                state.faq = {
                    id: undefined,
                    question: '',
                    answer: '',

                }
                state.error = payload
            })


        //  UPDATE FAQ
        builder
            .addCase(updateFaq.pending, (state) => {
                state.loading = true
            })
            .addCase(updateFaq.fulfilled, (state, payload) => {
                state.loading = false
                const index = state.faqs.findIndex((faq) => faq.id === payload.id)
                if (index) {
                    state.faq.question = payload.question
                    state.faq.answer = payload.answer
                    state.faq.sub_category_id = payload.sub_category_id

                }
                state.faq = {
                    id: undefined,
                    question: '',
                    answer: '',
                    sub_category_id: undefined

                }
            })
            .addCase(updateFaq.rejected, (state, payload) => {
                state.loading = false
                state.faq = {
                    id: undefined,
                    question: '',
                    answer: '',
                }
                state.error = payload
            })

        // DELETE FAQ
        builder
            .addCase(deleteFaq.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteFaq.fulfilled, (state, { payload }) => {
                const deleteFaq = [...state.faqs].filter((faq) => faq.id !== payload)
                return {
                    ...state,
                    loading: false,
                    faqs: deleteFaq,
                }

            })
            .addCase(deleteFaq.rejected, (state, payload) => {
                state.loading = false
                state.error = payload
            })

    }
})

export default faqSlice.reducer