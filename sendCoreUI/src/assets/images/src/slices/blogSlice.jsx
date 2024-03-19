import BlogService from 'src/services/BlogService'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getBlogById = createAsyncThunk('blog/getBlogById', async (id) => {
  try {
    const res = await BlogService.getBlogById(id)
    return await res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const getAllBlogs = createAsyncThunk('blog/getAllBlogs', async () => {
  try {
    const res = await BlogService.getAllBlogs()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const addBlog = createAsyncThunk('blog/addBlog', async (data) => {
  try {
    const res = await BlogService.createBlog(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const updateBlog = createAsyncThunk('blog/updateBlog', async (data) => {
  try {
    // const id = data.id
    const res = await BlogService.updateBlog(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id) => {
  try {
    const res = await BlogService.deleteBlog(id)
    return id
  } catch (error) {
    console.log(error)
  }
})

const initialState = {
  blogs: [],
  loading: false,
  error: '',
  blog: {},
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  extraReducers(builder) {
    // GET ALL BLOGS
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false
        state.blogs = action.payload
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false
        state.blogs = []
      })

    // Add BLOG
    builder
      .addCase(addBlog.pending, (state) => {
        state.loading = true
      })
      .addCase(addBlog.fulfilled, (state, { payload }) => {
        state.loading = false
        state.blogs = [...state.blogs, payload]
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false
        state.blog = {}
        state.error = action.payload
      })

    //GET BY ID BLOG
    //
    builder
      .addCase(getBlogById.pending, (state) => {
        state.loading = true
      })
      .addCase(getBlogById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.blog = payload
      })
      .addCase(getBlogById.rejected, (state, { payload }) => {
        state.loading = false
        state.blog = {}
        state.error = payload
      })

    //  UPDATE BLOG
    builder
      .addCase(updateBlog.pending, (state) => {
        state.loading = true
      })
      .addCase(updateBlog.fulfilled, (state, payload) => {
        state.loading = false
        const index = state.blogs.findIndex((blog) => blog.id === payload.id)
        if (index) {
          // state.blog.question = payload.question
          // state.blog.answer = payload.answer
          state.blog = payload
        }
        state.blog = {}
      })
      .addCase(updateBlog.rejected, (state, payload) => {
        state.loading = false
        state.blog = {}
        state.error = payload
      })

    // DELETE BLOG
    builder
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteBlog.fulfilled, (state, { payload }) => {
        const removeBlog = [...state.blogs].filter((blog) => blog.id !== payload)
        return {
          ...state,
          loading: false,
          blogs: removeBlog,
        }
      })
      .addCase(deleteBlog.rejected, (state, payload) => {
        state.loading = false
        state.error = payload
      })
  },
})

export default blogSlice.reducer
