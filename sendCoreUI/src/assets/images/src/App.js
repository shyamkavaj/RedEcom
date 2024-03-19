import { useDispatch } from 'react-redux'
import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// CSS
import 'ka-table/style.scss'
import './scss/style.scss'
import './assets/css/index.scss'
import './assets/css/theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// AUTH PAGES
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import PrivateRoute from './PrivateRoute'
// ALL SLICES
import { fetchAllAdmin } from './slices/adminSlice'
import { getAboutusById } from './slices/aboutusSlice'
import { getAll } from './slices/achivementSlice'
import { getAllCategory } from './slices/categorySlice'
import { getContactById } from './slices/contactusSlice'
import { getAllFaq } from './slices/faqSlice'
import { getAllHome } from './slices/homeSlice'
import { fetchLegalService } from './slices/legalServiceSlice'
import { getAllPlans } from './slices/planSlice'
import { fetchProviderService } from './slices/providerServiceSlice'
import { getAllSubCategory } from './slices/subCategorySlice'
import { getAllSubCategoryChild } from './slices/subCategoryChildSlice'
import { getAllSupporters } from './slices/supportersSlice'
import { fetchTestimonial } from './slices/testimonialSlice'
import { fetchAllUsers } from './slices/manageUsersSlice'
import { fetchPartners } from './slices/partnersSlice'
import { fetchSubAdmin } from './slices/subAdminSlice'
import { fetchAllInquiry } from './slices/inquirySlice'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const App = () => {
  const loadDataOnlyOnce = () => {}
  const dispatch = useDispatch()
  useEffect(() => {
    loadDataOnlyOnce(
      dispatch(fetchAllAdmin()),
      dispatch(getAllCategory()),
      dispatch(fetchAllUsers()),
      dispatch(fetchSubAdmin()),
      dispatch(fetchPartners()),
      dispatch(getAboutusById(1)),
      dispatch(getAllHome()),
      dispatch(getAllFaq()),
      dispatch(getAll()),
      dispatch(fetchTestimonial()),
      dispatch(getAllSupporters()),
      dispatch(getAllSubCategoryChild()),
      dispatch(getAllSubCategory()),
      dispatch(fetchProviderService()),
      dispatch(getAllPlans()),
      dispatch(fetchLegalService()),
      dispatch(getContactById(1)),
      dispatch(fetchAllInquiry()),
      // dispatch(getAllEvent()),
    )
  }, [dispatch, loadDataOnlyOnce])

  return (
    <BrowserRouter basename={'/admin'}>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/login" name="Login" element={<Login />} />
          <Route path="/register" name="Register" element={<Register />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                {' '}
                <DefaultLayout />{' '}
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
