import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import HomeService from 'src/services/HomeService'

export const getAllHome = createAsyncThunk('home/getAllHome', async () => {
  try {
    const res = await HomeService.getAllHome()
    return res.data.data.setting[0]
  } catch (error) {
    console.log(error)
  }
})
export const updatehome = createAsyncThunk('home/updatehome', async (data) => {
  try {
    const res = await HomeService.updateHome(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
const initialState = {
  settings: [],
  loading: false,
  error: '',
  setting: {
    id: undefined,
    header_logo: '',
    banner_image: '',
    banner_title: '',
    banner_sub_title: '',
    l_title: '',
    l_service_sub_title: '',
    // image: '',
    // image_sub_title: '',
    // image1: '',
    // image_sub_title_1: '',
    // image2: '',
    // image_sub_title_2: '',
    // image3: '',
    // image_sub_title_3: '',
    r_title: '',
    r_sub_title: '',
    achivement_title: '',
    achivement_description: '',
    o_title: '',
    o_sub_title: '',
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    linkedin_url: '',
    helpline_no: '',
    helpline_text: '',
    footer_logo: '',
    page_title: '',
    page_description: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image1_subtitle: '',
    image2_subtitle: '',
    image3_subtitle: '',
    image4_subtitle: '',
    image1_description: '',
    image2_description: '',
    image3_description: '',
    image4_description: '',
  },
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllHome.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllHome.fulfilled, (state, { payload }) => {
        state.loading = false
        state.setting = payload
      })
      .addCase(getAllHome.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(updatehome.pending, (state) => {
        state.loading = true
      })
      .addCase(updatehome.fulfilled, (state, { payload }) => {
        state.loading = false
        state.setting = { ...state.setting, ...payload }
      })
      .addCase(updatehome.rejected, (state) => {
        state.loading = false
      })
  },
})
export default homeSlice.reducer
