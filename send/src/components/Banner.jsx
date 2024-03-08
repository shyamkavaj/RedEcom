import React, { useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import banner_img from '../img/banner/banner-bg.jpg';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import banner_img1 from '../img/banner/banner-img.png';
import banner_img2 from '../img/banner/banner-img-2.png';
import banner_img3 from '../img/banner/banner-img-3.png';
import prev from '../img/banner/prev.png'
import next from '../img/banner/next.png'
import { useEffect } from 'react';


const Banner_Feature = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [fullscreenHeight, setFullscreenHeight] = useState(0);
    const [fitscreenHeight, setFitscreenHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const headerElement = document.querySelector('.default-header');
        if (headerElement) {
            setHeaderHeight(headerElement.clientHeight);
        }
    }, []);

    useEffect(() => {
        setFullscreenHeight(windowHeight);
        setFitscreenHeight(windowHeight - headerHeight);
    }, [windowHeight, headerHeight]);

    return (
        <div>
            <div>
                {/* start banner Area */}
                <section className="banner-area">
                    <div className="container">
                        <div className="row fullscreen align-items-center justify-content-start"  style={{ height: fullscreenHeight }}>
                            <div className="col-lg-12">
                                <OwlCarousel
                                    className="owl-theme"
                                    items={1}
                                    autoplay={true}
                                    autoplayTimeout={5000}
                                    loop={true}
                                    nav={true}
                                    navText={false}
                                    // navText={["<img src='img/banner/prev.png'>", "<img src='img/banner/next.png'>"]}
                                    dots={true}
                                >
                                    <div className="row single-slide align-items-center d-flex">
                                        <div className="col-lg-5 col-md-6">
                                            <div className="banner-content">
                                                <h1>Nike New <br />Collection!</h1>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                                <div className="add-bag d-flex align-items-center">
                                                    <a className="add-btn" href><span className="lnr lnr-cross" /></a>
                                                    <span className="add-text text-uppercase">Add to Bag</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-7">
                                            <div className="banner-img">
                                                <img className="img-fluid" src={banner_img1} alt="Banner-image" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row single-slide align-items-center d-flex">
                                        <div className="col-lg-5 col-md-6">
                                            <div className="banner-content">
                                                <h1>Puma New <br />Collection!</h1>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                                <div className="add-bag d-flex align-items-center">
                                                    <a className="add-btn" href><span className="lnr lnr-cross" /></a>
                                                    <span className="add-text text-uppercase">Add to Bag</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-7">
                                            <div className="banner-img">
                                                <img className="img-fluid" src={banner_img2} alt="Banner-image" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row single-slide align-items-center d-flex">
                                        <div className="col-lg-5 col-md-6">
                                            <div className="banner-content">
                                                <h1>Campus New <br />Collection!</h1>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                                <div className="add-bag d-flex align-items-center">
                                                    <a className="add-btn" href><span className="lnr lnr-cross" /></a>
                                                    <span className="add-text text-uppercase">Add to Bag</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-7">
                                            <div className="banner-img">
                                                <img className="img-fluid" src={banner_img3} alt="Banner-image" />
                                            </div>
                                        </div>
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End banner Area */}
            </div>

        </div>
    )
}

export default Banner_Feature
