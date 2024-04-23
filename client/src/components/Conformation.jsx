import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getAllOrder } from '../RTK/Slice/orderSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';


const Conformation = () => {
    window.onload = function () {
        window.location = "/allorder";
    }
    // const dispatch = useDispatch();

    const { order } = useSelector(state => state.order);
    const { products } = useSelector(state => state.product)

    // console.log("--------------")
    // console.log("===================", JSON.parse(order.products));

    useEffect(() => {
        toast.success("Thank you. Your order has been received Successfully!")
    }, [])
    // console.log("get order ", order)
    const data = JSON.parse(order.products)
    // console.log("data ", data)
    var result = data.map((p) => {
        return products?.find((product) => p?.product_id == product.id)
    })
    // console.log("+++++++++++", result)
    // var total;
    const handlePrint = () => {
        window.print()
    }
    return (
        <div>
            <section className="banner-area organic-breadcrumb">
                <div className="container">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Confirmation</h1>
                            <nav className="d-flex align-items-center">
                                <a href="index.html">Home<span className="lnr lnr-arrow-right" /></a>
                                <a href="category.html">Confirmation</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className="order_details section_gap">
                <div className="container">
                    <h3 className="title_confirmation">Thank you. Your order has been received.</h3>
                    <div className="row order_d_inner">
                        <div className="col-lg-6">
                            <div className="details_item">
                                <h4>Order Info</h4>
                                <ul className="list">
                                    <li><span>Order number</span> : {order.id}</li>
                                    <li><span>Date</span> : {order.updatedAt}</li>
                                    <li><span>Total(₹)</span> : {order.total}</li>
                                    <li><span>Payment method</span> : Cash on Delivery</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="details_item">
                                <h4>Billing Address</h4>
                                <ul className="list">
                                    <li><span>City</span> : {order.city}</li>
                                    <li><span>Address</span> : {order.address}</li>
                                    <li><span>Country</span> : India</li>
                                    <li><span>Pincode </span> : {order.pincode}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* {orders && orders.map((order, index) => {
                        return (
                            <div key={index}>

                            </div>
                        )
                    })} */
                        <div className="order_details_table">
                            <h2>Order Details</h2>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            result.map((product) => {
                                                const product_qnt = data.filter((q) => q.product_id == product.id)
                                                console.log("pro pro ", product_qnt)

                                                return (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <p>{product.name}</p>
                                                            </td>
                                                            <td>
                                                                <h5>x {product_qnt[0].Qnty}</h5>
                                                            </td>
                                                            <td>
                                                                <p>₹ {product.price * product_qnt[0].Qnty}</p>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <tr>
                                            <td>
                                                <h4>Total</h4>
                                            </td>
                                            <td>
                                                <h5 />
                                            </td>
                                            <td>
                                                <p>₹ {order.total}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
                <div className="checkout_btn_inner d-flex align-items-center mt-4" style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                    <NavLink style={{ 'border': 'none' }} className="primary-btn" onClick={handlePrint}>Print Reciept</NavLink>
                    <NavLink to='/procategory' className="gray_btn">Go to Home</NavLink>
                    {/* <NavLink className="primary-btn">Print Receipt</NavLink> */}
                    <NavLink to='/' className='primary-btn' style={{ 'border': 'none' }}
                    >Continue Shoping</NavLink>
                </div>
            </section>
            <ToastContainer position='top-right' />
        </div>
    )
}

export default Conformation
