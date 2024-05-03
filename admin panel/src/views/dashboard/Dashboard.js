import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsA,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCart, cilListLowPriority, cibCodesandbox, cilGroup, cilUser, cilCommentBubble } from '@coreui/icons'
import Chart from '../chart/Chart'
import { DocsExample } from 'src/components';
import { jwtDecode } from 'jwt-decode'


const Dashboard = () => {

  const dispatch = useDispatch();
  const role = localStorage.getItem('role')
  const user = localStorage.getItem('tokenAuth')
  console.log("role product ", role)

  const st = useSelector(state => state.category)
  const st1 = useSelector(state => state.product)
  const st3 = useSelector(state => state.users);
  const st4 = useSelector(state => state.faq);
  const st5 = useSelector(state => state.subcate);
  const { orders } = useSelector(state => state.order)
  const { products } = useSelector((state) => state.product)


  const totalProduct = role == 'admin' ? st1.products.length : st1.products?.filter((item) => item.uploadby == jwtDecode(user).email).length
  // console.log("total product by vendor ",totalProduct)
  // const data = (JSON.parse(orders.products))
  // const [cnt,setCnt] = useState(0) 
  var Revenue = 0
  var productResult
  var result
  const jwtEmail = jwtDecode(user).email;  // Decode once and use the email throughout
  var c = []
  var b = []

  const totalResults = orders.reduce((count, item) => {
    try {

      const productData = JSON.parse(JSON.parse(item.products));  // Assuming 'item.products' needs one JSON.parse
      productData.forEach((item) => c.push(item))
      // console.log("product data is --------------- c", c)

      // c.push(productData)
      //get the product detail from product_id which is in the order's table(products)
      const productResult = productData.map((productInfo) => {
        return products.find(product => productInfo.product_id === product.id);
      });

      // Filter products which is uploaded by the vendor using jwtEmail(using token)
      const userSpecificResults = productResult.filter(product => product && product.uploadby === jwtEmail);
      // console.log("userSpecificResults ", userSpecificResults, "productResult ", productResult)
      // userSpecificResults.forEach((item) => {
      //   if (item.id == productData.product_id) {
      //     Revenue += productData
      //   }
      // })
      // c.splice(0,c.length-1)
      // c.forEach((i) => i.product_id == )
      userSpecificResults.forEach((i) => {
        c.forEach((j) => { // Corrected syntax for inner loop
          if (i.id == j.product_id) {
            // console.log("qnty is ", j, " price ", i.price)
            Revenue += j.Qnty * i.price;
          }
        });
      });

      c = []
      return count + userSpecificResults.length;  // Update count with the number of user-specific results
    } catch (error) {
      console.error("Error parsing product data", error);
      return count;  // Return current count if there's an error
    }
  }, 0);  // Start with a count of 0

  // console.log("Total count of user-specific products:", totalResults);
  console.log("Total revenue ", Revenue);


  const totalCate = st.categories.length ? st.categories.length : 0
  const totalUser = st3.users?.user?.length ? st3.users?.user?.length : 0
  const totalFaq = st4.faqs.length ? st4.faqs.length : 0
  const totalSubCat = st5.subcate.length ? st5.subcate.length : 0
  const totalOrder = role == "admin" ? orders?.length : totalResults


  const monthTotal = [];
  const monthOrder = [];

  orders.forEach((item) => {
    const d = new Date(item.createdAt);
    const existingMonthIndex = monthTotal.findIndex((month) => month.month === d.getMonth() + 1);
    if (existingMonthIndex !== -1) {
      monthTotal[existingMonthIndex].total += item.total;
      monthOrder[existingMonthIndex].item += 1
    } else {
      monthTotal.push({
        month: d.getMonth() + 1,
        total: item.total
      });
      monthOrder.push({
        month: d.getMonth() + 1,
        item: 1
      })
    }
  });
  const orderStatus = []
  orders.forEach((item) => {
    const existingStatusIndex = orderStatus.findIndex((status) => status.status == item.status)
    if (existingStatusIndex != -1) {
      orderStatus[existingStatusIndex].item += 1
    } else {
      orderStatus.push({
        status: item.status,
        item: 1
      })
    }
  })
  monthTotal.sort((a, b) => a.month - b.month);
  monthOrder.sort((a, b) => a.month - b.month);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const convertMonthNames = (data) => {
    return data.map(item => ({
      month: months[item.month - 1],  // Convert 1-indexed month to 0-indexed array position
      total: item.total
    }));
  };
  const convertMonthNamesItem = (data) => {
    return data.map(item => ({
      month: months[item.month - 1],  // Convert 1-indexed month to 0-indexed array position
      item: item.item
    }));
  }
  const newDataTotal = convertMonthNames(monthTotal);
  const newDataItem = convertMonthNamesItem(monthOrder);
  return (
    <>
      <CRow>
        <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
          <CWidgetStatsA style={{ height: '160px' }}
            className="mb-4"
            color="primary"
            value={
              <div style={{ fontSize: '40px' }}>
                {totalProduct}
              </div>
            }
            title="Total-Product"
            action={
              <CIcon
                icon={cilCart}
                style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%', opacity: '0.6' }}
              />
            }
          />
        </CCol>
        {
          role != 'vendor' ? <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
            <CWidgetStatsA style={{ height: '160px' }}
              className="mb-4"
              color="info"
              value={
                <div style={{ fontSize: '40px' }}>
                  {totalCate}
                </div>
              }
              title="Product-Category"
              action={
                <CIcon
                  icon={cibCodesandbox}
                  style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%', opacity: '0.6' }}
                />
              }
            />
          </CCol> : <></>
        }
        {
          role != 'vendor' ? <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
            <CWidgetStatsA style={{ height: '160px' }}
              className="mb-4"
              color="warning"
              value={
                <div style={{ fontSize: '40px' }}>
                  {totalSubCat}
                </div>
              }
              title="Sub-Category"
              action={
                <CIcon
                  icon={cilListLowPriority}
                  style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%' }}
                />
              }
            />
          </CCol> : null
        }

        {/* </CRow> */}
        {/* <CRow> */}
        {
          role != "vendor" ? <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
            <CWidgetStatsA style={{ height: '160px' }}
              className="mb-4"
              color="danger"
              value={
                <div style={{ fontSize: '40px' }}>
                  {totalUser}
                </div>
              }
              title="Total-Users"
              action={
                <CIcon
                  icon={cilGroup}
                  // icon={<i className="fas fa-shopping-cart"></i>}
                  style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%' }}
                />
              }
            />
          </CCol> : <></>
        }

        {
          <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
            <CWidgetStatsA style={{ height: '160px' }}
              className="mb-4"
              color="info"
              value={
                <div style={{ fontSize: '40px' }}>
                  {totalOrder}
                </div>
              }
              title="Total-Order"
              action={
                <CIcon
                  icon={cilUser}
                  style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%', opacity: '0.6' }}
                />
              }
            />
          </CCol>
        }
        {
          role != 'vendor' ? <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
            <CWidgetStatsA style={{ height: '160px' }}
              className="mb-4"
              color="primary"
              value={
                <div style={{ fontSize: '40px' }}>
                  {totalFaq}
                </div>
              }
              title="Total-inquiry/FeedBack"
              action={
                <CIcon
                  icon={cilCommentBubble}
                  style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%', opacity: '0.6' }}
                />
              }
            />
          </CCol> : <></>
        }

      </CRow>

      <Chart newData={newDataTotal} newDataItem={newDataItem} orderStatus={orderStatus} />
    </>
  )
}

export default Dashboard

