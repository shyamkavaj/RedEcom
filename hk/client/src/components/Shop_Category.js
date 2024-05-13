import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { getAllCate } from '../RTK/Slice/cateSlice';
// import { getAllSubCat } from '../RTK/Slice/subcateSlice';
import { getAllProduct, getAllProductByCate, getAllProductByCateAndSub } from '../RTK/Slice/productSlice';
import { NavLink } from 'react-router-dom';
import Faq from './Faq';

const Shop_Category = () => {
    // console.log("props data ",data.data)
    const dispatch = useDispatch();
    // const [show, setShow] = React.useState(false);
    const [catId, setcateId] = React.useState();
    const [scId, setscId] = React.useState();



    const { categories } = useSelector((state) => state.category);
    const { subcate } = useSelector(state => state.subcate);
    const { products } = useSelector(state => state.product)

    const Result = products.filter((item) => {
        return item.place === "Regular" || item.place === "Week deal";
    });

    const handleSelect = (id) => {
        // console.log("id", id);
        dispatch(getAllProductByCate(id))
        setcateId(id);
    }

    const handleSubCatSelect = (id, categ) => {
        const data = {
            id: id,
            categ: categ
        }
        dispatch(getAllProductByCateAndSub(data))
        setscId(id);
    }
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(6)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Result.slice(indexOfFirstPost, indexOfLastPost);
    const totalPage = Math.ceil(Result.length / postsPerPage);

    const [activePro, setActivePro] = useState(1)
    const [active, setActive] = useState()
    const [activesub, setActiveSub] = useState()
    return (
        <div>
            <section className="banner-area organic-breadcrumb">
                <div className="container">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Shop Category page</h1>
                            <nav className="d-flex align-items-center">
                                <NavLink className='nav-link' to={'/'}>Home</NavLink>
                                <div className='text-light lnr lnr-arrow-right'></div>
                                <NavLink className='nav-link' to={'/procategory'}>Shop</NavLink>
                                <div className='text-light lnr lnr-arrow-right'></div>
                                <NavLink className='nav-link' to={'/procategory'}>Shop Category</NavLink>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-5">
                        <div className="sidebar-categories">
                            <div className="head">Browse Categories</div>
                            <ul className="main-categories">
                                <li className={`main-nav-list ${activePro === 1 ? "active-cate" : ""}`} onClick={() => {
                                    setActivePro(1)
                                    setActive(null)
                                    setActiveSub(null)
                                    // console.log("show ", item.id)
                                    dispatch(getAllProduct())
                                    setscId(null)
                                    setcateId(null)
                                    setCurrentPage(1)
                                }}>
                                    <a aria-expanded="false" aria-controls="fruitsVegetable">
                                        <span className="lnr lnr-arrow-right" />
                                        All Product
                                        {activePro === 1 ? <span className="number">({Result.length})</span> : <></>}
                                    </a>
                                </li>
                                {categories.map((item) =>
                                    <li className={`main-nav-list ${active === item.id ? "active-cate" : ""}`} onClick={() => {
                                        // console.log("show ", item.id)
                                        setActive(item.id)
                                        setActivePro(null)
                                        handleSelect(item.id)
                                        setCurrentPage(1)
                                    }}>
                                        <a aria-expanded="false" aria-controls="fruitsVegetable">
                                            <span className="lnr lnr-arrow-right" />
                                            {item.name}
                                            {active === item.id ? <span className="number">({Result.length})</span> : <></>}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                        {
                            catId ?
                                <>
                                    <div className="sidebar-categories">

                                        <div className="head">Browse SubCategories</div>
                                        <ul id="fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable">
                                            {
                                                subcate.filter((sc) => sc.category_id === catId).map((subItem) => (
                                                    <li className={`main-nav-list child ${activesub === subItem.id ? "active-cate" : ""}`}
                                                        onClick={() => {
                                                            // console.log("================", subItem.id);
                                                            setActiveSub(subItem.id)
                                                            handleSubCatSelect(subItem.id, subItem.category_id);
                                                            setCurrentPage(1)
                                                        }}
                                                    >
                                                        <a>{subItem.subcategory_name}
                                                            {activesub === subItem.id ? <span className="number">({Result.length})</span> : <></>}
                                                        </a>
                                                    </li>
                                                ))
                                            }

                                        </ul>
                                    </div>
                                </> : <></>
                        }
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-7">
                        {/* Start Filter Bar */}
                        <div className="filter-bar d-flex flex-wrap align-items-center">
                            <div className="sorting mr-auto">
                            </div>
                            <div className="pagination">
                                <a className="prev-arrow" onClick={() => {
                                    if (currentPage >= 2) {
                                        setCurrentPage(currentPage - 1);
                                    } else {
                                        setCurrentPage(1)
                                    }
                                }} ><i className="fa fa-long-arrow-left" aria-hidden="true" /></a>
                                <a className={currentPage === currentPage ? "active" : ""} onClick={() => {
                                    setCurrentPage(currentPage)
                                }}>{currentPage}</a>
                                {
                                    currentPage <= totalPage - 1 ?
                                        <>
                                            <a className={currentPage === currentPage + 1 ? "active" : ""} onClick={() => {
                                                setCurrentPage(currentPage + 1)
                                            }}>{currentPage + 1}</a>
                                        </> : <></>
                                }
                                {
                                    currentPage <= totalPage - 2 ?
                                        <>
                                            <a className={currentPage === currentPage + 2 ? "active" : ""} onClick={() => {
                                                setCurrentPage(currentPage + 2)
                                            }}>{currentPage + 2}</a>
                                        </> : <></>
                                }

                                {
                                    totalPage > 3 ?
                                        <>
                                            <a className="dot-dot"><i className="fa fa-ellipsis-h" aria-hidden="true" /></a>
                                            <a >{totalPage}</a>
                                        </> : <></>
                                }

                                <a className="next-arrow" onClick={() => {
                                    if (currentPage <= totalPage - 1) {
                                        setCurrentPage(currentPage + 1);
                                    } else {
                                        setCurrentPage(1)
                                    }
                                }}><i className="fa fa-long-arrow-right" aria-hidden="true" /></a>
                            </div>
                        </div>
                        <section className="lattest-product-area category-list">
                            <div className="row">
                                {/* {console.log("current post ", currentPosts.length)} */}
                                {currentPosts.length !== 0 ? currentPosts.map((item) => {
                                    return (
                                        <div className="col-lg-4 col-md-6">
                                            <div className="single-product">

                                                <NavLink to={`/productdetails/${item.id}`}>

                                                    <img className="img-thumbnail h-56" src={process.env.REACT_APP_IMG_URL + item?.image[0]} alt={item?.name} style={{
                                                        'width': '270px',
                                                        'height': '300px',
                                                        'object-fit':'cover'
                                                    }}/>
                                                </NavLink>
                                                <div className="product-details">

                                                    <NavLink to={`/productdetails/${item.id}`}>
                                                        <h6>{item.name}</h6>
                                                    </NavLink>
                                                    <div className="price">
                                                        <h6>₹{item.price}</h6>
                                                        <h6 className="l-through">₹{item.price + 159}</h6>
                                                    </div>
                                                    <div className="prd-bottom">
                                                        <NavLink className="social-info" to={`/productdetails/${item.id}`}>
                                                            <span className="ti-bag" />
                                                            <p className="hover-text">add to bag</p>
                                                        </NavLink>
                                                        <NavLink className="social-info" to={`/productdetails/${item.id}`} >
                                                            <span className="lnr lnr-move" />
                                                            <p className="hover-text">view more</p>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <>No Product Available</>
                                }
                                {/* single product */}

                            </div>
                        </section>
                        {/* End Best Seller */}
                        {/* Start Filter Bar */}
                        <div className="filter-bar d-flex flex-wrap align-items-center">
                            <div className="sorting mr-auto">
                            </div>
                            <div className="pagination">
                                <a className="prev-arrow" onClick={() => {
                                    if (currentPage >= 2 && currentPage >= indexOfFirstPost + 1) {
                                        setCurrentPage(currentPage - 1);
                                    } else {
                                        setCurrentPage(1)
                                    }
                                }} ><i className="fa fa-long-arrow-left" aria-hidden="true" /></a>
                                <a className={currentPage === currentPage ? "active" : ""} onClick={() => {
                                    setCurrentPage(currentPage)
                                }}>{currentPage}</a>
                                {
                                    currentPage <= totalPage - 1 ?
                                        <>
                                            <a className={currentPage === currentPage + 1 ? "active" : ""} onClick={() => {
                                                setCurrentPage(currentPage + 1)
                                            }}>{currentPage + 1}</a>
                                        </> : <></>
                                }
                                {
                                    currentPage <= totalPage - 2 ?
                                        <>
                                            <a className={currentPage === currentPage + 2 ? "active" : ""} onClick={() => {
                                                setCurrentPage(currentPage + 2)
                                            }}>{currentPage + 2}</a>
                                        </> : <></>
                                }

                                {
                                    totalPage > 3 ?
                                        <>
                                            <a className="dot-dot"><i className="fa fa-ellipsis-h" aria-hidden="true" /></a>
                                            <a >{totalPage}</a>
                                        </> : <></>
                                }

                                <a className="next-arrow" onClick={() => {
                                    if (currentPage <= totalPage - 1) {
                                        setCurrentPage(currentPage + 1);
                                    } else {
                                        setCurrentPage(1)
                                    }
                                }}><i className="fa fa-long-arrow-right" aria-hidden="true" /></a>
                            </div>
                        </div>
                        {/* End Filter Bar */}
                    </div>
                </div>
            </div>
            <Faq faq={"shop"} />
        </div>
    )
}

export default Shop_Category
