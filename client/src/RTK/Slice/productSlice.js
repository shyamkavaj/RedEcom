import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../Services/productService';
import { useNavigate } from 'react-router-dom';
// import Toast from 'react-bootstrap/Toast';
export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (data) => {
        try {
            // const navigate = useNavigate();
            const res = await productService.addProduct(data);
            console.log("res add product ", res)
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
            console.log("update id & data ", data)
            const res = await productService.updateProduct(data);
            console.log("res up ", res)
            return res;
        } catch (error) {
            throw error;
        }
    }
)
export const getAllProductByCate = createAsyncThunk(
    "category/getAllProductByCate",
    async (id) => {
        try {
            const res = await productService.getAllProductByCate(id);
            console.log("pro by cate ", res)
            return res;
        } catch (err) {
            throw err
        }
    }
)
export const getAllProductByCateAndSub = createAsyncThunk(
    "category/getAllProductByCateAndSub",
    async (data) => {
        try {
            const res = await productService.getAllProductByCateAndSub(data);
            console.log("res in pro sub cate ", res)
            console.log("pro by cate ", res)
            return res
        } catch (err) {
            throw err
        }
    }
)
export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (id) => {
        try {
            const res = await productService.getProductById(id);
            // console.log("res from get by id :>> ", res);
            return res;
        } catch (err) {
            console.log("error in the get all product ", err);
        }
    }
)
const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        product:{},
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
                state.products = action.payload
            })
            .addCase(getAllProduct.rejected, (state) => {
                state.loading = false
                state.error = "error in the get all product"
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
            .addCase(getAllProductByCate.pending, (state) => {
                state.loading = true

            })
            .addCase(getAllProductByCate.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(getAllProductByCate.rejected, (state) => {
                state.loading = false
                state.error = "error in the get all product by cate"
            })
        builder
            .addCase(getAllProductByCateAndSub.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllProductByCateAndSub.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(getAllProductByCateAndSub.rejected, (state) => {
                state.loading = false
                state.error = "error in the get all product by cate and sub"
            })
        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {

                // console.log("action.payload ", action.payload)
                if (action.payload.success === 1) {
                    var img = [];
                    for (var i = 0; i < action.payload.image.length; i++) {
                        img.push(action.payload.image[i].name)
                    }
                    // console.log("img ", img)
                    // console.log("actiton ", action.payload)
                    const index = state.products.findIndex(product => product.id === action.payload.id);
                    // console.log("index ", index)
                    if (index !== -1) {
                        const updatedDetail = [...state.products]
                        updatedDetail[index] = action.payload
                        
                        return {
                            ...state,
                            products: updatedDetail
                        }
                        // Update the product in the products array
                        // state.products[index] = action.payload;
                        // state.products[index].image = img;
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
            builder
            .addCase(getProductById.pending, (state) => {
                state.loading = true
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
            })
            .addCase(getProductById.rejected, (state) => {
                state.loading = false
                state.error = "error in the get all product"
            })
    }
})

export default productSlice.reducer