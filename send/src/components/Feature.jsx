import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import banner_img from '../img/banner/banner-bg.jpg';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import icon1 from '../img/features/f-icon1.png';
import icon2 from '../img/features/f-icon2.png';
import icon3 from '../img/features/f-icon3.png';
import icon4 from '../img/features/f-icon4.png';


const Banner_Feature = () => {
    return (
        <div>
            <div>
                <section className="features-area section_gap">
                    <div className="container">
                        <div className="row features-inner">
                            {/* single features */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src={icon1} alt="image" />
                                    </div>
                                    <h6>Free Delivery</h6>
                                    <p>Free Shipping on all order</p>
                                </div>
                            </div>
                            {/* single features */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src={icon2} alt />
                                    </div>
                                    <h6>Return Policy</h6>
                                    <p>Free Shipping on all order</p>
                                </div>
                            </div>
                            {/* single features */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src={icon3} alt />
                                    </div>
                                    <h6>24/7 Support</h6>
                                    <p>Free Shipping on all order</p>
                                </div>
                            </div>
                            {/* single features */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src={icon4} alt />
                                    </div>
                                    <h6>Secure Payment</h6>
                                    <p>Free Shipping on all order</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default Banner_Feature
