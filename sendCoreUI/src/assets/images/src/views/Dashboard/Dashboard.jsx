import { CChartLine } from '@coreui/react-chartjs'
import React, { useEffect } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getAllRevenue,
  getTotalSubAdmin,
  getTotalUser,
  getTotalActiveUser,
  getTotalActiveService,
  getTotalRevenueGraph,
  getTotalUserGraph,
  getTotalSubAdminGraph,
  getTotalActiveUSerGraph,
} from 'src/slices/DashBoardSlice'

const Dashboard = () => {
  const navigate = useNavigate()

  const role = localStorage.getItem('role')

  const { partnerUsers } = useSelector((state) => state.partner)

  useEffect(() => {
    if (role === 'Customer') {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      navigate('/login')
      localStorage.removeItem('role')
    }
  }, [])

  const {
    dashboards,
    subAdmins,
    tusers,
    activeUser,
    revenueGraph,
    userGraph,
    subAdminGraph,
    activeUserGraph,
  } = useSelector((state) => state.dashboard)

  // let revenueGraph1 = []
  // let userGraph1 = []
  // let subAdminGraph1 = []
  // let activeUserGraph1 = []

  // revenueGraph.forEach((element) => {
  //   return revenueGraph && revenueGraph1.push(element[0])
  // })
  // userGraph.forEach((element) => {
  //   return userGraph && userGraph1.push(element[0])
  // })
  // subAdminGraph.forEach((element) => {
  //   return subAdminGraph && subAdminGraph1.push(element[0])
  // })
  // activeUserGraph.forEach((element) => {
  //   return activeUserGraph && activeUserGraph1.push(element[0])
  // })
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getAllRevenue())
    dispatch(getTotalSubAdmin())
    dispatch(getTotalUser())
    dispatch(getTotalActiveUser())
    dispatch(getTotalActiveService())
    dispatch(getTotalRevenueGraph())
    dispatch(getTotalUserGraph())
    dispatch(getTotalSubAdminGraph())
    dispatch(getTotalActiveUSerGraph())
  }, [dispatch])

  return (
    <React.Fragment>
      <Container>
        <Row className="mx-2">
          {/* ADMIN DASHBOARD */}
          {role === 'Admin' && (
            <Col md={6}>
              <Card style={{ backgroundColor: '#359784', color: 'white' }} className="mb-2">
                <Card.Body>
                  <Card.Title>Revenue</Card.Title>
                  <Card.Text className="dashboard1">
                    <h5>{role === 'Admin' && dashboards.total_revenue}</h5>
                  </Card.Text>
                  {revenueGraph && (
                    <CChartLine
                      className="mt-3 mx-3"
                      style={{ height: '70px' }}
                      data={{
                        labels: [
                          'January',
                          'February',
                          'March',
                          'April',
                          'May',
                          'June',
                          'July',
                          'August',
                          'September',
                          'October',
                          'November',
                          'December',
                        ],
                        datasets: [
                          {
                            label: 'Orders',
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255,255,255,.55)',
                            //   pointBackgroundColor: getStyle('--cui-primary'),
                            data: revenueGraph.map((r) => r[0]),
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            grid: {
                              display: false,
                              drawBorder: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            min: 0,
                            max: 1000000,
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        elements: {
                          line: {
                            borderWidth: 1,
                            tension: 0.4,
                          },
                          point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                          },
                        },
                      }}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
          {role === 'Admin' && (
            <Col md={6}>
              <Card style={{ backgroundColor: '#359784', color: 'white' }} className="mb-2">
                <Card.Body>
                  <Card.Title> Active User </Card.Title>
                  <Card.Text className="dashboard">
                    <h5>{activeUser.Count}</h5>
                  </Card.Text>
                  {activeUserGraph && (
                    <CChartLine
                      className="mt-3 mx-3"
                      style={{ height: '70px' }}
                      data={{
                        labels: [
                          'January',
                          'February',
                          'March',
                          'April',
                          'May',
                          'June',
                          'July',
                          'August',
                          'September',
                          'October',
                          'November',
                          'December',
                        ],
                        datasets: [
                          {
                            label: 'Active Users',
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255,255,255,.55)',
                            //   pointBackgroundColor: getStyle('--cui-primary'),
                            data: activeUserGraph.map((a) => a[0]),
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            grid: {
                              display: false,
                              drawBorder: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            min: 0,
                            max: 50,
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        elements: {
                          line: {
                            borderWidth: 1,
                            tension: 0.4,
                          },
                          point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                          },
                        },
                      }}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
          {role === 'Admin' && (
            <Col md={6}>
              <Card style={{ backgroundColor: '#359784', color: 'white' }} className="mb-2">
                <Card.Body>
                  <Card.Title> Sub Admin </Card.Title>
                  <Card.Text className="dashboard">
                    {subAdmins && <h5>{subAdmins.Count}</h5>}
                  </Card.Text>
                  {subAdminGraph && (
                    <CChartLine
                      className="mt-3 mx-3"
                      style={{ height: '70px' }}
                      data={{
                        labels: [
                          'January',
                          'February',
                          'March',
                          'April',
                          'May',
                          'June',
                          'July',
                          'August',
                          'September',
                          'October',
                          'November',
                          'December',
                        ],
                        datasets: [
                          {
                            label: 'Sub Admin',
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255,255,255,.55)',
                            // pointBackgroundColor: getStyle('--cui-info'),
                            data: subAdminGraph.map((s) => s[0]),
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            grid: {
                              display: false,
                              drawBorder: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            min: 0,
                            max: 10,
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        elements: {
                          line: {
                            borderWidth: 1,
                          },
                          point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                          },
                        },
                      }}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
          {role === 'Admin' && (
            <Col md={6}>
              <Card style={{ backgroundColor: '#359784', color: 'white' }} className="mb-2">
                <Card.Body>
                  <Card.Title> Users</Card.Title>
                  <Card.Text className="dashboard">
                    <h5>{tusers.Count} </h5>
                  </Card.Text>
                  {userGraph && (
                    <CChartLine
                      className="mt-3 mx-3"
                      style={{ height: '70px' }}
                      data={{
                        labels: [
                          'January',
                          'February',
                          'March',
                          'April',
                          'May',
                          'June',
                          'July',
                          'August',
                          'September',
                          'October',
                          'November',
                          'December',
                        ],
                        datasets: [
                          {
                            label: 'User Register',
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255,255,255,.55)',
                            //   pointBackgroundColor: getStyle('--cui-primary'),
                            data: userGraph.map((u) => u[0]),
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            grid: {
                              display: false,
                              drawBorder: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            min: 0,
                            max: 50,
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        elements: {
                          line: {
                            borderWidth: 1,
                            tension: 0.4,
                          },
                          point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                          },
                        },
                      }}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
          {/* SUBADMIN DASHBOARD */}
          {role === 'Sub Admin' && (
            <Col md={6}>
              <Card style={{ backgroundColor: '#359784', color: 'white' }} className="mb-2">
                <Card.Body>
                  <Card.Title> Active User </Card.Title>
                  <Card.Text className="dashboard">
                    <h5>{activeUser.Count}</h5>
                  </Card.Text>
                  {activeUserGraph && (
                    <CChartLine
                      className="mt-3 mx-3"
                      style={{ height: '70px' }}
                      data={{
                        labels: [
                          'January',
                          'February',
                          'March',
                          'April',
                          'May',
                          'June',
                          'July',
                          'August',
                          'September',
                          'October',
                          'November',
                          'December',
                        ],
                        datasets: [
                          {
                            label: 'Active Users',
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255,255,255,.55)',
                            //   pointBackgroundColor: getStyle('--cui-primary'),
                            data: activeUserGraph.map((a) => a[0]),
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            grid: {
                              display: false,
                              drawBorder: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            min: 0,
                            max: 50,
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        elements: {
                          line: {
                            borderWidth: 1,
                            tension: 0.4,
                          },
                          point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                          },
                        },
                      }}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
          {role === 'Sub Admin' && (
            <Col md={6}>
              <Card style={{ backgroundColor: '#359784', color: 'white' }} className="mb-2">
                <Card.Body>
                  <Card.Title> Sub Admin </Card.Title>
                  <Card.Text className="dashboard">
                    {subAdmins && <h5>{subAdmins.Count}</h5>}
                  </Card.Text>
                  {subAdminGraph && (
                    <CChartLine
                      className="mt-3 mx-3"
                      style={{ height: '70px' }}
                      data={{
                        labels: [
                          'January',
                          'February',
                          'March',
                          'April',
                          'May',
                          'June',
                          'July',
                          'August',
                          'September',
                          'October',
                          'November',
                          'December',
                        ],
                        datasets: [
                          {
                            label: 'Sub Admin',
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255,255,255,.55)',
                            // pointBackgroundColor: getStyle('--cui-info'),
                            data: subAdminGraph.map((s) => s[0]),
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            grid: {
                              display: false,
                              drawBorder: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            min: 0,
                            max: 10,
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        elements: {
                          line: {
                            borderWidth: 1,
                          },
                          point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                          },
                        },
                      }}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
          {role === 'Sub Admin' && (
            <Col md={6}>
              <Card style={{ backgroundColor: '#359784', color: 'white' }} className="mb-2">
                <Card.Body>
                  <Card.Title> Users</Card.Title>
                  <Card.Text className="dashboard">
                    <h5>{tusers.Count} </h5>
                  </Card.Text>
                  {userGraph && (
                    <CChartLine
                      className="mt-3 mx-3"
                      style={{ height: '70px' }}
                      data={{
                        labels: [
                          'January',
                          'February',
                          'March',
                          'April',
                          'May',
                          'June',
                          'July',
                          'August',
                          'September',
                          'October',
                          'November',
                          'December',
                        ],
                        datasets: [
                          {
                            label: 'User Register',
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255,255,255,.55)',
                            //   pointBackgroundColor: getStyle('--cui-primary'),
                            data: userGraph.map((u) => u[0]),
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            grid: {
                              display: false,
                              drawBorder: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            min: 0,
                            max: 50,
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false,
                            },
                          },
                        },
                        elements: {
                          line: {
                            borderWidth: 1,
                            tension: 0.4,
                          },
                          point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                          },
                        },
                      }}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
          {/* PARTNER DASHBOARD */}
          {role === 'Partner' && (
            <Col md={6}>
              <Card style={{ backgroundColor: '#359784', color: 'white' }} className="mb-2">
                <Card.Body>
                  <Card.Title> Users</Card.Title>
                  <Card.Text className="dashboard">
                    <h5>{partnerUsers.length} </h5>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Dashboard
