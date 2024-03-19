import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from "../Services/ProductService"

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (data) => {
        try {
            console.log("data in add product slice ",data);
            const res = await ProductService.addProduct(data);
            return res.data;
        } catch (err) {
            console.log("error in the add product ", err);
        }
    }
)

const ProductSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        loading:"",
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(addProduct.rejected, (state) => {
                state.loading = false
            })
    }
})

export default ProductSlice.reducer