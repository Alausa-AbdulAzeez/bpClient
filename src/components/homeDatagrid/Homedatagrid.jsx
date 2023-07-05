import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import './homedatagrid.scss'
import { format } from 'date-fns'

const Homedatagrid = (props) => {
  const [pageSize, setPageSize] = useState(5)
  let rows = props?.tableData
  let columns = [
    {
      field: 'candidateName',
      headerName: 'Name',
      width: 250,
      editable: false,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
      editable: false,
    },
    {
      field: 'appointmentdate',
      headerName: 'Appointment Date',
      width: 200,
      editable: false,
      description: 'The candidate shoul be present by this date',
      renderCell: (props) => {
        const refinedDate = new Date(props?.value)
        const dateWithRightFormat = format(refinedDate, 'dd-MMM-yyyy')
        return <div>{dateWithRightFormat}</div>
      },
    },
    {
      field: 'testcategory',
      headerName: 'Test Category',
      width: 200,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      editable: false,
    },

    {
      field: 'createdDate',
      headerName: 'Date Created',
      width: 150,
      editable: false,
      renderCell: (props) => {
        const refinedDate = new Date(props?.value)
        const dateWithRightFormat = format(refinedDate, 'dd-MMM-yyyy')
        return <div>{dateWithRightFormat}</div>
      },
    },
  ]
  let title = 'Candidates'

  return (
    <div className='datagridWraper'>
      <h3>{title}</h3>
      <Box sx={{ height: 350, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          // checkboxSelection
          // disableSelectionOnClick
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row?.candidateId}
          pagination
        />
      </Box>
    </div>
  )
}

export default Homedatagrid
