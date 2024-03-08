import React from 'react'

import i1 from '../img/i1.jpg';
import i2 from '../img/i2.jpg';
import i3 from '../img/i3.jpg';
import i4 from '../img/i4.jpg';
import i5 from '../img/i5.jpg';
import i6 from '../img/i6.jpg';
import i7 from '../img/i7.jpg';
import i8 from '../img/i8.jpg';


const Footer = () => {
    return (
        <div>
            <footer className="footer-area section_gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3  col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h6>About Us</h6>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore dolore
                                    magna aliqua.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4  col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h6>Newsletter</h6>
                                <p>Stay update with our latest</p>
                                <div className id="mc_embed_signup">
                                    <form target="_blank" noValidate="true" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01" method="get" className="form-inline">
                                        <div className="d-flex flex-row">
                                            <input className="form-control" name="EMAIL" placeholder="Enter Email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Email '" required type="email" />
                                            <button className="click-btn btn btn-default"><i className="fa fa-long-arrow-right" aria-hidden="true" /></button>
                                            <div style={{ position: 'absolute', left: '-5000px' }}>
                                                <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabIndex={-1} defaultValue type="text" />
                                            </div>
                                            {/* <div class="col-lg-4 col-md-4">
												<button class="bb-btn btn"><span class="lnr lnr-arrow-right"></span></button>
											</div>  */}
                                        </div>
                                        <div className="info" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3  col-md-6 col-sm-6">
                            <div className="single-footer-widget mail-chimp">
                                <h6 className="mb-20">Instragram Feed</h6>
                                <ul className="instafeed d-flex flex-wrap">
                                    <li><img src={i1} alt /></li>
                                    <li><img src={i2} alt /></li>
                                    <li><img src={i3} alt /></li>
                                    <li><img src={i4} alt /></li>
                                    <li><img src={i5} alt /></li>
                                    <li><img src={i6} alt /></li>
                                    <li><img src={i7} alt /></li>
                                    <li><img src={i8} alt /></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h6>Follow Us</h6>
                                <p>Let us be social</p>
                                <div className="footer-social d-flex align-items-center">
                                    <a href="#"><i className="fa fa-facebook" /></a>
                                    <a href="#"><i className="fa fa-twitter" /></a>
                                    <a href="#"><i className="fa fa-dribbble" /></a>
                                    <a href="#"><i className="fa fa-behance" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
                        <p className="footer-text m-0">
                            Copyright © All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="https://redsparkinfo.com/" target="_blank">Redspark Technologies</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
