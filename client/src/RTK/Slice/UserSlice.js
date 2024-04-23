import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from '../Services/userService'


export const addUser = createAsyncThunk(
    "user/addUser",
    async (data) => {
        try {
            const res = await userService.addUser(data);
            // const res = await axios.post("http://localhost:9999/addStudent", { data });
            console.log("res is ", res)
            return res;
        } catch (err) {
            // console.log()
            console.log("error in add user action ", err)
        }
    }
)
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async(data) => {
        try{
            const res = await userService.loginUser(data);
            // console.log("res is ", res.token)
            localStorage.setItem("token", res.token);
            // extraHeaders['Authorization'] = `Bearer ${res.token}`;
            return res;
        }catch(err){
            console.log("error in login user ",err);
        }
    }
    )
const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        status:0,
        message:'',
        loading:false,
        msg:""
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false
                console.log("ac ",action.payload)
                state.message = action.payload.message
                state.status = action.payload.status
            })
            .addCase(addUser.rejected, (state, action) => {
                // state.loading = false
                // state.error = action.error.message
            });
        builder 
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // console.log("ste ",action.payload)
                state.loading = false
                state.status = action.payload.status
                state.msg = action.payload.message
            })
    }
})
export default userSlice.reducer