import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
  CCol,
  CRow,
  CWidgetStatsA,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCart, cilListLowPriority, cibCodesandbox, cilGroup, cilUser, cilCommentBubble } from '@coreui/icons'
import { getallUser } from 'src/RTK/slice/userSlice';
import Orders from './../order/Orders';


const Dashboard = () => {

  const dispatch = useDispatch();
  // useEffect(()=>{

  // },[dispatch])

  const st = useSelector(state => state.category)
  const st1 = useSelector(state => state.product)
  // const st2 = useSelector(state => state.staff)
  const st3 = useSelector(state => state.users);
  const st4 = useSelector(state => state.faq);
  const st5 = useSelector(state => state.subcate);
  // const st6 = useSelector(state => state.order);
  const { orders } = useSelector(state => state.order)


  // console.log("st", st);
  // console.log("st1", st1);
  // // console.log("st2",st2);
  // console.log("st3", st3);
  // console.log("st4", st4);
  // console.log("st5", st5);
  // console.log("st6", orders)

  const totalCate = st.categories.length ? st.categories.length : 0;
  const totalProduct = st1.products.length ? st1.products.length : 0;
  // const totalStaff = st2.staff[0].length;
  const totalUser = st3.users?.user?.length ? st3.users?.user?.length : 0;
  const totalFaq = st4.faqs.length ? st4.faqs.length : 0;
  const totalSubCat = st5.subcate.length ? st5.subcate.length : 0;
  const totalOrder = orders?.length ? orders?.length : 0;
  // console.log("totalOrder", totalOrder)


  // console.log("st", st, "st1", st1, "st3", st3, "st4", st4, "st5", st5);

  return (
    <>
      <CRow>
        <CCol sm={6} lg={3} style={{marginRight:'40px'}}>
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
        <CCol sm={6} lg={3} style={{marginRight:'40px'}}>
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
        </CCol>
        <CCol sm={6} lg={3} style={{marginRight:'40px'}}>
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
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={6} lg={3} style={{marginRight:'40px'}}>
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
        </CCol>
        <CCol sm={6} lg={3} style={{marginRight:'40px'}}>
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
        <CCol sm={6} lg={3} style={{marginRight:'40px'}}>
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
        </CCol>

      </CRow>
    </>
  )
}

export default Dashboard

