import React from 'react'
// import r1 from '../img/r1.jpg';
// import r2 from '../img/r2.jpg';
// import r3 from '../img/r3.jpg';
// import r4 from '../img/r4.jpg';
// import r5 from '../img/r5.jpg';
// import r6 from '../img/r6.jpg';
// import r7 from '../img/r7.jpg';
// import r8 from '../img/r8.jpg';
// import r9 from '../img/r9.jpg';
// import r10 from '../img/r10.jpg';
// import r11 from '../img/r11.jpg';
import c5 from '../img/category/c5.jpg'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

const RelatedProduct = () => {

    // const {product} = useSelector(state=> state.product);
    const { products } = useSelector(state => state.product)
    const Result = products.filter((item) => { return item.place == "Week deal" })
    // console.log("Realated Result", Result)
    // console.log("Related Product", products)

    // const { products } = useSelector(state => state.product)
    // const Result = products.filter((item)=>{return item.place === "Week deal"})
    // console.log("Realated Result",Result)
    // console.log("Related Product", products)

    return (
        <div>
            <section className="related-product-area section_gap_bottom">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 text-center">
                            <div className="section-title">
                                <h1>Deals of the Week</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row">
                                {
                                    Result && Result.map((item) => {
                                        return (
                                            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                                                <div className="single-related-product d-flex">
                                                    <a><img src={process.env.REACT_APP_IMG_URL + item?.image[1]} alt /></a>
                                                    <div className="desc">
                                                        <NavLink to={`/productdetails/${item.id}`} className="title">{item.name}</NavLink>
                                                        <div className="price">
                                                            <h6>₹ {item.price}</h6>
                                                            <h6 className="l-through">₹ {item.price + 50}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="ctg-right">
                                <img className="img-fluid d-block mx-auto" src={c5} alt />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default RelatedProduct
