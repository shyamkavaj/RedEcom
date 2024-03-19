import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SupportersService from 'src/services/SuportersService'

export const getAllSupporters = createAsyncThunk('supporters/getAll', async () => {
  try {
    const res = await SupportersService.getAll()
    return res.data.data.suppoter
  } catch (error) {
    console.log(error)
  }
})

export const getSupporterById = createAsyncThunk('supporters/getAchivementById', async (id) => {
  try {
    const res = await SupportersService.getById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const addSupporter = createAsyncThunk('supporters/addSupporter', async (data) => {
  try {
    const res = await SupportersService.create(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const updateSupporter = createAsyncThunk('supporters/updateSupporter', async (data) => {
  try {
    // const id = data.id
    const res = await SupportersService.update(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const deleteSupporters = createAsyncThunk('supporters/deleteSupporters', async (id) => {
  try {
    const res = await SupportersService.remove(id)
    return id
  } catch (error) {
    console.log(error)
  }
})

const initialState = {
  supporters: [],
  loading: false,
  error: '',
  supporter: null,
}

const supportersSlice = createSlice({
  name: 'supporters',
  initialState,
  reducers: {},
  extraReducers: {

    // GET ALL SUPPOTERS

    [getAllSupporters.pending]: (state) => {
      state.loading = true
    },
    [getAllSupporters.fulfilled]: (state, action) => {
      state.loading = false
      state.supporters = action.payload
    },
    [getAllSupporters.rejected]: (state, action) => {
      state.loading = false
      state.supporters = []
    },

    //GET BY ID SUPPOTER

    [getSupporterById.pending]: (state) => {
      state.loading = true
    },
    [getSupporterById.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.supporter = payload
    },
    [getSupporterById.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    //ADD SUPPOTER

    [addSupporter.pending]: (state) => {
      state.loading = true
    },
    [addSupporter.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.supporters = [...state.supporters, payload]
    },
    [addSupporter.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    // UPDATE SUPPOTER

    [updateSupporter.pending]: (state) => {
      state.loading = true
    },
    [updateSupporter.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.supporter = { ...state.supporter, ...payload }
    },
    [updateSupporter.rejected]: (state) => {
      state.loading = false
    },

    //DELETE SUPPOTER


    [deleteSupporters.pending]: (state) => {
      state.loading = true
    },
    [deleteSupporters.fulfilled]: (state, { payload }) => {
      const deletesupporters = [...state.supporters].filter(
        (suppoter) => suppoter.id !== payload,
      )
      return {
        ...state,
        loading: false,
        supporters: deletesupporters,
      }
    },
    [deleteSupporters.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export default supportersSlice.reducer
