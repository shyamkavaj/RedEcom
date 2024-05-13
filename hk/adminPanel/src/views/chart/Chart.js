import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CProgress, CRow } from '@coreui/react'
import { CChart, CChartBar, CChartDoughnut, CChartLine, CChartPolarArea } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { DocsCallout } from 'src/components'

const Chart = ({ newData, newDataItem, orderStatus }) => {
    const [chartHeight, setChartHeight] = useState(window.innerWidth < 768 ? 190 : 50)
    // console.log("item is is ",newData)
    const role = localStorage.getItem('role')
    const [val, setVal] = useState("weekly")
    const labelArr = []
    const date = new Date();
    const lastMonthDate = new Date(date);
    // lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    lastMonthDate.setDate(lastMonthDate.getDate() - 7);

    const monthlyTotal = []
    const monthlyItem = []
    newDataItem.forEach((item) => {
        // const originalDate = new Date(item.month)
        // if (originalDate <= date && originalDate >= lastMonthDate) {
        //     monthlyItem.push(item);
        // }
        if (val == 'weekly') {
            const curr = moment().format('L')


            const prev = moment().subtract(7, 'days').calendar()

            // console.log("value of prev ", prev, "item date ", moment(item.month).format('L'));

            if (moment(item.month).format('L') <= curr && moment(item.month).format('L') >= prev) {
                // console.log("consider value ", moment(item.month).format('L'))
                const weekKey = moment(item.month).format('L')
                if (!monthlyItem[weekKey]) {
                    monthlyItem[weekKey] = 0
                }
                monthlyItem[weekKey] += item.item
            }
        }
        else if (val == 'monthly') {
            const monthKey = moment(item.month).format('MMMM YYYY');
            if (!monthlyItem[monthKey]) {
                monthlyItem[monthKey] = 0
            }
            monthlyItem[monthKey] += item.item
            // monthlyItem.sort((a, b) => new moment(a.month).format('MMMM YYYY') - new moment(b.month).format('MMMM YYYY'))
            // console.log("val is is : ", monthlyItem)
        }
    })

    newData.forEach((item) => {
        if (val === 'monthly') {
            const monthKey = moment(item.month).format('MMMM YYYY');
            if (!monthlyTotal[monthKey]) {
                monthlyTotal[monthKey] = 0
            }
            monthlyTotal[monthKey] += item.total
            // monthlyTotal.sort((a, b) => new moment(a.month).format('MMMM YYYY') - new moment(b.month).format('MMMM YYYY'))
            // const newarr = monthlyTotal.sort((a, b) => {
            //     console.log('value of a is ', a)
            //     return moment(a.month).diff(b.month);
            // });
            // console.log("new array is ", newarr)
            monthlyTotal.sort((a, b) => moment(a.month, 'MMMM YYYY').valueOf() - moment(b.month, 'MMMM YYYY').valueOf());
        } else if (val === 'weekly') {
            const curr = moment().format('L')
            const prev = moment().subtract(7, 'days').calendar()

            // console.log("value of prev ", prev, "item date ", moment(item.month).format('L'));

            if (moment(item.month).format('L') <= curr && moment(item.month).format('L') >= prev) {
                // console.log("consider value ", moment(item.month).format('L'))
                const weekKey = moment(item.month).format('L')
                if (!monthlyTotal[weekKey]) {
                    monthlyTotal[weekKey] = 0
                }
                monthlyTotal[weekKey] += item.total
            }
        }
        // }
    })
    // console.log("month total is key ", Object.keys(monthlyTotal))
    // console.log("month total is value ", Object.values(monthlyTotal))

    return (
        <>
            <CCol md={12} xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        <CRow>
                            <CCol sm={5}>
                                <h4 id="traffic" className="card-title mb-0">
                                    Order Info
                                </h4>
                                <div className="small text-body-secondary">January - Apr 2023</div>
                                <select onChange={(e) => setVal(e.target.value)} >
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </CCol>
                        </CRow>
                        <CChart
                            type="line"
                            height={chartHeight}
                            data={{
                                labels: Object.keys(monthlyTotal).map((label) => label),
                                datasets: [
                                    {
                                        label: "Month wise Revenue",
                                        backgroundColor: "rgba(220, 220, 220, 0.2)",
                                        borderColor: "#ffba00",
                                        pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                        pointBorderColor: "#ffba00",
                                        data: Object.values(monthlyTotal).map((val) => val)
                                    },
                                    {
                                        label: "Month wise item's order",
                                        backgroundColor: "rgba(220, 220, 220, 0.2)",
                                        borderColor: "#009C2F",
                                        pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                        pointBorderColor: "#009C2F",
                                        data: Object.values(monthlyItem).map((val) => val)
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: getStyle('--cui-body-color'),
                                        }
                                    }
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            color: getStyle('--cui-border-color-translucent'),
                                        },
                                        ticks: {
                                            color: getStyle('--cui-body-color'),
                                        },
                                    },
                                    y: {
                                        grid: {
                                            color: getStyle('--cui-border-color-translucent'),
                                        },
                                        ticks: {
                                            color: getStyle('--cui-body-color'),
                                        },
                                    },
                                },
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
             {
                role == 'admin' ? <CCol md={6} xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>Order Status</CCardHeader>
                        <CCardBody>
                            <CChartDoughnut
                                data={{
                                    labels: orderStatus.map((order) => order.status),
                                    datasets: [
                                        {
                                            backgroundColor: ['#B9B600', '#ffba00', '#70AB00'],
                                            data: orderStatus.map((order) => order.st),
                                        },
                                    ],
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol> : <></>
            } 

        </>
    )
}

export default Chart
