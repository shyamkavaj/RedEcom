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
import { jwtDecode } from 'jwt-decode'


const Dashboard = () => {

  const dispatch = useDispatch();
  const role = localStorage.getItem('role')
  const user = localStorage.getItem('tokenAuth')
  // console.log("role product ", role)

  const st = useSelector(state => state.category)
  const st1 = useSelector(state => state.product)
  const { users } = useSelector(state => state.users);
  const st4 = useSelector(state => state.faq);
  const st5 = useSelector(state => state.subcate);
  const { orders } = useSelector(state => state.order)
  const { products } = useSelector((state) => state.product)


  const totalProduct = role == 'admin' ? st1.products.length : st1.products?.filter((item) => item.uploadby == jwtDecode(user).email).length
  var Revenue = 0
  const jwtEmail = jwtDecode(user).email;  // Decode once and use the email throughout
  var c = []
  const vendordata = []
  var totalResults
  if (role != 'admin') {

    totalResults = orders.reduce((count, item) => {
      try {
        const productData = JSON.parse(JSON.parse(item.products));  // Assuming 'item.products' needs one JSON.parse
        productData.forEach((priceqnty) => c.push({ priceqnty: priceqnty, item: item }))
        //get the product detail from product_id which is in the order's table(products)
        const productResult = productData.map((productInfo) => {
          return products.find(product => productInfo.product_id === product.id);
        });

        // Filter products which is uploaded by the vendor using jwtEmail(using token)
        const userSpecificResults = productResult.filter(product => product && product.uploadby === jwtEmail);
        userSpecificResults.forEach((i) => {
          c.forEach((j) => { // Corrected syntax for inner loop
            if (i.id == j.priceqnty.product_id) {
              vendordata.push(j)
              // console.log("qnty is ", j)
              Revenue += j.priceqnty.Qnty * i.price;
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
  }
  // console.log("vendor data is ", vendordata)


  const totalCate = st.categories.length ? st.categories.length : 0
  const totalUser = users.length ? users.length : 0
  const totalFaq = st4.faqs.length ? st4.faqs.length : 0
  const totalSubCat = st5.subcate.length ? st5.subcate.length : 0
  const totalOrder = role == "admin" ? orders?.length : totalResults


  const monthTotal = [];
  const monthOrder = [];
  const orderStatus = []

  const vendormonthtotal = []
  const vendormonthOrder = []
  var cnt = 0
  if (role !== 'admin') {
    vendordata.forEach((item) => {
      // const d = new Date(item.item.createdAt);

      // const existingMonthIndex = vendormonthtotal.findIndex((month) => month.month === d.getMonth() + 1);
      // console.log("chart index is ", existingMonthIndex)
      // const val = products.filter((pro) => pro.id === item.priceqnty.product_id)
      // if (existingMonthIndex !== -1) {
      //   console.log("price is all ", val[0].price, "qnty ", item.priceqnty.Qnty)
      //   vendormonthtotal[existingMonthIndex].total += (val[0].price * item.priceqnty.Qnty)
      //   vendormonthOrder[existingMonthIndex].item += item.priceqnty.Qnty

      // } else {
      //   vendormonthtotal.push({
      //     month: d.getMonth() + 1,
      //     total: val[0].price * item.priceqnty.Qnty
      //   })
      //   vendormonthOrder.push({
      //     month: d.getMonth() + 1,
      //     item: item.priceqnty.Qnty
      //   })
      // }

      // console.log("item from vandor is ", item)
      const d = new Date(item.item.createdAt);

      const existingMonthIndex = monthTotal.findIndex((day) => day.month.getDate() === d.getDate());

      // console.log("chart index is ", existingMonthIndex)
      const val = products.filter((pro) => pro.id === item.priceqnty.product_id)
      monthTotal.push({
        month: d,
        total: val[0].price * item.priceqnty.Qnty
      })
      monthOrder.push({
        month: d,
        item: item.priceqnty.Qnty
      })
      // }
    })
    // vendormonthtotal.sort((a, b) => a.month - b.month);
    // vendormonthOrder.sort((a, b) => a.month - b.month);
    // console.log("chart vendor ", monthTotal)
  } else {
    orders.forEach((item) => {
      const d = new Date(item.createdAt);
      // console.log("item is is ", item)
      const existingMonthIndex = monthTotal.findIndex((day) => day.month.getDate() === d.getDate());

      const existingStatus = orderStatus.findIndex((val) => val.status === item.status)
      if (existingStatus !== -1) {
        // console.log("cnt ",existingStatus)
        orderStatus[existingStatus].st += 1
      } else {
        orderStatus.push({
          status: item.status,
          st:1,
        })
      }


      Revenue += item.total
      if (existingMonthIndex !== -1) {
        monthTotal[existingMonthIndex].total += item.total;
        monthOrder[existingMonthIndex].item += item.quantity
      }
      else {
        monthTotal.push({
          month: d,
          total: item.total
        });
        monthOrder.push({
          month: d,
          item: item.quantity
        })
      }
    });
    // console.log("month total length ", cnt)
    // console.log("month total length ", monthTotal)
  }
  // console.log("Total revenue ", orderStatus);



  // const months = [
  //   "January", "February", "March", "April", "May", "June",
  //   "July", "August", "September", "October", "November", "December"
  // ];
  // const convertMonthNames = (data) => {
  //   return data.map(item => ({
  //     month: months[item.month - 1],  // Convert 1-indexed month to 0-indexed array position
  //     total: item.total
  //   }));
  // };
  // const convertMonthNamesItem = (data) => {
  //   return data.map(item => ({
  //     month: months[item.month - 1],  // Convert 1-indexed month to 0-indexed array position
  //     item: item.item
  //   }));
  // }
  // const newDataTotal = role != 'admin' ? convertMonthNames(vendormonthtotal) : convertMonthNames(monthTotal);
  // const newDataItem = role != 'admin' ? convertMonthNamesItem(vendormonthOrder) : convertMonthNamesItem(monthOrder)
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
        <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
          <CWidgetStatsA style={{ height: '160px' }}
            className="mb-4"
            color="primary  "
            value={
              <div style={{ fontSize: '40px' }}>
                {Revenue}
              </div>
            }
            title="Total-Revenue"
            action={
              <CIcon
                icon={cilUser}
                style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%', opacity: '0.6' }}
              />
            }
          />
        </CCol>
      </CRow>

      {/* <Chart newData={newDataTotal} newDataItem={newDataItem} orderStatus={orderStatus} /> */}
      <Chart newData={monthTotal} newDataItem={monthOrder} orderStatus={orderStatus} />

    </>
  )
}

export default Dashboard

