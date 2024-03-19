import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import IntrestedList from "src/services/IntrestedService"

export const getAllIntrestedList = createAsyncThunk('intrested/getAllIntrestedList', async () => {
    try {
        const res = await IntrestedList.getAllintrestEvent()
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    loading: false,
    error: "",
    intrested: [],
    intrest: {} || null
}

const intrestedListSlice = createSlice({
    name: 'intrested',
    initialState,
    extraReducers(builder) {
        builder.addCase(getAllIntrestedList.pending, (state) => {
            state.loading = true
        }).addCase(getAllIntrestedList.fulfilled, (state, { payload }) => {
            state.loading = false
            state.intrested = payload
        }).addCase(getAllIntrestedList.rejected, (state) => {
            state.loading = false
        })
    }
})
export default intrestedListSlice.reducer