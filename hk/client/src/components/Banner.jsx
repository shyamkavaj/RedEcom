import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import banner_img from '../img/banner/banner-bg.jpg';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import banner_img1 from '../img/banner/banner-img.png';
import banner_img2 from '../img/banner/banner-img-2.png';
import banner_img3 from '../img/banner/banner-img-3.png';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';



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


    const { products } = useSelector(state => state.product)
    const Result = products.filter((item) => { return item.place == "Main carousel" })
    // console.log("Banner Product", products)
    // console.log("Banner Result", Result)


    return (
        <div>
            <div>
                {/* start banner Area */}
                {/* {
                    Result && Result.map((item) => {
                        return (
                            <> */}
                <section section className="banner-area" >
                    <div className="container">
                        <div className="row fullscreen align-items-center justify-content-start"
                            style={{
                                height: fullscreenHeight
                            }}>

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
                                    {
                                        Result && Result.map((item, index) => {
                                            return (
                                                <div className="row single-slide align-items-center d-flex">
                                                    <div className="col-lg-5 col-md-6">
                                                        <div className="banner-content">
                                                            <h1>{item.name}<br />Collection!</h1>
                                                            <p>{item.description}</p>
                                                            <div className="add-bag d-flex align-items-center">
                                                                <NavLink className="add-btn" to='/procategory'><span className="lnr lnr-cross" /></NavLink>
                                                                <span className="add-text text-uppercase">View More</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-7">
                                                        <div className="banner-img">
                                                            <img className="img-fluid" src={process.env.REACT_APP_IMG_URL + item?.image[0]} alt={item.image[0]} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section>
                {/* </>
                        )
                    })
                } */}
            </div>
            {/* End banner Area */}
        </div>
    )
}

export default Banner_Feature
