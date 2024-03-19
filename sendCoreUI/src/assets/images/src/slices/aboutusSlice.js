import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AboutUsService from 'src/services/AboutUsService'

export const getAboutusById = createAsyncThunk('about/getAboutusById', async (id) => {
  try {
    const res = await AboutUsService.getAboutusById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const updateAboutUs = createAsyncThunk('about/updateAboutUs', async (data) => {
  try {
    const res = await AboutUsService.updateAboutUs(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
const initialState = {
  abouts: [],
  loading: false,
  error: '',
  about: {
    id: undefined,
    title: '',
    shot_description: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
    page_title: '',
    page_description: '',
  },
}
const aboutusSlice = createSlice({
  name: 'about',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAboutusById.pending, (state) => {
        state.loading = true
      })
      .addCase(getAboutusById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.about = payload
      })
      .addCase(getAboutusById.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(updateAboutUs.pending, (state) => {
        state.loading = true
      })
      .addCase(updateAboutUs.fulfilled, (state, { payload }) => {
        state.loading = false
        state.about = { ...state.about, ...payload }
        //payload
      })
      .addCase(updateAboutUs.rejected, (state) => {
        state.loading = false
      })
  },
})
export default aboutusSlice.reducer
