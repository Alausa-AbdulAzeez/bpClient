import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { useSelector } from 'react-redux'
import SimpleBackdrop from '../backdrop/Backdrop'
import './pendingCandidatesDatagrid.scss'
import { FaAngleDown } from 'react-icons/fa'

const PendingCandidatesDatagrid = (props) => {
  const [pageSize, setPageSize] = useState(5)
  const [position, setPosition] = useState('-100%')
  let rows = props?.tableData
  let columns = [
    {
      field: 'candidateName',
      headerName: 'Candidate Name',
      width: 250,
      editable: false,
    },
    { field: 'clientName', headerName: 'Client Name', width: 250 },
    {
      field: 'testcategory',
      headerName: 'Test Category',
      width: 200,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {loggedInUserRole === 'Reception' && (
              <div
                className='notAuthorized'
                onClick={() => authorizeUser(params, 'main')}
              >
                Authorize
              </div>
            )}
            {(loggedInUserRole === 'Phlebotomy' ||
              loggedInUserRole === 'MainLab1' ||
              loggedInUserRole === 'Report' ||
              loggedInUserRole === 'Quality assurance') && (
              <div className='notAuthorized'>View</div>
            )}
          </>
        )
      },
    },
  ]
  let title = 'Pending Candiates'

  const loggedInUserRole = props.userDetails?.role
  const user = useSelector((state) =>
    console.log(state.globalState.globalState)
  )

  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

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

  // switch (loggedInUserRole) {
  //   case 'receptionist':
  //     rows = receptionistRows
  //     columns = receptionistcolumns
  //     title = 'Pending Candidates'
  //     rightBtnText = 'Authorize'
  //     break

  //   case 'phlebotomist':
  //     rows = phlebotomistRows
  //     columns = phlebotomistcolumns
  //     title = 'Pending Candidates'
  //     leftBtnText = 'Send Details'
  //     rightBtnText = 'Save Details'
  //     break
  //   case 'labScientist':
  //     rows = labScientistRows
  //     columns = labScientistcolumns
  //     title = 'Pending Candidates'
  //     leftBtnText = 'Send Result'
  //     rightBtnText = 'Save Result'
  //     break
  //   case 'qualityAssurance':
  //     rows = qualityAssuranceRows
  //     columns = qualityAssuranceColumns
  //     title = 'Candidates'
  //     rightBtnText = 'Approve'
  //     break

  //   case 'reportOfficer':
  //     rows = reportOfficerRows
  //     columns = reportOfficerColumns
  //     title = 'Candidates'
  //     leftBtnText = 'Send Report'
  //     rightBtnText = 'Preview Report'
  //     break

  //   default:
  //     break
  // }

  // HANDLE LEFT AND RIGHT BUTTON CLICK
  const handleBtnClick = (e) => {
    switch (e.target.textContent) {
      case 'Preview Report':
        setOpen(true)
        console.log(e.target.textContent)

        break

      default:
        break
    }
  }
  return (
    <div className='datagridWraper'>
      <SimpleBackdrop open={open} handleClose={handleClose} />

      <div className='slide' style={{ right: position }}>
        <div className='slideTop'>
          <div className='cancelconWrapper' onClick={handleHideSlide}>
            <MdCancel className='cancelIcon' />
          </div>
          <div className='initials'>AA</div>
          <div className='slideFullname'>Alausa Abdulazeez</div>
        </div>
        <div className='companyName h3'>
          <h3>Company Name</h3>
          <p>Chicken Republic</p>
        </div>

        <div className='phoneNo h3'>
          <h3>Candidate Phone Number</h3>
          <p>+23456789010</p>
        </div>
        <div className='numberOfTests h3'>
          <h3>Number of Tests</h3>
          <p>3</p>
        </div>
        {loggedInUserRole === 'receptionist' && (
          <div className='listOfTests'>
            <div className='singleTest'></div>
            <h3>Number of Tests</h3>
            <p>
              1. <span>Malaria test</span>
            </p>
          </div>
        )}
      </div>
      <Box sx={{ height: 350, width: '100%' }}>
        <h3>{title}</h3>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          // checkboxSelection
          // disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          // onRowClick={(row, e) => handleRowClick(row, e)}
          pagination
        />
      </Box>
    </div>
  )
}

export default PendingCandidatesDatagrid
