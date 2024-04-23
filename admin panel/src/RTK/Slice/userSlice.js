import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import userService from '../services/userService';

export const getallUser = createAsyncThunk(
    "user/getallUser",
    async () => {
        try{
            // console.log("in get all user")
            const res = await userService.getAlluser();
            // console.log("in get all user in slice",res)
            return res.data;
        }catch(error){
            console.log("error in add user ",error);
        }
    }
)

const userSlice = createSlice({
    name: "users",
    initialState: {
        users:[],
        loading: "",
        // error:"",
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(getallUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getallUser.fulfilled ,(state,action) => {
                // console.log("in builder user ",action.payload)
                state.loading = false
                state.users = action.payload
            })
            .addCase(getallUser.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default  userSlice.reducer;