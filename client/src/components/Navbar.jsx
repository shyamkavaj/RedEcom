// import './assets/Allcss';
import { useState, useEffect } from 'react'
import logo from '../img/logo.png'
import { NavLink, Outlet } from 'react-router-dom/dist'

const Navbar = () => {
    const [header, setHeader] = useState(null)
    const [fix,setFix] = useState(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
        // setHeader(document.querySelector('#undefined-sticky-wrapper'))
        setFix(document.querySelector('#pos_fix'))
    }, [])

    useEffect(()=>{
        const pos = fix?.offsetTop
        const myFun = () => {
            if(window.pageYOffset > pos){
                fix.classList.add("is-fixed")
            }else{
                fix.classList.remove("is-fixed")
            }
        }
        window.onscroll = myFun
    },[fix])
    return (
        <div>
            <div id="undefined-sticky-wrapper" class="sticky-wrapper" style={{"height": "80px"}}>
                <header className="header_area sticky-header" id='pos_fix'>
                    <div className="main_menu">
                        <nav className="navbar navbar-expand-lg navbar-light main_box" style={{"width":"100%"}}>
                            <div className="container">
                                {/* Brand and toggle get grouped for better mobile display */}
                                <NavLink className="navbar-brand logo_h" to={"/"}><img src={logo} alt="logo" /></NavLink>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                                {/* Collect the nav links, forms, and other content for toggling */}
                                <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                    <ul className="nav navbar-nav menu_nav ml-auto">
                                        <li className="nav-item active"><NavLink className="nav-link" to={"/"}>Home</NavLink></li>
                                        <li className="nav-item submenu dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Shop</a>
                                            <ul className="dropdown-menu">
                                                <li className="nav-item"><a className="nav-link" href="category.html">Shop Category</a></li>
                                                <li className="nav-item"><a className="nav-link" href="single-product.html">Product Details</a></li>
                                                <li className="nav-item"><a className="nav-link" href="checkout.html">Product Checkout</a></li>
                                                <li className="nav-item"><a className="nav-link" href="cart.html">Shopping Cart</a></li>
                                                <li className="nav-item"><a className="nav-link" href="confirmation.html">Confirmation</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item submenu dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Blog</a>
                                            <ul className="dropdown-menu">
                                                <li className="nav-item"><a className="nav-link" href="blog.html">Blog</a></li>
                                                <li className="nav-item"><a className="nav-link" href="single-blog.html">Blog Details</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item"><NavLink className="nav-link" to={"/contact"}>Contact</NavLink></li>
                                        <li className="nav-item submenu dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Login / SignUp</a>
                                            <ul className="dropdown-menu">
                                                <li className="nav-item"><NavLink className="nav-link" to={"/login"}>Login</NavLink></li>
                                                <li className="nav-item"><NavLink className="nav-link" to={"/signup"}>Sign Up</NavLink></li>
                                                {/* <li className="nav-item"><a className="nav-link" href="elements.html">Elements</a></li> */}
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="nav-item"><a href="#" className="cart"><span className="ti-bag" /></a></li>
                                        <li className="nav-item">
                                            <button className="search"><span className="lnr lnr-magnifier" id="search" onClick={() => { setShow(!show); console.log("show ", show) }} />{show}</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    {
                        show ? (
                            <div className="search_input" id="search_input_box">
                                <div className="container">
                                    <form className="d-flex justify-content-between">
                                        <input type="text" className="form-control" id="search_input" placeholder="Search Here" />
                                        <button type="submit" className="btn" />
                                        <span className="lnr lnr-cross" id="close_search" title="Close Search" />
                                    </form>
                                </div>
                            </div>
                        ) : (<></>)
                    }

                </header>
            </div>
            <Outlet/>
        </div>
    )
}

export default Navbar
