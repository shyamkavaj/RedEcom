import React from 'react'

//Dashboard
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'))

//Manage Users
const ManageUsers = React.lazy(() => import('./views/manage users/ManageUsers'))

//Admin List
const AdminList = React.lazy(() => import('./views/admin/AdminList'))

//SubAdmin
const SubAdmin = React.lazy(() => import('./views/SubAdmin/SubAdmin'))

//Partner
const Partner = React.lazy(() => import('./views/Partner/Partner'))

//EventList
const EventList = React.lazy(() => import('./views/Event/EventList'))

//CMS Pages
const HomePage = React.lazy(() => import('./views/home/homePage/HomePage'))
const AboutUs = React.lazy(() => import('./views/home/aboutUs/AboutUs'))
const ContactUs = React.lazy(() => import('./views/home/contactUs/ContactUs'))
const BecomePartnerPage = React.lazy(() =>
  import('./views/home/becomePartnerPage/BecomePartnerPage'),
)

//Services Section
const Category = React.lazy(() => import('./views/home/category/Category'))
const SubCategory = React.lazy(() => import('./views/home/subCategory/SubCategory'))
const SubCategoryChild = React.lazy(() => import('./views/home/subCategoryChild/SubCategoryChild'))
const ProviderService = React.lazy(() => import('./views/home/providerService/ProviderService'))

//Others Section
const Testimonial = React.lazy(() => import('./views/home/testimonial/Testimonial'))
const Supporters = React.lazy(() => import('./views/home/supporters/Supporters'))
const Plan = React.lazy(() => import('./views/home/plan/Plan'))
const LegalService = React.lazy(() => import('./views/home/legalService/LegalService'))
const Achivement = React.lazy(() => import('./views/home/achivement/Achivement'))
const Faq = React.lazy(() => import('./views/home/Faq/Faq'))

//Reports
const UsersReports = React.lazy(() => import('./views/reports/UsersReports'))
const ServiceBookingReports = React.lazy(() => import('./views/reports/ServiceBookingReports'))
const SubAdminReports = React.lazy(() => import('./views/reports/SubAdminReports'))

//Charts
const Charts = React.lazy(() => import('./views/charts/Charts'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/manage-users', name: 'Manage Users', element: ManageUsers },
  { path: '/admin-list', name: 'Admin', element: AdminList },
  { path: '/sub-admin', name: 'Sub Admin', element: SubAdmin },
  { path: '/partner', name: 'Partner', element: Partner },
  { path: '/event-list', name: 'EventList', element: EventList },

  { path: '/homepage', name: 'HomePage', element: HomePage },
  { path: '/aboutus', name: 'AboutUs', element: AboutUs },
  { path: '/contactus', name: 'ContactUs', element: ContactUs },
  { path: '/become-partner-page', name: 'Become Partner', element: BecomePartnerPage },

  { path: '/service', name: 'Service', element: Category },
  { path: '/category', name: 'Category', element: SubCategory },
  { path: '/sub-category', name: 'Sub Category', element: SubCategoryChild },
  { path: '/provider-service', name: 'Provider Service', element: ProviderService },

  { path: '/testimonial', name: 'Testimonial', element: Testimonial },
  { path: '/supporters', name: 'Supporters', element: Supporters },
  { path: '/plan', name: 'Plan', element: Plan },
  { path: '/legal-service', name: 'Legal Service', element: LegalService },
  { path: '/achivement', name: 'Achivement', element: Achivement },
  { path: '/faq', name: 'Faq', element: Faq },

  { path: '/user-reports', name: 'Users Reports', element: UsersReports },
  {
    path: '/service-booking-reports',
    name: 'Service Booking Reports',
    element: ServiceBookingReports,
  },
  { path: '/sub-admin-reports', name: 'Subadmin Reports', element: SubAdminReports },

  { path: '/charts', name: 'Charts', element: Charts },
]

export default routes
