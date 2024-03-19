import { kaReducer, Table } from 'ka-table'
import { Button, Col, Row } from 'react-bootstrap'
import { sortData } from 'ka-table/Utils/SortUtils'
import React, { useEffect, useRef, useState } from 'react'
import { getPageData, getPagesCount } from 'ka-table/Utils/PagingUtils'
import { ActionType, PagingPosition, SortingMode } from 'ka-table/enums'
import {
  deleteRow,
  loadData,
  search,
  setSingleAction,
  updateData,
  updatePagesCount,
} from 'ka-table/actionCreators'
import VisibilityBadge from '../VisibilityBadge'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { IoIosSwitch } from 'react-icons/io'
import ImagePreview from '../ImagePreview'
import VisibilityBadge2 from '../VisibilityBadge2'
import { updatePageIndex, updatePageSize } from 'ka-table/actionCreators'

const DataTableUI = ({
  tableData,
  tableHeaders,

  deleteRecord,
  updateRecord,
  handleVisibility,
  handleView,
}) => {
  const printDivRef = useRef()
  const tablePropsInit = {
    columns: tableHeaders,
    data: tableData,
    // format: ({ column, value }) => {
    //   if (column.dataType === DataType.Date) {
    //     return (
    //       value &&
    //       value.toLocaleDateString('es-CL', { month: '2-digit', day: '2-digit', year: 'numeric' })
    //     )
    //   }
    // },

    rowKeyField: 'id',
    search: ({ searchText, rowData, column }) => {
      if (column.key === 'passed') {
        return (
          (searchText === 'false' && !rowData.passed) || (searchText === 'true' && rowData.passed)
        )
      }
    },
    searchText: '',
    sortingMode: SortingMode.Single,
    // editingMode: EditingMode.Cell,
    // columnResizing: true,
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      position: PagingPosition.Top,
    },

    singleAction: loadData(),
  }

  const getRecords = (paging, columns, pageIndexNew) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sortedData = columns ? sortData(columns, tableData) : tableData
        const data = getPageData(sortedData, {
          ...paging,
          pagesCount: undefined,
          pageIndex: pageIndexNew != null ? pageIndexNew : paging?.pageIndex,
        })
        resolve({
          data,
          pagesCount: getPagesCount(tableData, { ...paging, pagesCount: undefined }),
        })
      }, 1000)
    })
  }

  const updateRecords = (id, data) => {
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i].id === id) {
        tableData[i] = { ...tableData[i], ...data }
      }
    }
    return new Promise((resolve) => {
      resolve()
    })
  }

  const deleteRecords = (id) => {
    tableData = tableData.filter((d) => d.id !== id)
    return new Promise((resolve) => {
      resolve()
    })
  }

  const [tableProps, changeTableProps] = useState(tablePropsInit)

  useEffect(() => {
    changeTableProps(tablePropsInit)
  }, [JSON.stringify(tablePropsInit)])

  //   const dispatch = (action) => {
  //     changeTableProps((prevState) => kaReducer(prevState, action))
  //   }

  const PageSizeSelector = ({ pageSize, pageSizes, dispatch }) => (
    <>
      Page Size.
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
      Page No.
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

  const dispatch = async (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action))

    if (action.type === ActionType.DeleteRow) {
      // dispatch(showLoading())
      await deleteRecords(action.rowKeyValue)
      dispatch(setSingleAction(loadData()))
    } else if (action.type === ActionType.UpdateCellValue) {
      // dispatch(showLoading())
      await updateRecords(action.rowKeyValue, { [action.columnKey]: action.value })
      dispatch(setSingleAction(loadData()))
    } else if (
      action.type === ActionType.UpdateSortDirection ||
      action.type === ActionType.UpdatePageIndex ||
      action.type === ActionType.UpdatePageSize
    ) {
      dispatch(setSingleAction(loadData()))
    } else if (action.type === ActionType.LoadData) {
      // dispatch(showLoading())
      const result = await getRecords(tableProps.paging, tableProps.columns, action?.pageIndex)
      dispatch(updatePagesCount(result.pagesCount))
      dispatch(updateData(result.data))
      // dispatch(hideLoading())
    }
  }

  const Actions = ({ dispatch, rowKeyValue, rowData }) => {
    return (
      <div className="d-flex justify-content-end flex-shrink-0 align-content-between">
        {/* Visibility Button */}
        {handleVisibility && (
          <Button size="sm" variant="outline-warning" onClick={() => handleVisibility(rowData)}>
            <IoIosSwitch />
          </Button>
        )}
        {/* Visibility Button */}
        {handleView && (
          <Button size="sm" variant="outline-warning" onClick={() => handleView(rowData)}>
            <AiOutlineEye />
          </Button>
        )}

        {/* Update Button */}
        {updateRecord && (
          <Button size="sm" variant="outline-primary" onClick={() => updateRecord(rowKeyValue)}>
            <AiOutlineEdit />
          </Button>
        )}

        {/* Delete Button */}
        {deleteRecord && (
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => deleteRecord(rowData, dispatch, deleteRow)}
          >
            <AiOutlineDelete />
          </Button>
        )}
      </div>
    )
  }

  const Visibility = ({ rowData }) => {
    return <VisibilityBadge visibility={rowData.top_service} />
  }
  const Visibility2 = ({ rowData }) => {
    return <VisibilityBadge2 visibility={rowData.status} />
  }

  // Render Images in table
  const RenderImage = ({ rowData }) => {
    const { image } = rowData
    return (
      <div className="symbol symbol-50px">
        {image ? <ImagePreview src={image} /> : <small>No Image</small>}
      </div>
    )
  }
  const RenderMultipleImage = ({ rowData }) => {
    const { documents } = rowData

    let docs = documents != null ? JSON.parse(documents) : []

    for (let i = 0; i <= docs.length; i++) {
      return (
        <>
          {docs[i] ? (
            <ImagePreview src={docs[i]} height={30} width={50} />
          ) : (
            <small>No Image</small>
          )}
        </>
      )
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col md={4} className="d-flex align-items-center justify-content-start my-2">
          <input
            type="search"
            data-kt-user-table-filter="search"
            className="form-control form-control-solid w-250px ps-14"
            placeholder="Search..."
            defaultValue={tableProps.searchText}
            onChange={(event) => {
              dispatch(search(event.currentTarget.value))
            }}
          />
        </Col>
      </Row>
      <div ref={printDivRef} className="print-content column-resizing-demo">
        <Table
          {...tableProps}
          childComponents={{
            table: {
              elementAttributes: () => ({
                id: 'table-to-xls',
              }),
            },
            cellText: {
              content: (props) => {
                switch (props.column.key) {
                  case ':actions':
                    return <Actions {...props} />
                }
                switch (props.column.key) {
                  case 'top_service':
                    return <Visibility {...props} />
                }
                switch (props.column.key) {
                  case 'status':
                    return <Visibility2 {...props} />
                }
                switch (props.column.key) {
                  case 'image':
                    return <RenderImage {...props} />
                }
                switch (props.column.key) {
                  case 'documents':
                    return <RenderMultipleImage {...props} />
                }
              },
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

export default DataTableUI
