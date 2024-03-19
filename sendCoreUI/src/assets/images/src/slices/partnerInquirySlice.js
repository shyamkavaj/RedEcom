import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PartnerInquiryService from "src/services/PartnerInquiryService";

export const fetchPartnerInquiry = createAsyncThunk("partnerInquiry/fetchPartnerInquiry", async () => {
    try {
        const res = await PartnerInquiryService.fetchPartnerInquiry()
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    loading: false,
    error: '',
    partnerInquirys: [],
    partnerInquiry: {}

}

const partnerInquirySlice = createSlice({
    name: "partnerInquiry",
    initialState,
    extraReducers(builder) {

        //FETCH ALL PARTNER INQUIRY

        builder.addCase(fetchPartnerInquiry.pending, (state) => {
            state.loading = true
        }).addCase(fetchPartnerInquiry.fulfilled, (state, { payload }) => {
            state.loading = false
            state.partnerInquirys = payload
        }).addCase(fetchPartnerInquiry.rejected, (state) => {
            state.loading = false
        })
    }
})
export default partnerInquirySlice.reducer