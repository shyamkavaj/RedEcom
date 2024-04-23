import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import sidebarSlice from './slice/sidebarSlice';
import cateSlice from "./slice/cateSlice";
import subcateSlice from "./slice/subcateSlice";
import adminSlice from "./slice/adminSlice";
import faqSlice from "./slice/faqSlice";
import userSlice from "./slice/userSlice";
import orderSlice from "./slice/orderSlice";

const combineReducer = combineReducers({
    // admin:adminSlice,
    sidebar: sidebarSlice,
    product: productSlice,
    category: cateSlice,
    subcate: subcateSlice,
    admin: adminSlice,
    faq: faqSlice,
    users: userSlice,
    order: orderSlice
})
export default combineReducer;