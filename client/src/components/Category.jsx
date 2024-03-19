import React from 'react'

import cimage1 from '../img/category/c1.jpg';
import cimage2 from '../img/category/c2.jpg';
import cimage3 from '../img/category/c3.jpg';
import cimage4 from '../img/category/c4.jpg';
import cimage5 from '../img/category/c5.jpg';

const Category = () => {
    return (
        <div>
            <section className="category-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-12">
                            <div className="row">
                                <div className="col-lg-8 col-md-8">
                                    <div className="single-deal">
                                        <div className="overlay" />
                                        <img className="img-fluid w-100" src={cimage1} alt />
                                        <a href="img/category/c1.jpg" className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Sneaker for Sports</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="single-deal">
                                        <div className="overlay" />
                                        <img className="img-fluid w-100" src={cimage2} alt />
                                        <a href="img/category/c2.jpg" className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Sneaker for Sports</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="single-deal">
                                        <div className="overlay" />
                                        <img className="img-fluid w-100" src={cimage3} alt />
                                        <a href="img/category/c3.jpg" className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Product for Couple</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-8">
                                    <div className="single-deal">
                                        <div className="overlay" />
                                        <img className="img-fluid w-100" src={cimage4} alt />
                                        <a href="img/category/c4.jpg" className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Sneaker for Sports</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-deal">
                                <div className="overlay" />
                                <img className="img-fluid w-100" src={cimage5} alt />
                                <a href="img/category/c5.jpg" className="img-pop-up" target="_blank">
                                    <div className="deal-details">
                                        <h6 className="deal-title">Sneaker for Sports</h6>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Category
