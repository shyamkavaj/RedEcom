import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ManageUsersService from 'src/services/ManageUserService'
import Swal from 'sweetalert2'

export const fetchAllUsers = createAsyncThunk('manageUsers/fetchAllUsers', async () => {
  try {
    const res = await ManageUsersService.fetchAllUsers()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const createUser = createAsyncThunk('manageUsers/createUser', async (data) => {
  try {
    const res = await ManageUsersService.createUser(data)
    if (res.data.code == 404) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Opps !! User Alreay Exists...',
        showConfirmButton: false,
        timer: 5000,
      })
      return res.data
    } else {
      return res.data.data
    }
  } catch (error) {
    console.log(error)
  }
})

export const getUserById = createAsyncThunk('manageUsers/getUserById', async (id) => {
  try {
    const res = await ManageUsersService.getUserById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const getPartnerById = createAsyncThunk('manageUsers/getPartnerById', async (id) => {
  try {
    const res = await ManageUsersService.getPartnerById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const updateUser = createAsyncThunk('manageUsers/updateUser', async (id) => {
  try {
    const res = await ManageUsersService.updateUser(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const updateUserStatus = createAsyncThunk('manageUsers/updateUserStatus', async (data) => {
  try {
    const res = await ManageUsersService.updateUserStatus(data)
    if (res.data.code === 200) {
      return data
    }
  } catch (error) {
    console.log(error)
  }
})

export const deleteUser = createAsyncThunk('manageUsers/deleteUser', async (id) => {
  try {
    const res = await ManageUsersService.deleteUser(id)

    if (res.data.code === 200) {
      return id
    }
  } catch (error) {
    console.log(error)
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Opps !! Cannot Delete User',
      showConfirmButton: false,
      timer: 2000,
    })
  }
})

const initialState = {
  loading: false,
  error: null,
  message: null,
  users: [],
  user: {
    id: undefined,
    status: '',
  },
}

const manageUsersSlice = createSlice({
  name: 'manageUsers',
  initialState,
  reducers: {
    onErrorRemove(state) {
      state.error = null
    },
  },
  extraReducers(builder) {
    //FETCH ALL USERS

    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false
        state.users = payload
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.loading = false
        state.error = 'Cannot Get Users'
      })

    // CREATE USER

    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        if (payload.code !== 404) {
          state.loading = false
          state.users = [payload, ...state.users]
        } else {
          state.loading = false
          state.error = 'User Already Exists'
        }
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false
        state.error = 'Cannot Create User'
      })

    //FETCH USER BY ID

    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
      })
      .addCase(getUserById.rejected, (state) => {
        state.loading = false
        state.error = 'Cannot Get User'
      })
    //FETCH PARTNER BY ID

    builder
      .addCase(getPartnerById.pending, (state) => {
        state.loading = true
      })
      .addCase(getPartnerById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
      })
      .addCase(getPartnerById.rejected, (state) => {
        state.loading = false
        state.message = 'Cannot Get Partner'
        state.error = 'Cannot Get Partner'
      })
    //UPDATE USER

    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false
        state.message = 'Cannot Update User'
        state.error = 'User Not Update'
      })

    //UPDATE USER STATUS

    builder
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUserStatus.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = { ...state.user, ...payload }
      })
      .addCase(updateUserStatus.rejected, (state) => {
        state.loading = false
        state.message = 'Cannot Update Status'
        state.error = 'User Status Not Update'
      })

    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        const deleteUser = [...state.users].filter((user) => user.id !== payload)
        return {
          ...state,
          message: null,
          loading: false,
          users: deleteUser,
        }
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false
        state.message = 'Cannot Delete'
        state.error = 'User Not Deleted'
      })
  },
})

export const { onErrorRemove } = manageUsersSlice.actions

export default manageUsersSlice.reducer
