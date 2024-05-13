// import './assets/Allcss';
import { useState, useEffect } from 'react'
import logo from '../img/logo.png'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom/dist'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductByCateAndSub } from '../RTK/Slice/productSlice'
// import { useSelector } from 'react-redux'

const Navbar = () => {
    // const [header, setHeader] = useState(null)
    const [fix, setFix] = useState(null)
    const [show, setShow] = useState(false)
    const [toggle, setToggle] = useState(false)
    const location = useLocation();
    const [ischeckQnty, setischeckQnty] = useState(0)
    const [TotalQnty, setTotalQnty] = useState(0)
    const navigate = useNavigate();
    const [filteredSubcate, setFilteredSubcate] = useState([])
    // const [is]
    // const { status } = useSelector(state => state.user)
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loginData, setLoginData] = useState(localStorage.getItem('loginData'));
    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [token])
    // console.log("to ", token)
    useEffect(() => {
        setFix(document.querySelector('#pos_fix'))
    }, [])
    const { categories } = useSelector(state => state.category)
    const { subcate } = useSelector(state => state.subcate)
    useEffect(() => {
        const pos = fix?.offsetTop
        const myFun = () => {
            if (fix && window.pageYOffset > pos) {
                fix.classList.add("is-fixed")
            } else if (fix) {
                fix.classList.remove("is-fixed")
            }
        }
        // window.onscroll = myFun
        window.addEventListener("scroll", myFun); // Use addEventListener instead of assigning to window.onscroll
        return () => {
            window.removeEventListener("scroll", myFun); // Cleanup the event listener
        };
    }, [fix])
    useEffect(() => {
        // const handleResize = () => {
        if (window.innerWidth > 991) {
            setToggle(true)
        }
        const interval = setInterval(() => {
            setTotalQnty(sessionStorage?.getItem('TotalQnty'))
            setischeckQnty(sessionStorage?.getItem('TotalQnty'))
        }, 500);

        return () => clearInterval(interval);
    }, [])
    useEffect(() => {

    }, [])
    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.clear('cart');
        sessionStorage.clear('Qnty');
        localStorage.removeItem('loginData');
        setToken(null);
        setLoginData(null)
        navigate('/')
    }
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const handleClick = (name) => {
        console.log("cate name ", name)
        const s = subcate?.filter((i) => i.category.name == name)

        setFilteredSubcate(s)
        console.log("cate sub-cate ", filteredSubcate)
        setShow1(!show1)
        // setShow2(false)
        console.log("mouse is han", show1, show2)
    }
    const handleClick2 = () => {
        setShow2(!show2);
        setShow1(false)
        console.log("mouse is", show2, show1)
    }
    var s;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const dispatch = useDispatch()
    const handleClickNew = (categoryName) => {
        setSelectedCategory(categoryName);
    };
    const handleSubSelect = (cid,sid) => {
        console.log('cate_id ',cid,'sub_id',sid)
        
        dispatch(getAllProductByCateAndSub({id:sid,categ:cid}))
    }
    return (
        <div>
            <div id="undefined-sticky-wrapper" class="sticky-wrapper" style={{ "height": "80px" }}>
                <header className="header_area sticky-header" id='pos_fix'>
                    <div className="main_menu">
                        <nav className="navbar navbar-expand-lg navbar-light main_box" style={{ "width": "100%" }}>
                            <div className="container">
                                <NavLink className="navbar-brand logo_h" to={"/"}><img src={logo} alt="logo" /></NavLink>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    onClick={() => {
                                        setToggle(!toggle)
                                    }}
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                                {toggle ? (
                                    <div className={`navbar-collapse offset ${toggle ? " transition-all" : ""}`} id="navbarSupportedContent">
                                        <ul className="nav navbar-nav menu_nav ml-auto">
                                            <li className={location.pathname === "/" ? "active nav-item" : "nav-item"}><NavLink className="nav-link" to={"/"}>Home</NavLink></li>
                                            <li className={`nav-item submenu dropdown ${location.pathname === "/procategory" || location.pathname === "/checkout" ? "active" : ""}`} >
                                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" onMouseOut={() => {
                                                    setShow1(false)
                                                    setShow2(false)
                                                }}>shop</a>
                                                <ul className="dropdown-menu" >
                                                        { categories?.map((category) => {
                                                            const filteredSubcategories = subcate?.filter((subcat) => subcat.category.name === category.name);
                                                            const isCategorySelected = selectedCategory === category.name;

                                                            return (
                                                                <li className={`nav-item-in in submenu dropdown out-hover ${location.pathname === "/procategory" || location.pathname === "/checkout" ? "active" : ""}`} onMouseOver={() => handleClickNew(category.name)} key={category.id}>
                                                                    <NavLink href="#" className="nav-out dropdown-toggle">{category.name}</NavLink>

                                                                    <ul className="dropdown-menu" style={{ 'marginLeft': '200px', 'top': '0' }}>
                                                                        {isCategorySelected && filteredSubcategories.map((subcat) => (
                                                                            <li className="nav-item" key={subcat.id}>
                                                                                <NavLink className="nav-link-in in" to="/procategory" onClick={()=>handleSubSelect(category.id,subcat.id)}>{subcat.subcategory_name}</NavLink>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </li>
                                                            );
                                                        })}

                                                    

                                                    {/* <li className="nav-item">
                                                        <NavLink className="nav-link" to="/procategory"> Check Shop Category</NavLink>
                                                    </li> */}
                                                    {/* <li className="nav-item"><a className="nav-link" href="single-product.html">Check Product Details</a></li> */}
                                                </ul>
                                            </li>

                                            {/* <li className={`nav-item submenu dropdown ${location.pathname === "/procategory" || location.pathname === "/checkout" ? "active" : ""}`} >
                                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Shop</a>
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" to="/procategory">Shop Category</NavLink>
                                                    </li>
                                                    <li className="nav-item"><a className="nav-link" href="single-product.html">Product Details</a></li>
                                                </ul>
                                            </li> */}
                                            {/* <li className="nav-item submenu dropdown">
                                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Blog</a>
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item"><a className="nav-link" href="blog.html">Blog</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="single-blog.html">Blog Details</a></li>
                                                </ul>
                                            </li> */}
                                            <li className="nav-item"><NavLink className="nav-link" to={"/contact"}>Contact</NavLink></li>
                                            {/* {console.log("curr ", token)} */}

                                            {
                                                (!token || token === "undefined") ?
                                                    <li className={`nav-item submenu dropdown ${location.pathname === "/login" || location.pathname === "/signup" ? "active" : ""}`}>
                                                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Login / SignUp</a>
                                                        <ul className="dropdown-menu">
                                                            <li className="nav-item"><NavLink className="nav-link" to={"/login"}>
                                                                Login
                                                            </NavLink></li>
                                                            <li className="nav-item"><NavLink className="nav-link" to={"/signup"}>Sign Up</NavLink></li>
                                                        </ul>
                                                    </li>
                                                    :
                                                    <>
                                                        <li className={`nav-item submenu dropdown ${location.pathname === "/allorder" ? "active" : ""}`} >
                                                            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account</a>
                                                            <ul className="dropdown-menu">
                                                                <li className="nav-item"><NavLink className="nav-link" to="/allorder">Order Details</NavLink></li>
                                                                <li className="nav-item"><a className="nav-link" onClick={handleLogout}>Logout</a></li>
                                                            </ul>
                                                        </li>
                                                    </>
                                            }

                                        </ul>
                                        <ul className="nav navbar-nav navbar-right">
                                            {
                                                ischeckQnty !== '0' && ischeckQnty !== null ?
                                                    (
                                                        <>
                                                            <li className="nav-item"><NavLink to={'/cart'} className="cart"><span className="ti-bag" /><sup style={{ 'fontSize': '13px', 'fontWeight': '1000' }}>{TotalQnty}</sup></NavLink> </li>
                                                        </>
                                                    ) : (<></>)
                                            }
                                            <li className="nav-item">
                                                <button className="search"><span className="lnr lnr-magnifier" id="search" onClick={() => { setShow(!show); }} />{show}</button>
                                            </li>
                                        </ul>

                                    </div>
                                ) : (<></>)}

                            </div>
                        </nav>
                    </div >
                    {
                        show ? (
                            <div className="search_input" id="search_input_box" >
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

                </header >
            </div >
            <Outlet />
        </div >
    )
}

export default Navbar
