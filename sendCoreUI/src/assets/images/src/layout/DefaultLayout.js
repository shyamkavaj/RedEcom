import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Outlet } from 'react-router-dom'
const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100" style={{ backgroundColor: '#EFF7F4' }}>
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent>
            <Outlet />
          </AppContent>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
