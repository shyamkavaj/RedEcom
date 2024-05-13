import React, { useEffect, useState } from 'react';
import { NavLink, json, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, getProductById } from '../RTK/Slice/productSlice';
import { useNavigate } from "react-router-dom";

const Card = () => {

    const navigate = useNavigate();
    const [Quantity, setQuantity] = useState(1);
    const dispatch = useDispatch()

    // var result;
    // useEffect(()=>{
    //     console.log("card catd  ")
    //     dispatch(getAllProduct())
    //     // result = data?.map((p) => {
    //     //     return products?.find((product) => p?.product_id == product.id)
    //     // })
    // },[dispatch])
    // variable
    var Total = 0;
    var TotalItem = 0;


    var data = JSON.parse(sessionStorage.getItem('cart'))
    if (data == null) {
        alert("Now! Cart is empty")
        navigate('/')
    }


    // console.log('data is ', data)
    const { products } = useSelector(state => state.product)
    // console.log('product ssss ', products)
    // const result = products?.filter((p) => {
    //     return data.includes(p?.id)
    // })

    var result = data?.map((p) => {
        return products?.find((product) => p?.product_id == product.id)
    })
    // console.log("result ", result)
    const handleIncrement = (id) => {
        const d = sessionStorage.getItem('cart')
        const again_data = JSON.parse(d);
        const item = again_data?.find((product) => product.product_id === id)
        if (item.Qnty < 10) {
            item.Qnty = item.Qnty + 1;
            setQuantity(item.Qnty)
            sessionStorage.setItem("cart", JSON.stringify(again_data))
        }
    }

    const handleDecrement = (id) => {
        const d = sessionStorage.getItem('cart')
        const again_data = JSON.parse(d);
        const item = again_data?.find((product) => product.product_id === id)
        if (item.Qnty >= 2) {
            item.Qnty = item.Qnty - 1;
            setQuantity(item.Qnty)
            sessionStorage.setItem("cart", JSON.stringify(again_data))
        } else {
            sessionStorage.setItem("cart", JSON.stringify(again_data?.filter((product) => product.product_id !== id)))
            if (sessionStorage.getItem('TotalQnty') == 1) {
                sessionStorage.clear('TotalQnty')
            }
            navigate("/cart")
        }
    }


    return (
        <div>
            <section className="banner-area organic-breadcrumb">
                <div className="container">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Shopping Cart</h1>
                            <nav className="d-flex align-items-center">
                                {/* <a href="index.html">Home<span className="lnr lnr-arrow-right" /></a> */}
                                <NavLink className='nav-link' to={'/'}>Home</NavLink>
                                <div className='text-light lnr lnr-arrow-right'></div>
                                <NavLink className='nav-link' to={'/cart'}>Cart</NavLink>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className="cart_area">
                <div className="container">
                    <div className="cart_inner">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result && result?.map((product, index) => {
                                        {/* console.log("pro ", product) */}
                                        {/* const products = JSON.parse(sessionStorage.getItem("cart")) */ }
                                        {/* console.log('products is is ',products) */ }
                                        const item = data?.find((pro) => pro.product_id == product?.id)
                                        {/* console.log('item is is ===========', item) */}
                                        {/* Total = Total + product.price; */ }

                                        Total = Total + item?.Qnty * product?.price
                                        TotalItem = TotalItem + item?.Qnty
                                        {/* console.log("555555",TotalItem) */ }
                                        sessionStorage.setItem('TotalQnty', `${TotalItem}`);

                                        return (
                                            <tr>
                                                <td>
                                                    <div className="media">
                                                        <div className="d-flex">
                                                            <img
                                                                src={process.env.REACT_APP_IMG_URL + product?.image[0]}
                                                                alt={product?.name}
                                                                width={50}
                                                                height={50}
                                                            />
                                                        </div>
                                                        <div className="media-body">
                                                            <p>{product?.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5>₹{product?.price}</h5>
                                                </td>
                                                <td>
                                                    <div className="product_count">
                                                        <input type="text" name="qty" id="sst"
                                                            title="Quantity" className="input-text qty"
                                                            value={item?.Qnty}
                                                        />
                                                        {/* <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;" className="increase items-count" type="button"><i className="lnr lnr-chevron-up" /></button> */}
                                                        {/* <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) && sst > 0 ) result.value--;return false;" className="reduced items-count" type="button"><i className="lnr lnr-chevron-down" /></button> */}
                                                        <button
                                                            onClick={() => {
                                                                handleIncrement(product?.id)
                                                            }}
                                                            className="increase items-count" type="button"><i className="lnr lnr-chevron-up fa fa-plus" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                handleDecrement(product?.id)
                                                            }}
                                                            className="reduced items-count" type="button"><i className="lnr lnr-chevron-down fa fa-minus " />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5>₹<span className='ml-1'>{product?.price * item?.Qnty}</span></h5>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    <tr tr className="bottom_button" >
                                        <td>
                                            {/* <a className="gray_btn" href="#">Update Cart</a> */}
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                            <h5><b>Total</b></h5>
                                        </td>
                                        <td>
                                            <h5><b>₹<span className='ml-1'>{Total}</span></b></h5>
                                        </td>
                                    </tr>
                                    <tr>

                                    </tr>
                                    
                                    <tr className="out_button_area">
                                        <td>
                                        </td>
                                        {/* <td>
                                        </td>
                                        <td>
                                        </td> */}
                                        <td colSpan={3}>
                                            <div className="checkout_btn_inner d-flex align-items-center">
                                                <NavLink to='/procategory' className="gray_btn">Continue Shopping</NavLink>
                                                <NavLink to='/checkout' className="primary-btn">Proceed to checkout</NavLink>
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Card;
