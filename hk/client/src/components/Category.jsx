import React from 'react'

import cimage1 from '../img/category/c1.jpg';
import cimage2 from '../img/category/c2.jpg';
import cimage3 from '../img/category/c3.jpg';
import cimage4 from '../img/category/c4.jpg';
import cimage5 from '../img/category/c5.jpg';
import { NavLink } from 'react-router-dom';

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
                                        <NavLink to='procategory' className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Sneaker for Sports</h6>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="single-deal">
                                        <div className="overlay" />
                                        <img className="img-fluid w-100" src={cimage2} alt />
                                        <NavLink to='procategory' className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Sneaker for Sports</h6>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="single-deal">
                                        <div className="overlay" />
                                        <img className="img-fluid w-100" src={cimage3} alt />
                                        <NavLink to='procategory' className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Product for Couple</h6>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-8">
                                    <div className="single-deal">
                                        <div className="overlay" />
                                        <img className="img-fluid w-100" src={cimage4} alt />
                                        <NavLink to='procategory' className="img-pop-up" target="_blank">
                                            <div className="deal-details">
                                                <h6 className="deal-title">Sneaker for Sports</h6>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-deal">
                                <div className="overlay" />
                                <img className="img-fluid w-100" src={cimage5} alt />
                                <NavLink to='procategory' className="img-pop-up" target="_blank">
                                    <div className="deal-details">
                                        <h6 className="deal-title">Sneaker for Sports</h6>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Category
