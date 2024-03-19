// import logo from './logo.svg';
import './App.css';
import './assets/Allcss';
import './assets/AllJs';
import OwlCarousel from 'react-owl-carousel';
import Navbar from "./components/Navbar";
// import Banner_Feature from './components/Banner_Feature';

import Feature from './components/Feature';
import Category from './components/Category';
import Product from './components/Product';
import ExclusiveDeal from './components/ExclusiveDeal';
import Brand from './components/Brand';
import RelatedProduct from './components/RelatedProduct';
import Footer from './components/Footer';
import Shop_Category from './components/Shop_Category';
import Single_Product from './components/Single_Product';
import CheckOut from './components/CheckOut';
import Card from './components/Card';
import Conformation from './components/Conformation';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import { BrowserRouter ,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Routes>
        <Route exact element={<Navbar />} >
          <Route path="/"   element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact/>}/>
        </Route>
      </Routes>
        {/* <Navbar /> */}
        
        {/* <Shop_Category/> */}
        {/* <Single_Product/> */}
        {/* <CheckOut/> */}
        {/* <Card/> */}
        {/* <Conformation/> */}
        {/* <Login/> */}
        {/* <Signup/> */}
        {/* <Contact/> */}
      {/* </header> */}
    </div>
  );
}

export default App;
