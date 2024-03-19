import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../Services/UserService"

export const addUser = createAsyncThunk(
    "user/addUser",
    async (data) => {
        try {
            const res = await UserService.addUser(data);
            // const res = await axios.post("http://localhost:9999/addStudent", { data });
            console.log("res is ", res.data)
            return res.data;
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
            const res = await UserService.loginUser(data);
            console.log("res is ", res.token)
            extraHeaders['Authorization'] = `Bearer ${res.token}`;
            return res;
        }catch(err){
            console.log("error in login user ",err);
        }
    }
    )
const UserSlice = createSlice({
    name: "user",
    initialState: {
        users: []
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state, action) => {
                // state.loading = true
            })
            .addCase(addUser.fulfilled, (state, action) => {
                // state.loading = false
                // state.details = [...state.details, action.payload]
                // console.log("addStudent fulfilled ", state.details)
                // state.responce = "add"
            })
            .addCase(addUser.rejected, (state, action) => {
                // state.loading = false
                // state.error = action.error.message
            });
    }
})
export default UserSlice.reducer