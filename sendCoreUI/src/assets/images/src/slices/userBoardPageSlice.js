import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import UserBoardPageService from 'src/services/UserBoardPageService'

export const getUserBoardPage = createAsyncThunk('userBoardPage/getUserBoardPage', async (id) => {
  try {
    const res = await UserBoardPageService.getUserBoardPage(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const updateUserBoardPage = createAsyncThunk(
  'userBoardPage/updateUserBoardPage',
  async (data) => {
    try {
      const res = await UserBoardPageService.updateUserBoardPage(data)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)

const initialState = {
  userBoards: [],
  loading: false,
  error: '',
  userBoard: {
    id: undefined,
  },
}

const userBoardpageSlice = createSlice({
  name: 'becomePartner',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getUserBoardPage.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserBoardPage.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userBoard = payload
      })
      .addCase(getUserBoardPage.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(updateUserBoardPage.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUserBoardPage.fulfilled, (state, { payload }) => {
        console.log('UPADATE', payload)
        state.loading = false
        state.userBoard = { ...state.userBoard, ...payload }
      })
      .addCase(updateUserBoardPage.rejected, (state) => {
        state.loading = false
      })
  },
})

export default userBoardpageSlice.reducer
