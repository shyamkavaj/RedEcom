// import { , createStore } from 'redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import aboutusSlice from './slices/aboutusSlice'
import achivementSlice from './slices/achivementSlice'
import adminSlice from './slices/adminSlice'
import authSlice from './slices/authSlice'
import becomePartnerSlice from './slices/becomePartnerSlice'
import categorySlice from './slices/categorySlice'
import contactusSlice from './slices/contactusSlice'
import DashBoardSlice from './slices/DashBoardSlice'
import downloadPdfSlice from './slices/downloadPdfSlice'
import eventSlice from './slices/eventSlice'
import faqSlice from './slices/faqSlice'
import getStartedInquiryPageSlice from './slices/getStartedInquiryPageSlice'
import homeSlice from './slices/homeSlice'
import inquirySlice from './slices/inquirySlice'
import intrestedListSlice from './slices/intrestedListSlice'
import legalServiceSlice from './slices/legalServiceSlice'
import manageUsersSlice from './slices/manageUsersSlice'
import partnerInquirySlice from './slices/partnerInquirySlice'
import partnersSlice from './slices/partnersSlice'
import planBookingSlice from './slices/planBookingSlice'
import planSlice from './slices/planSlice'
import providerServiceSlice from './slices/providerServiceSlice'
import serviceBookingReportsSlice from './slices/serviceBookingReportsSlice'
import sidebarSlice from './slices/sidebarSlice'
import subAdminSlice from './slices/subAdminSlice'
import subCategoryChildSlice from './slices/subCategoryChildSlice'
import subCategorySlice from './slices/subCategorySlice'
import supportersSlice from './slices/supportersSlice'
import testimonialSlice from './slices/testimonialSlice'
import userBoardPageSlice from './slices/userBoardPageSlice'
import blogSlice from './slices/blogSlice'

const rootReducer = combineReducers({
  sidebar: sidebarSlice,
  faqs: faqSlice,
  testimonials: testimonialSlice,
  auth: authSlice,
  categorys: categorySlice,
  subCategorys: subCategorySlice,
  subCategoryChild: subCategoryChildSlice,
  home: homeSlice,
  contact: contactusSlice,
  about: aboutusSlice,
  plan: planSlice,
  achivement: achivementSlice,
  supporters: supportersSlice,
  legalService: legalServiceSlice,
  providerService: providerServiceSlice,
  manageUsers: manageUsersSlice,
  admin: adminSlice,
  subAdmin: subAdminSlice,
  becomePartner: becomePartnerSlice,
  serviceBooking: serviceBookingReportsSlice,
  events: eventSlice,
  partner: partnersSlice,
  dashboard: DashBoardSlice,
  planBooking: planBookingSlice,
  inquiry: inquirySlice,
  partnerInquiry: partnerInquirySlice,
  intrested: intrestedListSlice,
  start: getStartedInquiryPageSlice,
  userBoard: userBoardPageSlice,
  downloadPdf: downloadPdfSlice,
  blogs: blogSlice,
})

// const store = createStore(changeState)]
const store = configureStore({
  reducer: rootReducer,
  // reducer: { changeState }
})
export default store
