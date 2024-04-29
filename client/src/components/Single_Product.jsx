import React, { useState, useEffect } from 'react'
// import s_p1 from '../img/category/s-p1.jpg';
// import checkimg from '../img/product/p11.jpg';
// import checkimg2 from '../img/product/p11_1.jpg';
// import checkimg3 from '../img/product/p11_2.jpg';
import OwlCarousel from 'react-owl-carousel';
import { NavLink } from 'react-bootstrap';
import RelatedProducted from './RelatedProduct';
import {  useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getProductById } from '../RTK/Slice/productSlice';
// import { object } from 'yup';
// import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProductById } from '../RTK/Slice/productSlice';
// import { getAllCate } from '../RTK/Slice/cateSlice';

const Single_Product = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate()
    let { id } = useParams();
    // console.log("params log",id)

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id])

    const singleProduct = useSelector(state => state.product);
    const productID = singleProduct.product.id;
    // console.log("single product ",singleProduct)
    const [Quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        if (Quantity < 10) {
            const newValue = Quantity + 1;
            setQuantity(newValue);
        }
    }

    const handleDecrement = () => {
        if (Quantity > 0) {
            const newValue = Quantity - 1;
            setQuantity(newValue);
        }
    }

    useEffect(()=>{
        window.scrollTo(0,0)
    },[]);

    // ---------------------------add to cart--------------------------------------------------------
    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) ? JSON.parse(sessionStorage.getItem('cart')) : []);
    // console.log("initial cart", JSON.stringify(sessionStorage.getItem('TotalQnty')));
    if(sessionStorage.getItem('TotalQnty') == null){
        sessionStorage.setItem('TotalQnty',0)
    }
    const totalQnty =  JSON.parse(sessionStorage.getItem('TotalQnty'));

    // console.log('tt ',totalQnty)
    const addToCart = (productID) => {
        if (cart.find(item => item.product_id === productID)) {
            toast.error("Product is already added in the cart..!");
        } else {
            const newItem = {
                product_id: productID,
                Qnty: Quantity
            };
            // console.log("NEW iTEM",newItem)
            setCart([...cart, newItem]);
            sessionStorage.setItem('TotalQnty',totalQnty+Quantity)
            toast.success("Product added Succesfully !");
        }
    };
    sessionStorage.setItem('cart', JSON.stringify(cart)); // Store updated cart in session storage
    // const data = sessionStorage.getItem('cart');
    // console.log("session data ", data);
    // ----------------------------------------------------------------------------------------------

    return (
        <div>
            <section className="banner-area organic-breadcrumb">
                <div className="container">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Product Details Page</h1>
                            <nav className="d-flex align-items-center">
                                <NavLink to='/'>Home<span className="lnr lnr-arrow-right" /></NavLink>
                                <NavLink to='/procategory'>Shop Category<span className="lnr lnr-arrow-right" /></NavLink>
                                <NavLink>product-details</NavLink>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <div>
                <div className="product_image_area">
                    <div className="container">
                        <div className="row s_product_inner">
                            <div className="col-lg-6">
                                <OwlCarousel
                                    className="owl-theme"
                                    items={1}
                                    autoplay={false}
                                    autoplayTimeout={5000}
                                    loop={true}
                                    nav={false}
                                    dots={true}
                                >
                                    {singleProduct.product.image?.map((item) => (
                                        <img className='img-fluid' src={process.env.REACT_APP_IMG_URL + item} alt='single image' 
                                        loading='lazy'
                                        />
                                    ))}
                                </OwlCarousel>
                            </div>
                            <div className="col-lg-5 offset-lg-1">
                                <div className="s_product_text">
                                    <h3>{singleProduct.product.name}</h3>
                                    <h2>₹{singleProduct.product.price}</h2>
                                    <ul className="list">
                                        <li><span>Category</span> : {singleProduct.product.categ}</li>
                                        <li><span>Availibility</span> : In Stock</li>
                                    </ul>
                                    <p>{singleProduct.product.description}</p>
                                    <div className="product_count">
                                        <label htmlFor="qty">Quantity:</label>
                                        <input type="text" name="qty" id="sst"
                                            value={Quantity}
                                            title="Quantity:" className="input-text qty" />
                                        <button
                                            onClick={handleIncrement}
                                            className="increase items-count" type="button"><i className="lnr lnr-chevron-up" />
                                        </button>
                                        <button
                                            onClick={handleDecrement}
                                            className="reduced items-count" type="button"><i className="lnr lnr-chevron-down" />
                                        </button>
                                    </div>

                                    <div className="card_area d-flex align-items-center">
                                        {/* <button
                                            // onClick={handleIncrement}
                                            className="increase items-count" type="button">
                                            <NavLink className="nav-link primary-btn" to='/Contact'>Add to Cart</NavLink>
                                        </button> */}
                                        {/* <NavLink className='nav-link' to={"/"}>
                                        jsidjilssklfn
                                        </NavLink> */}
                                        {/* <Link className="primary-btn nav-link" to={`/card/${singleProduct.product.id}`}>Add to Cart</Link> */}
                                        {/* <a className="icon_btn" href="#"><i className="lnr lnr lnr-diamond" /></a> */}
                                        {/* <a className="icon_btn" href="#"><i className="lnr lnr lnr-heart" /></a> */}
                                        <button className='primary-btn' style={{'border':'none'}}
                                            onClick={() => addToCart(productID)}>Add to Cart</button>
                                            <ToastContainer position='top-right'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*================End Single Product Area =================*/}
                {/*================Product Description Area =================*/}
                <section className="product_description_area">
                    <div className="container">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                {/* <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Description</a> */}
                                <NavLink className="nav-link" id="home-tab" data-toggle="tab" to="#home" role="tab" aria-controls="home" aria-selected="true">Description</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Specification</a>
                            </li> */}
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <p>Beryl Cook is one of Britain’s most talented and amusing artists .Beryl’s pictures feature women of all shapes
                                    and sizes enjoying themselves .Born between the two world wars, Beryl Cook eventually left Kendrick School in
                                    Reading at the age of 15, where she went to secretarial school and then into an insurance office. After moving to
                                    London and then Hampton, she eventually married her next door neighbour from Reading, John Cook. He was an
                                    officer in the Merchant Navy and after he left the sea in 1956, they bought a pub for a year before John took a
                                    job in Southern Rhodesia with a motor company. Beryl bought their young son a box of watercolours, and when
                                    showing him how to use it, she decided that she herself quite enjoyed painting. John subsequently bought her a
                                    child’s painting set for her birthday and it was with this that she produced her first significant work, a
                                    half-length portrait of a dark-skinned lady with a vacant expression and large drooping breasts. It was aptly
                                    named ‘Hangover’ by Beryl’s husband and</p>
                                <p>It is often frustrating to attempt to plan meals that are designed for one. Despite this fact, we are seeing
                                    more and more recipe books and Internet websites that are dedicated to the act of cooking for one. Divorce and
                                    the death of spouses or grown children leaving for college are all reasons that someone accustomed to cooking for
                                    more than one would suddenly need to learn how to adjust all the cooking practices utilized before into a
                                    streamlined plan of cooking that is more efficient for one person creating less</p>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            {/* <li className="nav-item">
                                <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Description</a>
                                <NavLink className="nav-link" id="home-tab" data-toggle="tab" to="#home" role="tab" aria-controls="home" aria-selected="true">Description</NavLink>
                            </li> */}
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Specification</a>
                            </li>
                        </ul>
                        <div className="" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5>Width</h5>
                                            </td>
                                            <td>
                                                <h5>128mm</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5>Height</h5>
                                            </td>
                                            <td>
                                                <h5>508mm</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5>Depth</h5>
                                            </td>
                                            <td>
                                                <h5>85mm</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5>Weight</h5>
                                            </td>
                                            <td>
                                                <h5>52gm</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5>Quality checking</h5>
                                            </td>
                                            <td>
                                                <h5>yes</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5>Freshness Duration</h5>
                                            </td>
                                            <td>
                                                <h5>03days</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5>When packeting</h5>
                                            </td>
                                            <td>
                                                <h5>Without touch of hand</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5>Each Box contains</h5>
                                            </td>
                                            <td>
                                                <h5>60pcs</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <RelatedProducted />
        </div>
    )
}

export default Single_Product
