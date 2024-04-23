import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibCodesandbox,
  cilList,
  cilPuzzle,
  cilSpeedometer,
  cilTags,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Manage Products',
    to: '/products',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Product',
        to: '/products/addproducts',
      },
      {
        component: CNavItem,
        name: 'Products List',
        to: '/products/manageproducts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Manage Category',
    to: '/category',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage Sub-Category',
    to: '/subcategory',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage Orders',
    to: '/orders',
    icon: <CIcon icon={cibCodesandbox} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Others',
    to: '/others',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Manage Faq',
        to: '/manageFaq',
      },
    ],
  },

]

export default _nav
