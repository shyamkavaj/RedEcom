import React, { useRef, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { CToaster } from '@coreui/react/dist'
import { ToastContainer } from 'react-toastify'

const DefaultLayout = () => {
  // const toaster = useRef()/
  // const [toast, addToast] = useState(0)

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
          {/* <CToaster className="p-3" placement="top-end" color="success" push={toast} ref={toaster} /> */}
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
