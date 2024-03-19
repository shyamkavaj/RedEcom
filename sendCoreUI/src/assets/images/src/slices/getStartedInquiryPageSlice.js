import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GetStartedInquiryService from "src/services/GetStartedInquiryService";

export const fetchAll = createAsyncThunk("getStarted/fetchAll", async () => {
    try {
        const res = await GetStartedInquiryService.fetchAll()
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    loading: false,
    error: '',
    starts: [],
    start: {} || null
}

const getStartedInquiryPageSlice = createSlice({
    name: "getStarted",
    initialState,
    extraReducers(builder) {

        //FETCH ALL GET STARTED INQUIRY

        builder.addCase(fetchAll.pending, (state) => {
            state.loading = true
        }).addCase(fetchAll.fulfilled, (state, { payload }) => {
            state.loading = false
            state.starts = payload
        }).addCase(fetchAll.rejected, (state) => {
            state.loading = false
        })

    }
})
export default getStartedInquiryPageSlice.reducer