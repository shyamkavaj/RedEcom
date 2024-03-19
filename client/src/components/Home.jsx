import React from 'react'
import Category from './Category'
import Product from './Product'
import ExclusiveDeal from './ExclusiveDeal'
import Brand from './Brand'
import RelatedProduct from './RelatedProduct'
import Footer from './Footer'
import Feature from './Feature'
import Banner from './Banner';
const Home = () => {
  return (
    <div>
        <Banner/>
        <Feature/>
        <Category />
        <Product />
        <ExclusiveDeal />
        <Brand />
        <RelatedProduct />
        <Footer/>
    </div>
  )
}

export default Home