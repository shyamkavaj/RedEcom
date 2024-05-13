import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from '../services/userService';
import { CToast, CToastHeader } from "@coreui/react/dist";
import { useState } from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
// import Swal from 'sweetalert2'/

export const getallUser = createAsyncThunk(
    "user/getallUser",
    async () => {
        try {
            const res = await userService.getAlluser();
            return res;
        } catch (error) {
            console.log("error in add user ", error);
        }
    }
)
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id) => {
        try {
            const res = await userService.deleteUser(id);
            console.log("delete user ", res)
            return res
        } catch (error) {
            console.log("error in delete user ", error)
        }
    }
)
export const updateRole = createAsyncThunk(
    "user/updateRole",
    async (data) => {
        try {
            console.log("user role ", data)
            const res = await userService.updateRoleUser(data);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.message,
                showConfirmButton: false,
                timer: 1500,
                onclose: () => {
                    console.log("on swal colse")
                }
            })
            return res;
        } catch (error) {
            console.log("error in role update ", error)
        }
    }
)
const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: "",
        error: "",
        message: ""
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(getallUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getallUser.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(getallUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false
                console.log("action delete ", action.payload)
                console.log("state user ", state.users)
                state.users = state.users.filter(user => user.id !== JSON.parse(action.payload.id))
            })
            .addCase(deleteUser.rejected, (state, payload) => {
                state.loading = false
                state.error = action.payload.message
            })
        builder
            .addCase(updateRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.loading = false;
                console.log("act ", action.payload);
                const index = state.users.findIndex(us => us.id === parseInt(action.payload.data.id));
                console.log("id role ", index);
                if (action.payload.success) {
                    if (index !== -1) {
                        state.users[index] = action.payload.data; // Modify the draft state
                        console.log("updated role ", state.users[index]);
                        state.message = action.payload.message;
                    } else {
                        return state;
                    }
                } else {
                    state.error = action.payload.message;
                }
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
    }
})

export default userSlice.reducer;