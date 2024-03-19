import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ContactUsService from 'src/services/ContactUsService'

export const getContactById = createAsyncThunk('contact/getContactById', async (id) => {
  try {
    const res = await ContactUsService.getContactById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const updateContactUs = createAsyncThunk('contact/updateContactUs', async (data) => {
  try {
    const res = await ContactUsService.updateContactUs(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

const initialState = {
  contacts: [],
  loading: false,
  error: '',
  contact: {
    id: undefined,
    title: '',
    description: '',
    email_title: '',
    email: '',
    email_title1: '',
    email1: '',
    email_title2: '',
    email2: '',
    email_title3: '',
    email3: '',
    email_title4: '',
    email4: '',
    email_title5: '',
    email5: '',
    location1: '',
    location2: '',
    location3: '',
    image: '',
    page_title: '',
    page_description: '',
  },
}

const contactusSlice = createSlice({
  name: 'contact',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getContactById.pending, (state) => {
        state.loading = true
      })
      .addCase(getContactById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.contact = payload
      })
      .addCase(getContactById.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(updateContactUs.pending, (state) => {
        state.loading = true
      })
      .addCase(updateContactUs.fulfilled, (state, { payload }) => {
        state.loading = false
        state.contacts = { ...state.contacts, ...payload }
      })
      .addCase(updateContactUs.rejected, (state) => {
        state.loading = false
      })
  },
})

export default contactusSlice.reducer
