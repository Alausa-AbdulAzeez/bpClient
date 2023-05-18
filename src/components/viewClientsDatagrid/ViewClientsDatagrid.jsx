import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { FaAngleDown } from 'react-icons/fa'
import './viewClientsDatagrid.scss'

const ViewClientsDatagrid = (props) => {
  const [pageSize, setPageSize] = useState(5)
  const [position, setPosition] = useState('-100%')
  let rows
  let columns
  let title
  const loggedInUserRole = props.userDetails?.role

  // SET SIDE INFO POSITION
  const handleSetPosition = () => {
    setPosition('0')
  }
  // END OF SET SIDE INFO POSITION

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    if (e.target.textContent !== 'Authorize') {
      if (position !== '0') {
        setPosition('0')
      }
    }
  }
  // END OF HANDLE ROW CLICK

  // HANDLE ROW CLICK
  const handleHideSlide = () => {
    setPosition('-100%')
  }
  // END OF HANDLE ROW CLICK

  const receptionistcolumns = [
    { field: 'id', headerName: 'Company Name', width: 190 },
    {
      field: 'firstName',
      headerName: 'Number of Candidates',
      width: 250,
      editable: false,
    },
    {
      field: 'Date',
      headerName: 'Date',
      width: 250,
      editable: false,
    },
    {
      field: 'firstName',
      headerName: 'Number of Candidates',
      width: 250,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Report Status',
      width: 250,
      renderCell: (params) => {
        return (
          <>
            {params.row.attendedTo === 'true' ? (
              <div className='notSent'>Not Sent</div>
            ) : (
              <div className='sent'>Sent</div>
            )}
          </>
        )
      },
    },
  ]

  const receptionistRows = [
    { id: 1, firstName: '1', Date: '1-March-2023', attendedTo: 'false' },
    {
      id: 2,

      firstName: '1',
      Date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 3,

      firstName: '3',
      Date: '1-March-2023',
      attendedTo: 'false',
    },
    { id: 4, firstName: '3', Date: '1-March-2023', attendedTo: 'true' },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: '2',
      Date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 6,

      firstName: '2',
      Date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 7,

      firstName: '3',
      Date: '1-March-2023',
      attendedTo: 'true',
    },
    { id: 8, firstName: '3', Date: '1-March-2023', attendedTo: 'true' },
    { id: 9, firstName: '3', Date: '1-March-2023', attendedTo: 'true' },
  ]

  if (loggedInUserRole !== 'null') {
    rows = receptionistRows
    columns = receptionistcolumns
    title = 'Clients'
  }

  return (
    <div className='viewClientsDatagridWraper'>
      <div className='viewClientsSlide' style={{ right: position }}>
        <div className='viewClientsSlideTop'>
          <div
            className='viewClientsCancelconWrapper'
            onClick={handleHideSlide}
          >
            <MdCancel className='viewClientsCancelIcon' />
          </div>
          <div className='viewClientsInitials'>AA</div>
          <div className='viewClientsSlideFullname'>Alausa Abdulazeez</div>
        </div>
        <div className='viewClientsCompanyName h3'>
          <h3>Company Name</h3>
          <p>Chicken Republic</p>
        </div>

        <div className='viewClientsPhoneNo h3'>
          <h3>Contact Number</h3>
          <p>+23456789010</p>
        </div>
        <div className='viewClientsNumberOfTests h3'>
          <h3>Number of Candidates</h3>
          <p>3</p>
        </div>
        <div className='accordionWrapper'>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Test List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <br />
          <Accordion>
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography>Candidates List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className='viewClientsDate'>
          January-<small>24</small>-<small>2024</small>
        </div>
      </div>
      <h3>{title}</h3>
      <Box sx={{ height: 350, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          // checkboxSelection
          // disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          onRowClick={(row, e) => handleRowClick(row, e)}
          pagination
        />
      </Box>
    </div>
  )
}

export default ViewClientsDatagrid
