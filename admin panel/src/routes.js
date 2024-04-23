import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Products = React.lazy(() => import('./views/product/Addproduct'))
const ManageProducts = React.lazy(() => import('./views/product/ManageProducts'))
const AddCategory = React.lazy(() => import('./views/category/AddCategory'))
const AddSubCategory = React.lazy(() => import('./views/subcategory/AddSubCategories'))
const ManageFaq = React.lazy(() => import('./views/Faq/ManageFaqs'))
const Orders = React.lazy(() => import('./views/order/Orders'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/products', name: 'Products', element: Products },
  { path: '/products/addproducts', name: 'Add Product', element: Products },
  { path: '/products/manageproducts', name: 'Manage Product', element: ManageProducts },
  { path: '/category', name: 'Category', element: AddCategory },
  { path: '/subcategory', name: 'Products', element: AddSubCategory },
  { path: '/managefaq', name: 'Faq', element: ManageFaq },
  { path: '/orders', name: 'Orders', element: Orders },
]

export default routes
