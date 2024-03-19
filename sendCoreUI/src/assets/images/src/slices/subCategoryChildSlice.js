import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SubCategoryChildService from 'src/services/SubCategoryChildService.js'
import Swal from 'sweetalert2'

export const addSubCategoryChild = createAsyncThunk(
  'subCategoryChild/addSubCategoryChild',
  async (data) => {
    try {
      const res = await SubCategoryChildService.createSubCategoryChild(data)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const getAllSubCategoryChild = createAsyncThunk(
  'subCategoryChild/getAllSubCategoryChild',
  async () => {
    try {
      const res = await SubCategoryChildService.getAllSubCategoryChild()
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const getSubCategoryChildById = createAsyncThunk(
  'subCategoryChild/getSubCategoryChildById',
  async (id) => {
    try {
      const res = await SubCategoryChildService.getSubCategoryChildById(id)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const updateSubCategoryChild = createAsyncThunk(
  'subCategoryChild/updateSubCategoryChild',
  async (data) => {
    try {
      const res = await SubCategoryChildService.updateSubCategoryChild(data)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const deleteSubCategoryChild = createAsyncThunk(
  'subCategoryChild/deleteSubCategoryChild',
  async (id) => {
    try {
      const res = await SubCategoryChildService.deleteSubCategoryChild(id)
      if (res.data.code === 200) {
        return id
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Opps !! Cannot Delete Category',
        showConfirmButton: false,
        timer: 2000,
      })
    }
  },
)
const initialState = {
  subCategorysChild: [],
  loading: false,
  error: '',
  subCategoryChild: {
    id: undefined,
    title: '',
    description: '',
    sub_category_id: undefined,
    status: false,
  },
}
const subCategoryChildSlice = createSlice({
  name: 'subCategoryChild',
  initialState,
  extraReducers(builder) {
    // GET ALL SUB-SUB-CATEGORY
    builder
      .addCase(getAllSubCategoryChild.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllSubCategoryChild.fulfilled, (state, { payload }) => {
        state.loading = false
        state.subCategorysChild = payload
      })
      .addCase(getAllSubCategoryChild.rejected, (state) => {
        state.loading = false
        state.subCategorysChild = []
      })

    // Add SUB-SUB-CATEGORY
    builder
      .addCase(addSubCategoryChild.pending, (state) => {
        state.loading = true
      })
      .addCase(addSubCategoryChild.fulfilled, (state, { payload }) => {
        state.loading = false
        state.subCategorysChild = [...state.subCategorysChild, payload]
      })
      .addCase(addSubCategoryChild.rejected, (state, action) => {
        state.loading = false
        state.subCategoryChild = {
          id: undefined,
          title: '',
          description: '',
          sub_category_id: undefined,
          status: false,
        }
        state.error = action.payload
      })

    //GET BY ID SUB-SUB-CATEGORY

    //
    builder
      .addCase(getSubCategoryChildById.pending, (state) => {
        state.loading = true
      })
      .addCase(getSubCategoryChildById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.subCategoryChild = payload
      })
      .addCase(getSubCategoryChildById.rejected, (state, { payload }) => {
        state.loading = false
        state.subCategoryChild = {
          cat_id: undefined,
          title: '',
          description: '',
          sub_category_id: undefined,
          status: false,
        }
        state.error = payload
      })
    //  UPDATE SUB-SUB-CATEGORY
    builder
      .addCase(updateSubCategoryChild.pending, (state) => {
        state.loading = true
      })
      .addCase(updateSubCategoryChild.fulfilled, (state, payload) => {
        state.loading = false
        const index = state.subCategorysChild.findIndex(
          (subCategoryChild) => subCategoryChild.cat_id === payload.id,
        )
        if (index) {
          state.subCategoryChild.cat_id = payload.id
          state.subCategoryChild.title = payload.title
          state.subCategoryChild.description = payload.description
          state.subCategoryChild.status = payload.status
        }
        state.subCategoryChild = {
          cat_id: undefined,
          title: '',
          description: '',
          sub_category_id: undefined,
          status: false,
        }
      })
      .addCase(updateSubCategoryChild.rejected, (state, payload) => {
        state.loading = false
        state.subCategoryChild = {
          id: undefined,
          title: '',
          description: '',
          sub_category_id: undefined,
          status: false,
        }
        state.error = payload
      })

    // DELETE SUB-SUB-CATEGORY
    builder
      .addCase(deleteSubCategoryChild.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteSubCategoryChild.fulfilled, (state, action) => {
        const deleteSubCategoryChild = [...state.subCategorysChild].filter(
          (subCategoryChild) => subCategoryChild.id !== action.payload,
        )
        return {
          ...state,
          loading: false,
          subCategorysChild: deleteSubCategoryChild,
        }
      })
      .addCase(deleteSubCategoryChild.rejected, (state, payload) => {
        state.loading = false
        state.error = payload
      })
  },
})

export default subCategoryChildSlice.reducer
