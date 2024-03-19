import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ProviderService from 'src/services/ProviderServices'
import Swal from 'sweetalert2'

export const getProviderServiceById = createAsyncThunk(
  'providerService/getProviderServiceById',
  async (id) => {
    try {
      const res = await ProviderService.getProviderServiceById(id)
      return await res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const fetchProviderService = createAsyncThunk(
  'providerService/fetchProviderService',
  async () => {
    try {
      const res = await ProviderService.fetchProviderService()
      return res.data.data.service_data
    } catch (error) {
      console.log(error)
    }
  },
)
export const createProviderService = createAsyncThunk(
  'providerService/createProviderService',
  async (data) => {
    try {
      const res = await ProviderService.createProviderService(data)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const updateProviderService = createAsyncThunk(
  'providerService/updateProviderService',
  async (data) => {
    try {
      // const id = data.id
      const res = await ProviderService.updateProviderService(data)
      if (res.data.code === 200) {
        return data
      }
    } catch (error) {
      console.log(error)
    }
  },
)
export const deleteProviderService = createAsyncThunk(
  'providerService/deleteProviderService',
  async (id) => {
    try {
      const res = await ProviderService.deleteProviderService(id)
      if (res.data.code === 200) {
        return id
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Opps !! Cannot Delete Service',
        showConfirmButton: false,
        timer: 2000,
      })
    }
  },
)

const initialState = {
  providerServices: [],
  loading: false,
  error: '',
  providerService: {
    id: undefined,
    category_id: '',
    sub_category_id: '',
    sub_sub_category_id: '',
    title: '',
    description: '',
    duration: '',
    penalty: '',
    benefits: '',
    documents: '',
    deliverables: '',
    price: '',
    status: false,
    top_service: false,
  },
}

const providerServiceSlice = createSlice({
  name: 'providerService',
  initialState,
  extraReducers(builder) {
    // GET ALL PROVIDER SERVICES
    builder
      .addCase(fetchProviderService.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProviderService.fulfilled, (state, action) => {
        state.loading = false
        state.providerServices = action.payload
      })
      .addCase(fetchProviderService.rejected, (state, action) => {
        state.loading = false
        state.providerServices = []
      })

    // Add PROVIDER SERVICES
    builder
      .addCase(createProviderService.pending, (state) => {
        state.loading = true
      })
      .addCase(createProviderService.fulfilled, (state, { payload }) => {
        state.loading = false
        state.providerServices = [...state.providerServices, payload]
      })
      .addCase(createProviderService.rejected, (state, action) => {
        state.loading = false
        state.providerService = {
          id: undefined,
          category_id: '',
          sub_category_id: '',
          sub_sub_category_id: '',
          title: '',
          description: '',
          duration: '',
          penalty: '',
          benefits: '',
          documents: '',
          deliverables: '',
          price: '',
          status: false,
          top_service: false,
        }
        state.error = action.payload
      })

    //GET BY ID PROVIDER SERVICES

    //
    builder
      .addCase(getProviderServiceById.pending, (state) => {
        state.loading = true
      })
      .addCase(getProviderServiceById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.providerService = payload
      })
      .addCase(getProviderServiceById.rejected, (state, { payload }) => {
        state.loading = false
        state.providerService = {
          id: undefined,
          category_id: '',
          sub_category_id: '',
          sub_sub_category_id: '',
          title: '',
          description: '',
          duration: '',
          penalty: '',
          benefits: '',
          documents: '',
          deliverables: '',
          price: '',
          status: false,
          top_service: false,
        }
        state.error = payload
      })

    //  UPDATE PROVIDER SERVICES
    builder
      .addCase(updateProviderService.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProviderService.fulfilled, (state, payload) => {
        state.loading = false
        state.providerService = { ...state.providerService, ...payload }
      })
      .addCase(updateProviderService.rejected, (state) => {
        state.loading = false
      })

    // DELETE PROVIDER SERVICES
    builder
      .addCase(deleteProviderService.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteProviderService.fulfilled, (state, { payload }) => {
        const deleteProviderService = [...state.providerServices].filter(
          (providerService) => providerService.id !== payload,
        )
        return {
          ...state,
          loading: false,
          providerServices: deleteProviderService,
        }
      })
      .addCase(deleteProviderService.rejected, (state, payload) => {
        state.loading = false
        state.error = payload
      })
  },
})

export default providerServiceSlice.reducer
