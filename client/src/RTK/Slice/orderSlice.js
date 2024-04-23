import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderServices from "../Services/orderServices";

export const addOrder = createAsyncThunk(
    "order/addOrder",
    async (order) => {
        try {
            const res = await orderServices.addOrder(order);
            // console.log("res order slice ", res)
            // alert(res.msg)
            console.log('res in add order ',res)
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllOrder = createAsyncThunk(
    "order/getAllOrder",
    async () => {
        try {
            const res = await orderServices.getAllOrder();
            // console.log("res get order slice ", res)
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getOrderbyId = createAsyncThunk(
    "order/getOrderbyId",
    async (id) => {
        try {
            const res = await orderServices.getOrderbyId();
            // console.log("res get single order slice ", res)
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        order:{},
        loading: "",
        error: "",
        status: "",
        orderdata:[]
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("action payload ", action.payload);
                state.status = action.payload.status;
                // state.orders.push(action.payload.dataValues);
                state.order = action.payload;
            })
            // .addCase(addOrder.fulfilled, (state, action) => {
            //     state.loading = false;
            //     // console.log("action payload ", action.payload);
            //     state.status = action.payload.status;
            //     // state.orders.push(action.payload.dataValues);
            //     state.orderdata = action.payload;
            // })
            .addCase(addOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        builder
            .addCase(getAllOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        builder
            .addCase(getOrderbyId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderbyId.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrderbyId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default orderSlice.reducer;
