import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import DownloadPdfService from 'src/services/DownloadPdfService'

export const getDownloadedPdf = createAsyncThunk('downloadPdf/getDownloadedPdf', async (data) => {
  try {
    const res = await DownloadPdfService.getDownloadedPdf(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

const initialState = {
  loading: false,
  error: '',
  filename: null,
  downloadPdf: {},
}

const downloadPdfSlice = createSlice({
  name: 'downloadPdf',
  initialState,
  extraReducers(builder) {
    // DOWNLOAD PDF
    builder
      .addCase(getDownloadedPdf.pending, (state) => {
        state.loading = true
      })
      .addCase(getDownloadedPdf.fulfilled, (state, action) => {
        state.loading = false
        state.filename = action.payload
      })
      .addCase(getDownloadedPdf.rejected, (state, action) => {
        state.loading = false
        state.filename = null
      })
  },
})

export default downloadPdfSlice.reducer
