import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import PartnerService from 'src/services/PartnerService'

export const fetchPartners = createAsyncThunk('partners/fetchPartners', async () => {
  try {
    const res = await PartnerService.fetchPartners()
    return res.data.data.User
  } catch (error) {
    console.log(error)
  }
})
export const createPartner = createAsyncThunk('partners/createPartner', async (data) => {
  try {
    const res = await PartnerService.createPartner(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
//FetCh Users By Partner

export const fetchUsersByPartner = createAsyncThunk('partners/fetchUsersByPartner', async () => {
  try {
    const res = await PartnerService.fetchUsersByPartner()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
//FetCh Partner Service

export const fetchPartnerService = createAsyncThunk('partners/fetchPartnerService', async () => {
  try {
    const res = await PartnerService.fetchPartnerService()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

const initialState = {
  loading: false,
  error: '',
  partners: [],
  partner: {},
  partnerUsers: [],
  partnerServices: [],
}

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPartners.fulfilled, (state, { payload }) => {
        state.loading = false
        state.partners = payload
      })
      .addCase(fetchPartners.rejected, (state) => {
        state.loading = false
      })

    builder
      .addCase(createPartner.pending, (state) => {
        state.loading = true
      })
      .addCase(createPartner.fulfilled, (state, { payload }) => {
        state.loading = false
        state.partners = [payload, ...state.partners]
      })
      .addCase(createPartner.rejected, (state) => {
        state.loading = false
      })

    //FetCh Users By Partner
    builder
      .addCase(fetchUsersByPartner.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsersByPartner.fulfilled, (state, { payload }) => {
        state.loading = false
        state.partnerUsers = payload
      })
      .addCase(fetchUsersByPartner.rejected, (state) => {
        state.loading = false
      })
    //FetCh Partner Service
    builder
      .addCase(fetchPartnerService.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPartnerService.fulfilled, (state, { payload }) => {
        state.loading = false
        state.partnerServices = payload
      })
      .addCase(fetchPartnerService.rejected, (state) => {
        state.loading = false
      })
  },
})
export default partnersSlice.reducer
