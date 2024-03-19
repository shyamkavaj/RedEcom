import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SubCategoryService from 'src/services/SubCategoryService'
import Swal from 'sweetalert2'

export const addSubCategory = createAsyncThunk('subCategory/addSubCategory', async (data) => {
  try {
    const res = await SubCategoryService.createSubCategory(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const getAllSubCategory = createAsyncThunk('subCategory/getAllSubCategory', async () => {
  try {
    const res = await SubCategoryService.getAllSubCategory()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const getSubCategoryById = createAsyncThunk('subCategory/getSubCategoryById', async (id) => {
  try {
    const res = await SubCategoryService.getSubCategoryById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const updateSubCategory = createAsyncThunk('subCategory/updateSubCategory', async (data) => {
  try {
    const res = await SubCategoryService.updateSubCategory(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const deleteSubCategory = createAsyncThunk('subCategory/deleteSubCategory', async (id) => {
  try {
    const res = await SubCategoryService.deleteSubCategory(id)
    if (res.data.code === 200) {
      return id
    }
  } catch (error) {
    console.log(error)
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Opps !! Cannot Delete Sub Category',
      showConfirmButton: false,
      timer: 2000,
    })
  }
})
export const updateSubCategoryStatus = createAsyncThunk(
  'subCategory/updateSubCategoryStatus',
  async (data) => {
    try {
      const res = await SubCategoryService.updateSubCategoryStatus(data)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)
const initialState = {
  subCategorys: [],
  loading: false,
  error: '',
  subCategory: {} || null,
}

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  extraReducers(builder) {
    // GET ALL SUB-CATEGORY
    builder
      .addCase(getAllSubCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllSubCategory.fulfilled, (state, { payload }) => {
        state.loading = false
        state.subCategorys = payload
      })
      .addCase(getAllSubCategory.rejected, (state) => {
        state.loading = false
        state.subCategorys = []
      })

    // Add SUB-CATEGORY
    builder
      .addCase(addSubCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(addSubCategory.fulfilled, (state, { payload }) => {
        state.loading = false
        state.subCategorys = [...state.subCategorys, payload]
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.loading = false
        state.subCategory = {
          id: undefined,
          title: '',
          description: '',
          category_id: undefined,
          status: false,
        }
        state.error = action.payload
      })

    //GET BY ID SUB-CATEGORY
    builder
      .addCase(getSubCategoryById.pending, (state) => {
        state.loading = true
      })
      .addCase(getSubCategoryById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.subCategory = payload
      })
      .addCase(getSubCategoryById.rejected, (state, { payload }) => {
        state.loading = false
        state.subCategory = {
          cat_id: undefined,
          title: '',
          description: '',
          category_id: undefined,
          status: false,
        }
        state.error = payload
      })

    //  UPDATE SUB-CATEGORY
    builder
      .addCase(updateSubCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(updateSubCategory.fulfilled, (state, payload) => {
        state.loading = false
        const index = state.subCategorys.findIndex(
          (subCategory) => subCategory.cat_id === payload.id,
        )

        state.subCategory = { ...state.subCategorys[index], ...payload }
      })
      .addCase(updateSubCategory.rejected, (state, payload) => {
        state.loading = false
        state.subCategory = null
        state.error = payload
      })

    // DELETE SUB-CATEGORY
    builder
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        const deleteSubCategory = [...state.subCategorys].filter(
          (subCategory) => subCategory.id !== action.payload,
        )
        return {
          ...state,
          loading: false,
          subCategorys: deleteSubCategory,
        }
      })
      .addCase(deleteSubCategory.rejected, (state, payload) => {
        state.loading = false
        state.error = payload
      })

    //UPDATE SUBCATEGORY STATUS
    builder
      .addCase(updateSubCategoryStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(updateSubCategoryStatus.fulfilled, (state, { payload }) => {
        state.loading = false
        state.subCategory = { ...state.subCategory, ...payload }
      })
      .addCase(updateSubCategoryStatus.rejected, (state) => {
        state.loading = false
      })
  },
})
export default subCategorySlice.reducer
