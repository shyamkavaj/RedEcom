import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Eye } from 'lucide-react';
import { getAllOrder } from '../RTK/Slice/orderSlice';
import Modal from 'react-bootstrap/Modal';
import { Button, Image } from 'react-bootstrap';

const OrderHistory = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");
    const Tokendata = jwtDecode(token);
    const { orders } = useSelector(state => state.order);
    const { products } = useSelector(state => state.product)
    const result = orders?.filter((order) => order.email == Tokendata.email)
    const [id, setId] = useState();
    const handleClick = (id) => {
        // console.log("id is ", id)
        setId(id)
        setModalShow(true);
    }
    function MyVerticallyCenteredModal(props) {
        const getOne = result?.filter((item) => item.id == id);
        // console.log("getOne",getOne)
        const temp = JSON.parse(JSON.parse(getOne[0].products))
        const fullDetail = temp.map((item) => {
            return products?.find((product) => {
                return (
                    item.product_id == product.id
                )
            });
        })
        // console.log('get full order product ',fullDetail)
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Order History
                    </Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className="order_details_table m-0" style={{ 'fontFamily': 'Poppins' }}>
                        <h2>Order History</h2>
                        <p><span style={{ 'color': '#222222' }}>Date : </span><span>{getOne[0].updatedAt.slice(0, 10)}</span></p>
                        <div className="table-responsive">
                            <table className="table"  >
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ 'color': '#222222', 'fontFamily': 'Poppins' }}
                                        >Image</th>
                                        <th scope="col" style={{ 'color': '#222222', 'fontFamily': 'Poppins' }}>Product</th>
                                        <th scope="col" style={{ 'color': '#222222', 'fontFamily': 'Poppins' }}>Quantity</th>
                                        <th scope="col" style={{ 'color': '#222222', 'fontFamily': 'Poppins' }}
                                        >Total</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        fullDetail.map((product) => {
                                            {/* console.log("product in full", product) */ }
                                            const product_qnt = temp.filter((q) => q.product_id == product.id)
                                            {/* console.log("pro pro ", product_qnt) */ }
                                            return (

                                                <>
                                                    <tr>
                                                        <td>
                                                            <Image width={70} height={70} src={process.env.REACT_APP_IMG_URL + product.image[0]} roundedCircle />
                                                        </td>
                                                        <td>
                                                            <p>{product.name}</p>
                                                        </td>
                                                        <td>
                                                            <h5>x {product_qnt[0].Qnty}</h5>
                                                        </td>
                                                        <td>
                                                            <p>₹{product.price * product_qnt[0].Qnty}</p>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td></td>
                                        <td>
                                            <h4>Total</h4>
                                        </td>
                                        <td>
                                            <p>{getOne[0].quantity}</p>
                                        </td>
                                        <td>
                                            <p>₹{getOne[0].total}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} onClick={props.onHide} >Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    return (
        <div>
            <div>
                <section className="banner-area organic-breadcrumb">
                    <div className="container">
                        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                            <div className="col-first">
                                <h1>Orders History</h1>
                                <nav className="d-flex align-items-center">
                                    {/* <a href="index.html">Home<span className="lnr lnr-arrow-right" /></a> */}
                                    <NavLink className='nav-link' to={'/'}>Home</NavLink>
                                    <div className='text-light lnr lnr-arrow-right'></div>
                                    <NavLink className='nav-link' to={'/allorder'}>orders</NavLink>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cart_area">
                    <div className="container">
                        <div className="cart_inner">
                            <div className="section-title">
                                <h3>Email : {Tokendata.email}</h3>
                            </div>
                            <div className="table-responsive">
                                <table className="table" style={{ 'fontFamily': 'Poppins' }}>
                                    <thead>
                                        <tr >
                                            <th scope="col" colSpan={1} style={{ 'color': '#222222' }}>Index</th>
                                            <th scope="col" colSpan={2} style={{ 'color': '#222222' }}>Name</th>
                                            <th scope="col" colSpan={4} style={{ 'color': '#222222' }}>Address</th>
                                            <th scope="col" colSpan={2} style={{ 'color': '#222222' }}>Total</th>
                                            <th scope="col" colSpan={1} style={{ 'color': '#222222' }}>Items</th>
                                            <th scope="col" colSpan={1} style={{ 'color': '#222222' }}>Status</th>
                                            <th scope="col" colSpan={1} style={{ 'color': '#222222' }}>view</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            result && result?.map((item, index) => {
                                                return (
                                                    <>
                                                        <tr tr className="bottom_button" >
                                                            <td colSpan={1} style={{ 'color': '#222222' }}>{index + 1}</td>
                                                            <td colSpan={2}>{item.name}</td>
                                                            <td colSpan={4}>{item.address}</td>
                                                            <td colSpan={2}>{item.total}</td>
                                                            <td colSpan={1}>{item.quantity}</td>
                                                            <td colSpan={1}>{item.status}</td>
                                                            <td colSpan={1} onClick={() => handleClick(item.id)}>
                                                                <Eye color="#fa7200" strokeWidth={1.5} />
                                                            </td>

                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="checkout_btn_inner d-flex align-items-center">
                                    <NavLink to='/procategory' className="gray_btn">Continue Shopping</NavLink>
                                    {/* <NavLink to='/checkout' className="primary-btn">Proceed to checkout</NavLink> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {modalShow ? (<MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />) : (<></>)}
            </div>
        </div>
    )
}

export default OrderHistory
