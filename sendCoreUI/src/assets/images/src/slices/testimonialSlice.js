import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TestimonialService from "src/services/TestimonialService";

export const fetchTestimonial = createAsyncThunk('testimonial/fetchTestimonial', async () => {
    try {
        const res = await TestimonialService.fetchTestimonial()
        return res.data.data
    } catch (error) {
        console.log(error);
    }
})

export const getTestimonialById = createAsyncThunk('testimonial/getTestimonialById', async (id) => {
    try {
        const res = await TestimonialService.getTestimonialById(id)
        return await res.data.data
    } catch (error) {
        console.log(error)

    }
}
)

export const createTestimonial = createAsyncThunk("testimonial/createTestimonial", async (data) => {
    try {
        const res = await TestimonialService.createTestimonial(data)
        return res.data.data
    } catch (error) {
        console.log(error);
    }
})

export const updateTestimonial = createAsyncThunk("testimonial/updateTestimonial", async (data) => {
    try {
        // const id = data.id
        const res = await TestimonialService.updateTestimonial(data);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }

});

export const deleteTestimonial = createAsyncThunk("testimonial/deleteTestimonial", async (id) => {
    try {
        const res = await TestimonialService.deleteTestimonial(id)
        return id
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    loading: false,
    error: "",
    testimonials: [],
    testimonial: {
        id: undefined,
        name: "",
        description: "",
        image: "",
        designation: ""
    }

}

const testimonialSlice = createSlice({
    name: "testimonial",
    initialState,
    reducers: {},
    extraReducers(builder) {

        // GET ALL Testimonials

        builder
            .addCase(fetchTestimonial.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTestimonial.fulfilled, (state, { payload }) => {
                state.loading = false
                state.testimonials = payload
            })
            .addCase(fetchTestimonial.rejected, (state, { payload }) => {
                state.loading = false
                state.testimonials = []
                state.error = payload
            })

        // Add Testimonials

        builder
            .addCase(createTestimonial.pending, (state) => {
                state.loading = true
            })
            .addCase(createTestimonial.fulfilled, (state, { payload }) => {
                state.loading = false
                state.testimonials = [...state.testimonials, payload]
            })
            .addCase(createTestimonial.rejected, (state, { payload }) => {
                state.loading = false
                state.testimonials = []
                state.error = payload
            })

        //GET BY ID testimonial

        builder
            .addCase(getTestimonialById.pending, (state) => {
                state.loading = true
            })
            .addCase(getTestimonialById.fulfilled, (state, { payload }) => {
                state.loading = false
                state.testimonial = payload
            })
            .addCase(getTestimonialById.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

        //  UPDATE testimonial

        builder
            .addCase(updateTestimonial.pending, (state) => {
                state.loading = true
            })
            .addCase(updateTestimonial.fulfilled, (state, payload) => {
                state.loading = false
                const index = state.testimonials.find((testimonial) => testimonial.id === payload.id)
                if (index) {
                    const { name, description, designation, image } = payload
                    index.name = name
                    index.description = description
                    index.designation = designation
                    index.image = image
                }
            })
            .addCase(updateTestimonial.rejected, (state, payload) => {
                state.loading = false
                state.testimonial = {
                    id: undefined,
                    name: "",
                    description: "",
                    image: "",
                    designation: ""
                }
                state.error = payload
            })

        // DELETE Testimonial

        builder
            .addCase(deleteTestimonial.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteTestimonial.fulfilled, (state, { payload }) => {
                state.loading = true
                state.testimonials = state.testimonials.filter((testimonial) => testimonial.id !== payload)

            })
            .addCase(deleteTestimonial.rejected, (state, payload) => {
                state.loading = false
                state.testimonials = []
                state.error = payload
            })

    }
})
export default testimonialSlice.reducer