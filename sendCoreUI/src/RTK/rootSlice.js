import { configureStore } from "@reduxjs/toolkit";
import productSlice from './Slice/ProductSlice';
import sidebarSlice from './Slice/SidebarSlice';
const store = configureStore({
    reducer:{
        product:productSlice,
        sidebar:sidebarSlice,
    },
})
export default store;