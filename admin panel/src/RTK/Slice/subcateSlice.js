import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subcateServices from "../services/subcateServices";



export const getAllSubCat = createAsyncThunk(
    "subcategory/getAllSubCat",
    async () => {
        try {
            // console.log("mnnnnnnnnnnnnnnnnnnn");
            const res = await subcateServices.getAllSubCat();
            // console.log("in sub======== cate", res.data)
            return res.data;
        } catch (error) {
            console.log("error in get all subcate ", error);
        }
    }
)
export const addSubcate = createAsyncThunk(
    "subcategory/addSubcate",
    async (data) => {
        try {
            const res = await subcateServices.addSubcate(data);
            // console.log("add sub ", res)
            return res;
        } catch (error) {
            throw error;
        }
    }
)
// export const getCate = createAsyncThunk(
//     "subcategory/getCate",
//     async (data) => {
//         try{
//             const cate = await subcateServices.getCate(data);
//             console.log("in get cate",cate)
//             return res;
//         } catch(error) {
//             throw error;
//         }  
//     }
// )
export const deleteSubCate = createAsyncThunk(
    "subcategory/deleteSubCate",
    async (id) => {
        try {
            const res = await subcateServices.deleteSubcate(id);
            return id;
        } catch (error) {
            throw error;
        }
    }
)
export const updateSubCate = createAsyncThunk(
    "subcategory/updateSubCate",
    async (data) => {
        try {
            // console.log("update sub ",data)
            const res = await subcateServices.updateSubCate(data);
            // console.log("res in update ",res);
            return res;
        } catch (error) {
            throw error
        }
    }
)
const subcategorySlice = createSlice({
    name: "subcategory",
    initialState: {
        subcate: [],
        loading: "",
        category: []
        // error:"",
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllSubCat.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllSubCat.fulfilled, (state, action) => {
                // console.log("in builder subcategory ", action.payload)
                state.loading = false
                state.subcate = action.payload
            })
            .addCase(getAllSubCat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
        builder
            .addCase(addSubcate.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSubcate.fulfilled, (state, action) => {
                state.loading = false
                // console.log("action sub ", action.payload)
                state.subcate = [...state.subcate, action.payload]
            })
            .addCase(addSubcate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
        builder
            .addCase(deleteSubCate.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSubCate.fulfilled, (state, action) => {
                state.loading = false
                state.subcate = state.subcate.filter((item) => item.id !== action.payload)
            })
            .addCase(deleteSubCate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
        builder
            .addCase(updateSubCate.pending,(state) => {
                state.loading = true;
            })
            .addCase(updateSubCate.fulfilled,(state,action) => {
                state.loading = false;
                const index = state.subcate.findIndex((subc) => subc.id === action.payload.data.id);
                // console.log("index update sub cate ",action.payload.data.subcategory_name);
                if(index !== -1){
                    // const updatedSubCate = [...state.subcate]
                    // updatedSubCate[index].subcategory_name = action.payload.data
                    // console.log("update sub ",updatedSubCate)
                    state.subcate[index].subcategory_name = action.payload.data.subcategory_name
                    // return {
                    //     ...state,
                    //     subcate:updatedSubCate
                    // }
                } else {
                    return state;
                }
                
            })
        // builder
        //     .addCase(getCate.pending, (state) => {
        //         state.loading = true;
        //     })
        //     .addCase(getCate.fulfilled, (state, action) => {
        //         state.loading = false
        //         console.log("cate name ",action.payload);
        //         state.category = [...state.category,action.payload]
        //     })
        //     .addCase(getCate.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = action.payload
        //     })
    }
})

export default subcategorySlice.reducer;