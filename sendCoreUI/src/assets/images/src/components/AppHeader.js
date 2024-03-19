import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/images/ensure_logo.png'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { hideShowSidebar } from 'src/slices/sidebarSlice'
import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
const AppHeader = () => {
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    navigate('/login')
  }
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')
  const token = localStorage.getItem('token')
  return (
    <>
      <Navbar className=" bg-light shadow p-3 mb-5 rounded">
        <Container fluid>
          <Navbar.Toggle
            className="d-block ps-1"
            //onClick={() => dispatch(toggleSidebar({ type: 'set', sidebarShow: !sidebarShow }))}
            onClick={() => dispatch(hideShowSidebar())}
          >
            <CIcon icon={cilMenu} size="lg" />
          </Navbar.Toggle>

          <Navbar.Brand className="header-brand mx-auto d-md-none" to="/">
            <img src={logo} height={48} alt="Logo" />
          </Navbar.Brand>
          <Nav className="d-none d-md-flex me-auto">
            <Nav.Link href="#"></Nav.Link>
            {/* <AppBreadcrumb /> */}
          </Nav>
          <div className="d-flex gap-2">
            {/* <h5>{email}</h5> */}
            <h5>{role}</h5>
          </div>

          <Nav>
            <div className="container mx-auto">
              {!email && !token && !role ? (
                <Nav.Link
                  href="/login"
                  component={NavLink}
                  className="btn btn-block"
                  style={{ backgroundColor: 'rgb(53, 151, 132)', color: 'white' }}
                >
                  Login
                </Nav.Link>
              ) : (
                <>
                  <button
                    onClick={onLogOut}
                    className="btn"
                    style={{ backgroundColor: '#1A3A6A', color: 'white' }}
                  >
                    Log Out
                  </button>
                </>
              )}
            </div>
          </Nav>
          <Nav className="ms-3">{/* <AppHeaderDropdown /> */}</Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default AppHeader
