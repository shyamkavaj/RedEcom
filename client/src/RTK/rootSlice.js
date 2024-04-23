import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slice/userSlice';
import cateSlice from "./Slice/cateSlice";
import subcateSlice from "./Slice/subcateSlice";
import productSlice from "./Slice/productSlice";
import faqSlice from "./Slice/faqSlice";
import orderSlice from "./Slice/orderSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        category: cateSlice,
        subcate: subcateSlice,
        product: productSlice,
        order:orderSlice,
        faq: faqSlice
        // sidebar: sidebarSlice,
        // admin: adminSlice,
        // faq: faqSlice,
        // users: userSlice
    },
})

export default store;