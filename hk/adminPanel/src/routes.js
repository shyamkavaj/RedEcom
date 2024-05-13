import React from 'react'
// import ManageUsers from './views/user/ManageUsers'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Products = React.lazy(() => import('./views/product/Addproduct'))
const ManageProducts = React.lazy(() => import('./views/product/ManageProducts'))
const AddCategory = React.lazy(() => import('./views/category/AddCategory'))
const AddSubCategory = React.lazy(() => import('./views/subcategory/AddSubCategories'))
const ManageFaq = React.lazy(() => import('./views/Faq/ManageFaqs'))
const Orders = React.lazy(() => import('./views/order/Orders'))
const ManageUsers = React.lazy(() => import('./views/user/ManageUsers'))
const PageNot = React.lazy(() => import('./views/pages/PageNotFound'))

const role = localStorage.getItem('role')

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/products', name: 'Products', element: Products },
  { path: '/products/addproducts', name: 'Add Product', element: Products },
  { path: '/products/manageproducts', name: 'Manage Product', element: ManageProducts },
  { path: '/category', name: 'Category', element: AddCategory },
  { path: '/subcategory', name: 'Products', element: AddSubCategory },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  ,

  role !== 'vendor' ? { path: '/orders', name: 'Orders', element: Orders } : { path: '/orders', name: 'PageNot', element: PageNot },
  role !== 'vendor' ? { path: '/managefaq', name: 'Faq', element: ManageFaq } : { path: '/managefaq', name: 'PageNot', element: PageNot },
  role !== 'vendor' ? { path: '/users', name: 'ManageUsers', element: ManageUsers } : { path: '/users', name: 'PageNot', element: PageNot },
].filter(Boolean);

export default routes
