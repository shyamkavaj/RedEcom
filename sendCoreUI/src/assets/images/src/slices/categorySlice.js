import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CategoryService from 'src/services/CategoryService'
import Swal from 'sweetalert2'

export const addCategory = createAsyncThunk('category/addCategory', async (data) => {
  try {
    const res = await CategoryService.createCategory(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const getAllCategory = createAsyncThunk('category/getAllCategory', async () => {
  try {
    const res = await CategoryService.getAllCategory()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const updateCategory = createAsyncThunk('category/updateCategory', async (data) => {
  try {
    const res = await CategoryService.updateCategory(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id) => {
  try {
    const res = await CategoryService.deleteCategory(id)

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
})
export const getCategoryById = createAsyncThunk('category/getCategoryById', async (id) => {
  try {
    const res = await CategoryService.getCategoryById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const updateCategoryStatus = createAsyncThunk(
  'category/updateCategoryStatus',
  async (data) => {
    try {
      const res = await CategoryService.updateCategoryStatus(data)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)

const initialState = {
  categorys: [],
  loading: false,
  error: '',
  category: {
    id: undefined,
    title: '',
    description: '',
    status: false,
  },
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers(builder) {
    // GET ALL CATEGORY

    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllCategory.fulfilled, (state, { payload }) => {
        state.loading = false
        state.categorys = payload
      })
      .addCase(getAllCategory.rejected, (state) => {
        state.loading = false
        state.categorys = []
      })

    // Add CATEGORY
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.loading = false
        state.categorys = [...state.categorys, payload]
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false
        state.category = {
          id: undefined,
          title: '',
          description: '',
          status: false,
        }
        state.error = action.payload
      })

    //GET BY ID CATEGORY

    //
    builder
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true
      })
      .addCase(getCategoryById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.category = payload
      })
      .addCase(getCategoryById.rejected, (state, { payload }) => {
        state.loading = false
        state.category = {
          id: undefined,
          title: '',
          description: '',
          status: false,
        }
        state.error = payload
      })

    //  UPDATE CATEGORY
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCategory.fulfilled, (state, payload) => {
        state.loading = false
        const index = state.categorys.findIndex((category) => category.id === payload.id)
        if (index) {
          state.category.title = payload.title
          state.category.description = payload.description
          state.category.status = payload.status
        }
        state.category = {
          id: undefined,
          title: '',
          description: '',
          status: false,
        }
      })
      .addCase(updateCategory.rejected, (state, payload) => {
        state.loading = false
        state.category = {
          id: undefined,
          title: '',
          description: '',
          status: false,
        }
        state.error = payload
      })

    // DELETE CATEGORY
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        const deleteCategory = [...state.categorys].filter((category) => category.id !== payload)
        return {
          ...state,
          loading: false,
          categorys: deleteCategory,
        }
      })
      .addCase(deleteCategory.rejected, (state, payload) => {
        state.loading = false
        state.error = payload
      })
    //UPDATE CATEGORY STATUS

    builder
      .addCase(updateCategoryStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCategoryStatus.fulfilled, (state, { payload }) => {
        state.loading = false
        state.category = { ...state.category, ...payload }
      })
      .addCase(updateCategoryStatus.rejected, (state) => {
        state.loading = false
      })
  },
})
export default categorySlice.reducer
