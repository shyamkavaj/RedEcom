import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminServices from '../services/adminServices';
import { useAuth } from '../context/authProvider';
// import {logintoken} from useAuth()
import { useNavigate } from 'react-router-dom';
export const adminLogin = createAsyncThunk(
    'admin/adminLogin',
    async (data) => {
        try {
            // console.log("login data in slice", data);
            const res = await adminServices.loginServices(data);
            const navigate = useNavigate()
            // console.log("token ",res.token)
            // const navigate = useNavigate();
            // const { loginToken } = useAuth();
            localStorage.setItem('token',res.token)
            // loginToken(res.token)
            navigate('/')
            // co
            // localStorage.setItem('role','admin') 
            // loginToken(res.token)
            // navigate('/')
            // console.log("res si ", res)
            return res
            // return res;
        } catch (error) {
            console.log("error in the login ", error);
        }
    }
)

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        loading: '',
        admin: '',
        status: false
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = ''
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false
                // console.log("in action ", action.payload);
                // state.admin= action.payload
                if (action.payload.status === false) {
                    state.status = false
                    state.error = action.payload.message
                } else {
                    state.status = action.payload.status
                    state.admin = action.payload.user
                }
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default adminSlice.reducer;