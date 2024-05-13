import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import productImage from '../img/product/e-p1.png'
import prev from '../img/banner/prev.png'
import next from '../img/banner/next.png'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

const ExclusiveDeal = () => {


    const { products } = useSelector(state => state.product)
    const Result = products.filter((item) => { return item.place == "Hot deal" })
    // console.log("Exclusive Result", Result)
    // console.log("Excusive Product", products)

    return (
        <div>
            <section className="exclusive-deal-area">
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-6 no-padding exclusive-left">
                            <div className="row clock_sec clockdiv" id="clockdiv">
                                <div className="col-lg-12">
                                    <h1>Exclusive Hot Deal Ends Soon!</h1>
                                    <p>Who are in extremely love with eco friendly system.</p>
                                </div>
                            </div>
                            <NavLink to="/shopcategory" className="primary-btn">Shop Now</NavLink>
                        </div>
                        <div className="col-lg-6 no-padding exclusive-right">
                            {
                                Result && Result.map((item) => {
                                    return (

                                        <div className="active-exclusive-product-slider">
                                            <OwlCarousel
                                                className="owl-theme"
                                                items={1}
                                                autoplay={true}
                                                autoplayTimeout={1000}
                                                loop={true}
                                                nav={true}
                                                navText={false}
                                                dots={true}
                                            >
                                                <div className="single-exclusive-slider">
                                                    <img className="img-fluid" src={process.env.REACT_APP_IMG_URL + item?.image[0]} alt />
                                                    <div className="product-details">
                                                        <div className="price">
                                                            <h6>₹ {item.price}</h6>
                                                            <h6 className="l-through">₹ {item.price + 50}</h6>
                                                        </div>
                                                        <h4>addidas New Hammer sole
                                                            for Sports person</h4>
                                                        <div className="add-bag d-flex align-items-center justify-content-center">
                                                            <NavLink to={`/productdetails/${item.id}`} className="add-btn"><span className="lnr lnr-move" /></NavLink>
                                                            <span className="add-text text-uppercase">view more</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </OwlCarousel>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ExclusiveDeal
