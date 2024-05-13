import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../services/productService';
import { useNavigate } from 'react-router-dom';
// import Toast from 'react-bootstrap/Toast';
export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (data) => {
        try {
            // const navigate = useNavigate();
            // console.log("d id ",data);
            const res = await productService.addProduct(data);
            // console.log("res add product ", res)
            if (res.success === 0) {
                alert(res.msg)
                // navigate("/login")
            }
            // console.log("res success ",res)
            return res;
        } catch (err) {
            console.log("error in the add product ", err);
        }
    }
)
export const getAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async () => {
        try {
            const res = await productService.getAllProduct();
            return res;
        } catch (err) {
            console.log("error in the get all product ", err);
        }
    }
)
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id) => {
        try {
            await productService.deleteProduct(id);
            return id;
        } catch (err) {
            console.log("error in the delete product ", err);
        }
    }
)
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data) => {
        try {
            // console.log("update id & data ", data)
            const res = await productService.updateProduct(data);
            const newRes = {
                ...res,
                id:data.id
            }
            // console.log("res up ", res)
            // if (res.success === 0) {
            //     alert(res.msg)
            // }
            return res;
        } catch (error) {
            throw error;
        }
    }
)
export const getProductByEmail = createAsyncThunk(
    "product/getproductbyemail",
    async (data) => {
        try {
            const res = await productService.getProductByEmail(data);
            console.log("data in res is ",res)
            return res
        } catch(error){
            throw error
        }
    }
)
const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        loading: "",
        error: ""
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.success == 1) {

                    state.products = [...state.products, action.payload.product]
                } else {
                    state.error = action.payload.msg
                }
            })
            .addCase(addProduct.rejected, (state) => {
                state.loading = false
                state.error = "error in the add product"
            })
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.loading = false
                // console.log("hhhhhhh",action.payload);
                state.products = action.payload
            })
            .addCase(getAllProduct.rejected, (state) => {
                state.loading = false
                state.error = "error in the get all product"
            })
        builder 
            .addCase(getProductByEmail.pending,(state) => {
                state.loading = true
            })
            .addCase(getProductByEmail.fulfilled, (state,action) => {
                console.log("data in front ",action.payload)
                state.loading = false
                state.products = action.payload
            })
            .addCase(getProductByEmail.rejected,(state) => {
                state.loading = false
            })
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                // console.log("action.payload dele", action.payload)
                state.products = state.products.filter((product) => product.id !== action.payload)
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.loading = false
                state.error = "error in the delete product"
            })
        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {

                // console.log("action.payload ", action.payload)
                if (action.payload.status === 1) {
                    // console.log("actiton ", action.payload.data)
                    const index = state.products.findIndex(product => product.id === parseInt(action.payload.data.id));
                    // console.log("index ", index)
                    if (index !== -1) {
                        const updatedDetail = [...state.products]
                        updatedDetail[index] = action.payload.data
                        // console.log('update update ',updatedDetail)
                        return {
                            ...state,
                            products: updatedDetail
                        }
                    } else {
                        return state;
                    }
                } else {
                    state.error = action.payload.msg
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default productSlice.reducer