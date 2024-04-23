// import logo from './logo.svg';
import './App.css';
import './assets/Allcss';
import './assets/AllJs';
// import OwlCarousel from 'react-owl-carousel';
import Navbar from "./components/Navbar";
// import Banner_Feature from './components/Banner_Feature';

// import Feature from './components/Feature';
// import Category from './components/Category';
// import Product from './components/Product';
// import ExclusiveDeal from './components/ExclusiveDeal';
// import Brand from './components/Brand';
// import RelatedProduct from './components/RelatedProduct';
// import Footer from './components/Footer';
import Shop_Category from './components/Shop_Category';
import Single_Product from './components/Single_Product';
import CheckOut from './components/CheckOut';
import Card from './components/Card';
import Conformation from './components/Conformation';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import { Route,Routes, useNavigate} from 'react-router-dom';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import { getAllCate } from './RTK/Slice/cateSlice';
import { getAllSubCat } from './RTK/Slice/subcateSlice';
import { getAllProduct } from './RTK/Slice/productSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllFaq } from './RTK/Slice/faqSlice';
import OrderHistory from './components/OrderHistory';
import { getAllOrder } from './RTK/Slice/orderSlice';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCate());
    dispatch(getAllSubCat());
    dispatch(getAllProduct());
    dispatch(getAllFaq());
    dispatch(getAllOrder());
}, [dispatch])
// Set the key for the item in local storage
  // const localStorageKey = token;

  // Set the time in milliseconds after which you want to clear the local storage
  const clearAfterMilliseconds = 86400000; // 1 minute (adjust as needed)
  const navigate = useNavigate();
  // Function to clear the item from local storage after a specific time
  function clearLocalStorageAfterTime() {
     setTimeout(function () {
     if(localStorage.getItem('token')){
        
      localStorage.removeItem('token');
      console.log('Local storage item cleared after time.');
      window.location.reload()
      }
    }, clearAfterMilliseconds);

  }

  // Save data to local storage
  // localStorage.setItem(localStorageKey, token);

  // Call the function to clear local storage after a specific time
  clearLocalStorageAfterTime();

  return (
    <div className="App">
      <Routes>
        <Route exact element={<Navbar />} >
          <Route path="/"   element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/procategory" element={<Shop_Category />}/>
          <Route path="/cart" element={<Card/>}/>
          <Route path="/productdetails/:id" element={<Single_Product/>}/>
          <Route element={<PrivateRoute />}>
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='/conformation' element={<Conformation />} />
            <Route path='/allorder' element={<OrderHistory/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
