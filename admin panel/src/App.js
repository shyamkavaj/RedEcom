import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import PrivateRoutes from './PrivateRoute'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// const clearAfterMilliseconds = 86400000; // 1 minute (adjust as needed)
// const navigate = useNavigate();
// Function to clear the item from local storage after a specific time
// function clearLocalStorageAfterTime() {
//    setTimeout(function () {
//    if(localStorage.getItem('tokenAuth')){
      
//     localStorage.removeItem('tokenAuth');
//     localStorage.removeItem('role')
//     // navigate('/login')
//     // console.log('Local storage item cleared after time.');
//     window.location.reload()
//     }
//   }, clearAfterMilliseconds);

// }
// clearLocalStorageAfterTime();
class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route
              path="/*" 
              element={
                <PrivateRoutes>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}
export default App
