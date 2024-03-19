import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AdminService from "src/services/AdminService"

export const getById = createAsyncThunk("admin/getById", async () => {
    try {
        const res = await AdminService.getById()
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})
export const fetchAllAdmin = createAsyncThunk("admin/fetchAllAdmin", async () => {
    try {
        const res = await AdminService.fetchAllAdmin()
        return res.data.data.User
    } catch (error) {
        console.log(error)
    }
})
export const createAdmin = createAsyncThunk("admin/createAdmin", async (data) => {
    try {
        const res = await AdminService.createAdmin(data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})
export const updateAdmin = createAsyncThunk("admin/updateAdmin", async (data) => {
    try {
        const res = await AdminService.updateAdmin(data)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    loading: false,
    error: "",
    admins: [],
    admin: {}
}
const adminSlice = createSlice({
    name: "admin",
    initialState,
    extraReducers(builder) {

        // GET bY ID ADMIN

        builder.addCase(getById.pending, (state) => {
            state.loading = true
        }).addCase(getById.fulfilled, (state, { payload }) => {
            state.loading = false
            state.admin = { ...state.admin, ...payload }
        }).addCase(getById.rejected, (state) => {
            state.loading = false
        })
        // GET ALL ADMIN

        builder.addCase(fetchAllAdmin.pending, (state) => {
            state.loading = true
        }).addCase(fetchAllAdmin.fulfilled, (state, { payload }) => {
            state.loading = false
            state.admins = payload
        }).addCase(fetchAllAdmin.rejected, (state) => {
            state.loading = false
        })

        //ADD NEW ADMIN

        builder.addCase(createAdmin.pending, (state) => {
            state.loading = true
        }).addCase(createAdmin.fulfilled, (state, { payload }) => {
            state.loading = false
            state.admins = [...state.admins, payload]
        }).addCase(createAdmin.rejected, (state) => {
            state.loading = false
        })
        //Update ADMIN

        builder.addCase(updateAdmin.pending, (state) => {
            state.loading = true
        }).addCase(updateAdmin.fulfilled, (state, { payload }) => {
            state.loading = false
            state.admin = [...state.admin, payload]
        }).addCase(updateAdmin.rejected, (state) => {
            state.loading = false
        })
    }
})
export default adminSlice.reducer