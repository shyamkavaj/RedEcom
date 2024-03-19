import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from 'src/services/AuthService'

export const authRegister = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const response = await AuthService.authRegister(data)
    return response.data.data
  } catch (error) {
    console.log(error)
  }
})

export const authLogin = createAsyncThunk('auth/authLogin', async (data, thunkAPI) => {
  const response = await AuthService.authLogin(data)
  try {
    if (response.data.status === true) {
      localStorage.setItem('token', response.data.data.token.authToken)
      localStorage.setItem('role', response.data.data.token.userToken.role)
      localStorage.setItem('email', response.data.data.token.userToken.email)

      return {
        ...data,
        status: response.data.status,
        token: response.data.data.token.authToken,
        role: response.data.data.token.userToken.role,
      }
    }
    if (response.data.status === false) {
      return response.data
    }
  } catch (err) {
    console.log(err)
  }
})
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile_number: '',
    loading: false,
    error: '',
    role: '',
    token: '',
    errorCode: null,
    status: false,
  },
  reducers: {
    // Reducer comes here
    resetError(state) {
      state.error = null
      state.errorCode = null
    },
  },
  extraReducers(builder) {
    //ADMIN REGISTER

    builder
      .addCase(authRegister.pending, (state) => {
        state.loading = true
      })
      .addCase(authRegister.fulfilled, (state, { payload }) => {
        state.loading = false
        state.first_name = payload.first_name
        state.last_name = payload.last_name
        state.email = payload.email
        state.password = payload.password
      })
      .addCase(authRegister.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })

    //ADMIN LOGIN

    builder
      .addCase(authLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(authLogin.fulfilled, (state, { payload }) => {
        if (payload.status === false) {
          state.loading = false
          state.error = payload.message
          state.errorCode = payload.code
          state.status = payload.status
        } else {
          state.email = payload.email
          state.token = payload.authToken
          state.role = payload.role
          state.status = payload.status
          state.loading = false
          state.error = null
        }
      })
      .addCase(authLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export const { resetError } = authSlice.actions
export default authSlice.reducer
