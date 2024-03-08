import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import p1 from '../img/product/p1.jpg'
import p2 from '../img/product/p2.jpg'
import p3 from '../img/product/p3.jpg'
import p4 from '../img/product/p4.jpg'
import p5 from '../img/product/p5.jpg'
import p6 from '../img/product/p6.jpg'
import p7 from '../img/product/p7.jpg'
import p8 from '../img/product/p8.jpg'
import prev from '../img/banner/prev.png'
import next from '../img/banner/next.png'

const Product = () => {
    return (
        <div>
            {/* owl-carousel active-product-area section_gap */}
            <section className="active-product-area section_gap">
                <OwlCarousel
                    className="owl-theme"
                    items={1}
                    autoplay={true}
                    autoplayTimeout={5000}
                    loop={true}
                    nav={true}
                    navText={false}
                    // navText={[<img src={prev} alt="Previous" />, <img src={next} alt="Next" />]}
                    dots={true}
                >
                    {/* single product slide */}
                    <div className="single-product-slider">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 text-center">
                                    <div className="section-title">
                                        <h1>Latest Products</h1>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore
                                            magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p1} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p2} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p3} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p4} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p5} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p6} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p7} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p8} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* single product slide */}
                    <div className="single-product-slider">
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
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p6} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p8} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p3} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p5} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p1} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p4} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p1} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single product */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="single-product">
                                        <img className="img-fluid" src={p8} alt />
                                        <div className="product-details">
                                            <h6>addidas New Hammer sole
                                                for Sports person</h6>
                                            <div className="price">
                                                <h6>$150.00</h6>
                                                <h6 className="l-through">$210.00</h6>
                                            </div>
                                            <div className="prd-bottom">
                                                <a href className="social-info">
                                                    <span className="ti-bag" />
                                                    <p className="hover-text">add to bag</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-heart" />
                                                    <p className="hover-text">Wishlist</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-sync" />
                                                    <p className="hover-text">compare</p>
                                                </a>
                                                <a href className="social-info">
                                                    <span className="lnr lnr-move" />
                                                    <p className="hover-text">view more</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </section>

        </div>
    )
}

export default Product
