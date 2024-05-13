import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// import p1 from '../img/product/p1.jpg'
// import p2 from '../img/product/p2.jpg'
// import p3 from '../img/product/p3.jpg'
// import p4 from '../img/product/p4.jpg'
// import p5 from '../img/product/p5.jpg'
// import p6 from '../img/product/p6.jpg'
// import p7 from '../img/product/p7.jpg'
// import p8 from '../img/product/p8.jpg'
import { getAllProduct } from '../RTK/Slice/productSlice';
import { NavLink } from 'react-router-dom';
// import { addToCart } from './SingleProduct';
// import prev from '../img/banner/prev.png'
// import next from '../img/banner/next.png'

const Product = () => {

    const dispatch = useDispatch();
    // const data = sessionStorage.getItem('sspp');
    // console.log("session data in product ------------------------ ",data);

    useEffect(() => {
        dispatch(getAllProduct())
        // result = data?.map((p) => {
        //     return products?.find((product) => p?.product_id == product.id)
        // })
    }, [dispatch])

    const { products } = useSelector(state => state.product)
    const Result = products.filter((item) => { return item.place == "Regular" })
    // console.log("Result", Result);
    // console.log("this front end product st", st);
    // console.log("path ", process.env.REACT_APP_IMG_URL)

    // useEffect(() => {

    //     const products = st.products;
    // },[st])
    // console.log("THIS IS RODUCT IMAGE", process.env.REACT_APP_PRO_IMG)
    // console.log("PATH ",process.env.REACT_APP_PRO_IMG + )

    return (
        <div>
            {/* owl-carousel active-product-area section_gap */}
            <section className="active-product-area section_gap">
                {/* <OwlCarousel
                    className="owl-theme"
                    items={1}
                    autoplay={true}
                    autoplayTimeout={50000}
                    loop={true}
                    nav={true}
                    navText={false}
                    // navText={[<img src={prev} alt="Previous" />, <img src={next} alt="Next" />]}
                    dots={true}
                > */}
                {/* products.map((product)) */}
                {/* single product slide */}
                <div className="single-product-slider">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <div className="section-title">
                                    <h1>Latest Products</h1>
                                    <p>Experience the cutting-edge with our Latest Product, designed to seamlessly integrate into your daily life and elevate your experiences. Whether you're at home, in the office, or on the go, the Latest Product is your ultimate solution, combining state-of-the-art technology with unrivaled ease of use.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {/* single product */}
                            {Result && Result.map((product, index) => {
                                {/* console.log("id",product.id) */ }
                                return (
                                    <div key={index} className="col-lg-3 col-md-6">
                                        <div className="single-product">
                                            {/* <img className="img-fluid" src={process.env.REACT_APP_IMG_URL + product?.image[0]} alt={product?.name} /> */}
                                            <NavLink to={`/productdetails/${product.id}`}>
                                                <img
                                                    className="img-fluid"
                                                    src={process.env.REACT_APP_IMG_URL + product?.image[0]}
                                                    alt={product?.name}
                                                    style={{
                                                        'width': '270px',
                                                        'height': '300px',
                                                        'object-fit':'cover'
                                                    }}
                                                />
                                            </NavLink>
                                            <NavLink to={`/productdetails/${product.id}`}>
                                                <div className="product-details">
                                                    <h6>{product?.name}</h6>
                                                    <div className="price">
                                                        <h6>₹{product?.price}</h6>
                                                        <h6 className="l-through">₹{product?.price + 50}</h6>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <div className="product-details">
                                                <div className="prd-bottom">
                                                    <NavLink to={`/productdetails/${product.id}`} className="social-info">
                                                        <span className="ti-bag" />
                                                        <p className="hover-text">add to bag</p>
                                                    </NavLink>
                                                    <NavLink to={`/productdetails/${product.id}`} className="social-info">
                                                        <span className="lnr lnr-move" />
                                                        <p className="hover-text">view more</p>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
                {/* single product slide */}
                {/* <div className="single-product-slider">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 text-center">
                                    <div className="section-title">
                                        <h1>Coming Products</h1>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore
                                            magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {products?.map((product, index) => {
                                    return (
                                        <div key={index} className="col-lg-3 col-md-6">
                                            <div className="single-product">
                                                <NavLink className="nav-link" to={'/productdetails'}>
                                                    <img
                                                        className="img-fluid"
                                                        src={process.env.REACT_APP_IMG_URL + product?.image[0]}
                                                        alt={product?.name}
                                                    />
                                                </NavLink>
                                                <div className="product-details">
                                                    <h6>{product?.name}</h6>
                                                    <div className="price">
                                                        <h6>₹{product?.price}</h6>
                                                        <h6 className="l-through">₹{product?.price}</h6>
                                                    </div>
                                                    <div className="prd-bottom">
                                                        <a href className="social-info">
                                                            <span className="ti-bag" />
                                                            <p className="hover-text"
                                                            >add to bag</p>
                                                        </a>
                                                        <a href className="social-info">
                                                            <span className="lnr lnr-move" />
                                                            <p className="hover-text">view more</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div> */}
                {/* </OwlCarousel> */}
            </section>

        </div>
    )
}

export default Product
