import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// import { logoNegative } from 'src/assets/brand/logo-negative'
// import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { getAllProduct } from 'src/RTK/slice/productSlice'
import { getAllCate } from 'src/RTK/slice/cateSlice'
import { getAllSubCat } from 'src/RTK/slice/subcateSlice'
import { getallUser } from 'src/RTK/slice/userSlice'
import { getAllOrders } from 'src/RTK/slice/orderSlice'
import { getAllFaq } from 'src/RTK/slice/faqSlice'
import logo from 'src/assets/images/logo.png'
const AppSidebar = () => {
  // const dispatch = useDispatch()
  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.sidebar);
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCate())
    dispatch(getAllSubCat())
    dispatch(getallUser());
    dispatch(getAllOrders());
    dispatch(getAllFaq());
    // dispatch(getallUser());
  }, [dispatch])
  return (
    <CSidebar
      position="fixed"
      visible={active}
      className={active ? '' : 'hide'}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/" style={{'background':'white'}}>
        <img src={logo}/>
      </CSidebarBrand>
      <CSidebarNav style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none','fontSize':'17px','fontWeight':'bolder' }}>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
