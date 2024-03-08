import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import productImage from '../img/product/e-p1.png'
import prev from '../img/banner/prev.png'
import next from '../img/banner/next.png'

const ExclusiveDeal = () => {
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
                                {/* <div className="col-lg-12">
                                    <div className="row clock-wrap">
                                        <div className="col clockinner1 clockinner">
                                            <h1 className="days">150</h1>
                                            <span className="smalltext">Days</span>
                                        </div>
                                        <div className="col clockinner clockinner1">
                                            <h1 className="hours">23</h1>
                                            <span className="smalltext">Hours</span>
                                        </div>
                                        <div className="col clockinner clockinner1">
                                            <h1 className="minutes">47</h1>
                                            <span className="smalltext">Mins</span>
                                        </div>
                                        <div className="col clockinner clockinner1">
                                            <h1 className="seconds">59</h1>
                                            <span className="smalltext">Secs</span>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <a href className="primary-btn">Shop Now</a>
                        </div>
                        <div className="col-lg-6 no-padding exclusive-right">
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
                                        <img className="img-fluid" src={productImage} alt />
                                        <div className="product-details">
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <h4>addidas New Hammer sole
                                                for Sports person</h4>
                                            <div className="add-bag d-flex align-items-center justify-content-center">
                                                <a className="add-btn" href><span className="ti-bag" /></a>
                                                <span className="add-text text-uppercase">Add to Bag</span>
                                            </div>
                                        </div>
                                    </div>

                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ExclusiveDeal
