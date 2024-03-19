import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

import Dashboard from 'src/views/Dashboard/Dashboard'
import ManageUsers from 'src/views/manage users/ManageUsers'
import AdminList from 'src/views/admin/AdminList'
import AboutUs from 'src/views/home/aboutUs/AboutUs'
import ContactUs from 'src/views/home/contactUs/ContactUs'
import HomePage from 'src/views/home/homePage/HomePage'
import Category from 'src/views/home/category/Category'
import SubCategoryChild from 'src/views/home/subCategoryChild/SubCategoryChild'
import SubCategory from 'src/views/home/subCategory/SubCategory'
import ProviderService from 'src/views/home/providerService/ProviderService'
import EventList from 'src/views/Event/EventList'
import Testimonial from 'src/views/home/testimonial/Testimonial'
import Faq from 'src/views/home/Faq/Faq'
import Plan from 'src/views/home/plan/Plan'
import Supporters from 'src/views/home/supporters/Supporters'
// import LegalService from 'src/views/home/legalService/LegalService'
import Achivement from 'src/views/home/achivement/Achivement'
import UsersReports from 'src/views/reports/UsersReports'
import ServiceBookingReports from 'src/views/reports/ServiceBookingReports'

// routes config
import SubAdminReports from 'src/views/reports/SubAdminReports'
import BecomePartnerPage from 'src/views/home/becomePartnerPage/BecomePartnerPage'
import Partner from 'src/views/Partner/Partner'
import SubAdmin from 'src/views/SubAdmin/SubAdmin'
import CustomerBookingReports from 'src/views/reports/CustomerBookingReports'
import CustomerPlanBookingReport from 'src/views/reports/CustomerPlanBookingReport'
import InquiryPage from 'src/views/Inquiry Page/InquiryPage'
import PartnerInquiryPage from 'src/views/PartnerInquiryPage/PartnerInquiryPage'
import IntrestedList from 'src/views/EventList/IntrestedList'
import ManageUsersByPartner from 'src/views/ManageUsersByPartner/ManageUsersByPartner'
import GetStartedInquiryPage from 'src/views/reports/GetStartedInquiryPage'
import UserBoardPage from 'src/views/home/UserboardPage/UserBoardPage'
import UserByProviderService from 'src/views/UserByProviderService.js/UserByProviderService'
import ServiceBookingPage from 'src/views/ServiceBookingPage/ServiceBookingPage'
import PartnerServiceBooking from 'src/views/PartenerServiceBooking/PartnerServiceBooking'
import Blogs from 'src/views/Blogs/Blogs'
import CustomerPendingBooking from 'src/views/reports/CustomerPendingBooking'

const AppContent = () => {
  return (
    <Suspense fallback={<CSpinner color="primary" />}>
      <Routes>
        {/* {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })} */}
        {/* <Route path="/" element={<Navigate to="dashboard" replace />} /> */}

        {/* Dashboard Page */}
        <Route path="/" element={<Dashboard />} />

        {/* Admin Page */}
        <Route path="/admin-list" element={<AdminList />} />

        {/* Sub Admin Page */}
        <Route path="/sub-admin" element={<SubAdmin />} />

        {/* Partner Page */}
        <Route path="/partners" element={<Partner />} />

        {/* Manage Users Page */}
        <Route path="/manage-users" element={<ManageUsers />} />

        {/* Events Page */}
        <Route path="/event-list" element={<EventList />} />

        {/* Contact Inquiry Page */}
        <Route path="/inquiry-page" element={<InquiryPage />} />

        {/* Partner Inquiry Page */}
        <Route path="/partner-inquiry-page" element={<PartnerInquiryPage />} />

        {/* Event List Page */}
        <Route path="/intrested" element={<IntrestedList />} />

        {/* Service Booking Page */}
        <Route path="/service-booking-page" element={<ServiceBookingPage />} />

        {/* Service DropDown */}
        <Route path="/service" element={<Category />} />
        <Route path="/category" element={<SubCategory />} />
        <Route path="/sub-category" element={<SubCategoryChild />} />
        <Route path="/provider-service" element={<ProviderService />} />

        {/* Others DropDown */}
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/supporters" element={<Supporters />} />
        <Route path="/plan" element={<Plan />} />
        {/* <Route path="/legal-service" element={<LegalService />} /> */}
        <Route path="/achivement" element={<Achivement />} />
        <Route path="/faq" element={<Faq />} />

        {/* CMS Pages DropDown */}
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/become-partner-page" element={<BecomePartnerPage />} />
        <Route path="/user-board-page" element={<UserBoardPage />} />

        {/* Reports Pages DropDown */}
        <Route path="/users-reports" element={<UsersReports />} />
        <Route path="/service-booking-reports" element={<ServiceBookingReports />} />
        <Route path="/customer-booking-reports" element={<CustomerBookingReports />} />
        <Route path="/customer-plan-booking-reports" element={<CustomerPlanBookingReport />} />
        <Route path="/sub-admin-reports" element={<SubAdminReports />} />
        <Route path="/get-started-reports" element={<GetStartedInquiryPage />} />
        <Route path="/customer-pending-reports" element={<CustomerPendingBooking />} />

        {/* Partner Dashboard Pages */}
        <Route path="/user-by-provider-service" element={<UserByProviderService />} />
        <Route path="/manage-users-by-partner" element={<ManageUsersByPartner />} />
        <Route path="/partner-service-booking" element={<PartnerServiceBooking />} />
        {/* Blog Page */}
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </Suspense>
  )
}

export default React.memo(AppContent)
