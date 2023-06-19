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
import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import './candidateSearchDatagrid.scss'

const CandidateSearchDatagrid = (props) => {
  // ROWS PER PAGE
  const [pageSize, setPageSize] = useState(5)

  // INITIAL SLIDE
  const [position, setPosition] = useState('-100%')

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [selectedCandidate, setSelecedCandidate] = useState({})

  console.log(props?.userDetails)
  let rows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: '1',
      date: '1-March-2023',
      date2: '1-March-2023',
      age: 35,
      attendedTo: 'true',
    },
    {
      id: 2,
      lastName: 'Lannister',
      date: '1-March-2023',
      date2: '1-March-2023',
      firstName: '1',
      age: 42,
      attendedTo: 'true',
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: '3',
      date: '1-March-2023',
      date2: '1-March-2023',
      age: 45,
      attendedTo: 'true',
    },
    {
      id: 4,
      lastName: 'Stark',
      firstName: '3',
      date: '1-March-2023',
      date2: '1-March-2023',
      age: 16,
      attendedTo: 'true',
    },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: '2',
      age: null,
      date: '1-March-2023',
      date2: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 6,
      lastName: 'Melisandre',
      firstName: '2',
      age: 150,
      date: '1-March-2023',
      date2: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 7,
      lastName: 'Clifford',
      firstName: '3',
      age: 44,
      attendedTo: 'true',
      date: '1-March-2023',
      date2: '1-March-2023',
    },
    { id: 8, lastName: 'Frances', firstName: '3', age: 36, attendedTo: 'true' },
    { id: 9, lastName: 'Roxie', firstName: '3', age: 65, attendedTo: 'true' },
  ]
  let columns = [
    {
      field: 'lastName',
      headerName: 'Candidate Name',
      width: 250,
      editable: false,
    },
    // { field: 'id', headerName: 'Company Name', width: 190 },
    {
      field: 'firstName',
      headerName: 'Number of tests',
      width: 180,
      editable: false,
    },

    { field: 'date', headerName: 'Appointment Date', width: 220 },

    {
      field: 'role',
      headerName: 'Report Status',
      width: 180,
      renderCell: () => {
        return (
          <>
            <div className='homeAttendedTo'>Received</div>
          </>
        )
      },
    },
    { field: 'date2', headerName: 'Date Received', width: 220 },
  ]

  // GRID TITLE
  let title = 'Candiates'

  // eslint-disable-next-line react/prop-types
  const loggedInUserRole = props.userDetails?.role
  // const loggedInUserRole = 'phlebotomist'
  // const loggedInUserRole = 'receptionist'

  // SET SIDE INFO POSITION
  const handleSetPosition = () => {
    setPosition('0')
  }
  // END OF SET SIDE INFO POSITION

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    setSelecedCandidate(row?.row)
    if (position !== '0') {
      setPosition('0')
    }

    console.log(row, e)
  }
  // END OF HANDLE ROW CLICK

  // HANDLE SLIDE HIDE
  const handleHideSlide = () => {
    // setPosition('-100%')
    console.log('hello')
  }
  // END OF HANDLE SLIDE HIDE

  // switch (loggedInUserRole) {
  //   case 'receptionist':
  //     rows = receptionistRows
  //     columns = receptionistcolumns
  //     title = 'Candidates'
  //     rightBtnText = 'Authorize'
  //     break
  //   case 'phlebotomist':
  //     rows = phlebotomistRows
  //     columns = phlebotomistcolumns
  //     title = 'Candidates'
  //     leftBtnText = 'Send Details'
  //     rightBtnText = 'Save Details'
  //     break
  //   case 'labScientist':
  //     rows = labScientistRows
  //     columns = labScientistColumns
  //     title = 'Candidates'
  //     leftBtnText = 'Send Result'
  //     rightBtnText = 'Save Result'
  //     break
  //   case 'qualityAssurance':
  //     rows = qualityAssuranceRows
  //     columns = qualityAssuranceColumns
  //     title = 'Candidates'
  //     rightBtnText = 'Approve'
  //     break

  //   default:
  //     break
  // }

  // USEEFFECT TO UPDATE SELECTED ROW
  useEffect(() => {}, [selectedCandidate])
  return (
    <div className='datagridWraper'>
      <div className='slide' style={{ right: position }}>
        <div className='slideTop'>
          <div className='cancelconWrapper' onClick={handleHideSlide}>
            <MdCancel className='cancelIcon' />
          </div>
          <div className='initials'>
            {selectedCandidate?.candidateName &&
              selectedCandidate?.candidateName[0]?.toUpperCase()}
          </div>
          <div className='slideFullname'>
            {selectedCandidate?.candidateName?.toUpperCase()}
          </div>
        </div>
        <div className='companyName h3'>
          <h3>Company Name</h3>
          <p>{selectedCandidate?.phoneNumber}</p>
        </div>

        <div className='phoneNo h3'>
          <h3>Candidate Phone Number</h3>
          <p>{selectedCandidate?.phoneNumber}</p>
        </div>
        <div className='numberOfTests h3'>
          <h3>{"Candidate's Email"}</h3>
          <p>{selectedCandidate?.email}</p>
        </div>
      </div>
      <div className='boxWrapper'>
        <Box sx={{ height: 350 }}>
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
            onRowClick={(row, e) => handleRowClick(row, e)}
            pagination
          />
        </Box>
      </div>
    </div>
  )
}

export default CandidateSearchDatagrid
