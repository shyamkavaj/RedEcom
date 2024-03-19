import { CSVLink } from 'react-csv'
import ReactToPrint from 'react-to-print'
import { kaReducer, Table, DataType } from 'ka-table'
import { kaPropsUtils } from 'ka-table/utils'
import { search } from 'ka-table/actionCreators'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, FormControl, Row } from 'react-bootstrap'
import { PagingPosition, SortingMode } from 'ka-table/enums'
import { updatePageIndex, updatePageSize } from 'ka-table/actionCreators'

const DataTable = ({ tableData, tableHeaders, filename }) => {
  const printDivRef = useRef()
  const tablePropsInit = {
    columns: tableHeaders,
    data: tableData,
    search: ({ searchText, rowData, column }) => {
      if (column.key === 'passed') {
        return (
          (searchText === 'false' && !rowData.passed) || (searchText === 'true' && rowData.passed)
        )
      }
    },
    // format: ({ column, value }) => {
    //   if (column.dataType === DataType.Date) {
    //     return (
    //       value &&
    //       value.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
    //     )
    //   }
    // },
    rowKeyField: 'id',
    searchText: '',
    sortingMode: SortingMode.Single,
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 50,
      pageSizes: [50, 100, 200],
      position: PagingPosition.Top,
    },
  }

  const [tableProps, changeTableProps] = useState(tablePropsInit)

  useEffect(() => {
    changeTableProps(tablePropsInit)
  }, [JSON.stringify(tablePropsInit)])
  const dispatch = (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action))
  }

  const PageSizeSelector = ({ pageSize, pageSizes, dispatch }) => (
    <>
      Page Size:
      <select
        className="form-control"
        value={pageSize}
        onChange={(event) => {
          dispatch(updatePageSize(Number(event.currentTarget.value)))
        }}
      >
        {pageSizes?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  )

  const PagesSelector = ({ pageIndex, pagesCount, dispatch }) => (
    <>
      Page No.:
      <select
        className="form-control"
        value={pageIndex}
        onChange={(event) => {
          dispatch(updatePageIndex(Number(event.currentTarget.value)))
        }}
      >
        {[...Array(pagesCount)].map((_, index) => (
          <option key={index} value={index}>
            {index + 1}
          </option>
        ))}
      </select>
    </>
  )

  return (
    <React.Fragment>
      <Row></Row>

      <Row>
        <Col md={6}>
          <FormControl
            type="search"
            defaultValue={tableProps.searchText}
            onChange={(event) => {
              dispatch(search(event.currentTarget.value))
            }}
            placeholder="Search...."
          />
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-end my-2">
          <div className="d-flex align-items-center align-content-end">
            <div className="mx-3">
              <CSVLink
                data={kaPropsUtils.getData(tableProps)}
                headers={tableProps.columns.map((c) => ({ label: c.title, key: c.key }))}
                filename={`${filename}.csv`}
              >
                <Button size="sm" className="btn btn-success">
                  Export To CSV
                </Button>
              </CSVLink>
            </div>
            <div className="print">
              <ReactToPrint
                trigger={() => (
                  <Button size="sm" className="btn btn-primary">
                    Print
                  </Button>
                )}
                content={() => printDivRef.current}
              />
            </div>
          </div>
        </Col>
      </Row>
      <hr />
      <div ref={printDivRef} className="print-content">
        <Table
          {...tableProps}
          childComponents={{
            table: {
              elementAttributes: () => ({
                id: 'table-to-xls',
              }),
            },
            pagingSizes: {
              content: (props) => <PageSizeSelector {...props} />,
            },
            pagingPages: {
              content: (props) => <PagesSelector {...props} />,
            },
          }}
          dispatch={dispatch}
        />
      </div>
    </React.Fragment>
  )
}

export default DataTable
