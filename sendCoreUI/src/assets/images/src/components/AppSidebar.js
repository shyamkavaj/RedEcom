import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import logo from '../assets/images/footer_logo_white.png'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
// import { hideShowSidebar, toggleSidebar } from 'src/slices/sidebarSlice'

const AppSidebar = () => {
  const dispatch = useDispatch()

  // const { sidebarShow } = useSelector((state) => state.sidebar)
  const { active } = useSelector((state) => state.sidebar)
  return (
    <CSidebar
      position="fixed"
      visible={active}
      // onVisibleChange={(visible) => {
      //   dispatch(toggleSidebar({ type: 'set', sidebarShow: visible }))
      // }}
      className={active ? '' : 'hide'}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={logo} alt="logo" />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
