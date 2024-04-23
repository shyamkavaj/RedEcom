import React, { useEffect, useState } from 'react'
import '../assets/Allcss'
import card from '../img/product/card.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { jwtDecode } from 'jwt-decode'
import { addOrder } from '../RTK/Slice/orderSlice'
import RenderRazorpay from './RenderRazorpay'
import axios from 'axios'
import logo from '../img/cart.jpg'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const CheckOut = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    var Total = 0;
    var TotalItem = 0;

    var data = sessionStorage.getItem('cart')

    const { products } = useSelector(state => state.product)

    var result = products?.filter((p) => {
        return data.includes(p?.id)
    })
    const token = localStorage.getItem("token");
    const Tokendata = jwtDecode(token);
    const { status } = useSelector(state => state.order)
    // const [orderDetails, setOrderDetails] = useState({
    //     orderId: null,
    //     currency: null,
    //     amount: null,
    // });
    useEffect(() => {
        if (status == 1) {
            sessionStorage.removeItem('cart');
            sessionStorage.removeItem('TotalQnty');
            navigate('/conformation')
        }
    }, [status])

    const initialValues = {
        name: Tokendata.firstName,
        email: Tokendata.email,
        address: '',
        city: '',
        pincode: '',
        phone: '',
        products: [],
        quantity: '',
        total: ''
    }
    const validationErrorStrc = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        pincode: Yup.string().min(6).max(6).required('Pincode is required'),
        phone: Yup.string().min(10).max(10).required('Phone is required')
    });
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    async function displayRazorpay(newValues) {
        console.log("new value ", newValues)
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("http://localhost:5001/addorder", newValues);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        console.log("value of result is ", result.data)
        const { amount, id, currency } = result.data;
        console.log("order amount ",amount,"id is ",id,"currency item ",currency)
        const options = {
            key:process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Karma",
            description: "Test Transaction",
            image: { logo },
            order_id: id,
            handler: async function (response) {
                console.log('data for success ',response)
                const data = {
                    orderCreationId: id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    data:newValues
                };
                console.log("data sent for success ",data);
                const result = await axios.post("http://localhost:5001/success", data);

                alert(result.data.msg);
                sessionStorage.removeItem('TotalQnty')
                sessionStorage.removeItem('cart')
                navigate('/')
            },
            prefill: {
                name: "Redsparks",
                email: "shyamkava783@gmail.com",
                contact: "8200699375",
            },
            notes: {
                address: "Vadodara Gujrat",
            },
            theme: {
                color: "#ffba00",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: validationErrorStrc,
        onSubmit: async (values) => {
            // console.log("values are ", values)
            const newValues = {
                ...values,
                products: data,
                quantity: sessionStorage.getItem('TotalQnty'),
                total: Total
            }
            displayRazorpay(newValues)
            resetForm()
        }
    })


    return (
        <>

            <div>
                <section className="banner-area organic-breadcrumb">
                    <div className="container">
                        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                            <div className="col-first">
                                <h1>Checkout</h1>
                                <nav className="d-flex align-items-center">
                                    <a href="index.html">Home<span className="lnr lnr-arrow-right" /></a>
                                    <a href="single-product.html">Checkout</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="checkout_area section_gap">
                    <div className="container">
                        <div className="billing_details">
                            <div className="row">
                                <form className="row contact_form">
                                    <div className="col-md-6 form-group p_star">
                                        <input type="text" className="form-control" required id="first" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} placeholder='First name' />
                                        {errors.name && touched.name && <p className='text-danger form-error'>{errors.name}</p>}
                                    </div>

                                    <div className="col-md-6 form-group p_star">
                                        <input type="text" className="form-control" required id="email" name="email" onChange={handleChange} onBlur={handleBlur} disabled value={values.email} placeholder='Email Address' />
                                    </div>
                                    <div className="col-md-4 form-group p_star">
                                        <input type="text" className="form-control" id="country" name="country" value={'India'} placeholder='Country' disabled />
                                    </div>
                                    <div className="col-md-8 form-group p_star">
                                        <input type="text" className="form-control" required id="add1" name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} placeholder='Address line' />
                                        {errors.address && touched.address && <p className='text-danger form-error'>{errors.address}</p>}
                                    </div>
                                    <div className="col-md-4 form-group p_star">
                                        <input type="text" className="form-control" required id="city" name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} placeholder='Enter City Name' />
                                        {errors.city && touched.city &&
                                            <p className='text-danger form-error'>{errors.city}</p>
                                        }

                                    </div>
                                    <div className="col-md-4 form-group">
                                        <input type="number" className="form-control" id="zip" required name="pincode" value={values.pincode} onChange={handleChange} onBlur={handleBlur} placeholder="Pincode" />
                                        {errors.pincode && touched.pincode && <p className='text-danger form-error'>{errors.pincode}</p>}
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <input type="number" className="form-control" id="phone" required name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} placeholder="Phone" />
                                        {errors.phone && touched.phone && <p className='text-danger form-error'>{errors.phone}</p>}
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="order_box">
                                            <h2>Your Order</h2>
                                            <div>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th style={{ 'border-bottom': '1px solid #9f9f9f', 'padding': '5px' }} className='col-1 center'>Index</th>
                                                            <th style={{ 'border-bottom': '1px solid #9f9f9f', 'padding': '5px' }} className='col-8 center'>Product</th>
                                                            <th style={{ 'border-bottom': '1px solid #9f9f9f', 'padding': '5px' }} className='col-1 center'>Quantity</th>
                                                            <th style={{ 'border-bottom': '1px solid #9f9f9f', 'padding': '5px' }} className='col-2 center'>Totals</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {result?.map((product, index) => {

                                                            const productsCart = JSON.parse(sessionStorage.getItem("cart"))
                                                            const item = productsCart.filter((pro) => pro.product_id === product.id)

                                                            Total = Total + item[0].Qnty * product.price
                                                            TotalItem = TotalItem + item[0].Qnty
                                                            return (
                                                                <tr style={{ 'margin-bottom': '5px' }}>
                                                                    <td style={{ 'padding': '8px' }} className='col-1 center'>{index + 1}</td>
                                                                    <td style={{ 'padding': '8px' }} className='col-8 center'>{product.name}</td>
                                                                    <td style={{ 'padding': '8px' }} className='col-1 center'>{item[0].Qnty}</td>
                                                                    <td style={{ 'padding': '8px' }} className='col-2 center'>₹<span className='ml-1'>{product.price * item[0].Qnty}</span></td>
                                                                </tr>
                                                            )
                                                        })}

                                                    </tbody>
                                                    <tfoot>
                                                        <th style={{ 'border-bottom': '1px solid #9f9f9f', 'border-top': '1px solid #9f9f9f', 'padding': '5px' }} className='col-1 center'></th>
                                                        <th style={{ 'border-bottom': '1px solid #9f9f9f', 'border-top': '1px solid #9f9f9f', 'padding': '5px' }} className='col-2 center'><b>Total</b></th>
                                                        <th style={{ 'border-bottom': '1px solid #9f9f9f', 'border-top': '1px solid #9f9f9f', 'padding': '5px' }} className='col-6 center'><b>{TotalItem}</b></th>
                                                        <th style={{ 'border-bottom': '1px solid #9f9f9f', 'border-top': '1px solid #9f9f9f', 'padding': '5px' }} className='col-4 center'><b>₹<span className='ml-1'>{Total}</span></b></th>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            <div className="payment_item active">
                                                <div className="radion_btn">
                                                    <input type="radio" id="f-option6" name="selector" />
                                                    <label htmlFor="f-option6">Payment</label>
                                                    <img src={card} alt />
                                                    <div className="check" />
                                                </div>
                                                <p>Pay via UPI: you can pay with any UPI Id.</p>
                                            </div>
                                            <div className="creat_account">
                                                <input type="checkbox" id="f-option4" name="selector" />
                                                <label htmlFor="f-option4">I’ve read and accept the </label>
                                                <a>terms &amp; conditions*</a>
                                            </div>
                                            <button type='submit' onClick={handleSubmit} className="primary-btn">Proceed to Payment</button>
                                            {/* <ToastContainer position='top-right'/> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            {/* {console.log("dis ", displayRazorpay)}
            {displayRazorpay && (
                <RenderRazorpay
                    amount={orderDetails.amount}
                    currency={orderDetails.currency}
                    orderId={orderDetails.orderId}
                    keyId={process.env.RAZORPAY_KEY_ID}
                    keySecret={process.env.RAZORPAY_SECRET}
                />
            )} */}
        </>
    )
}

export default CheckOut
