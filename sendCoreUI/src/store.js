// import { createStore } from 'redux'
// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store

import { configureStore,combineReducers } from "@reduxjs/toolkit";
import SidebarSlice from "./RTK/Slice/SidebarSlice";
import ProductSlice from "./RTK/Slice/ProductSlice";

const rootReducer = combineReducers({
  sidebar: SidebarSlice,
  product: ProductSlice,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store;