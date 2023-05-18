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
import { FaAngleDown } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import './candidateSearchDatagrid.scss'

const CandidateSearchDatagrid = (props) => {
  const [pageSize, setPageSize] = useState(5)
  const [position, setPosition] = useState('-100%')
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
  let title = 'Pending Candiates'
  let leftBtnText
  let rightBtnText
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
    // if (e.target.textContent !== 'Authorize') {
    //   if (position !== '0') {
    //     setPosition('0')
    //   }
    // }
    console.log(row, e)
  }
  // END OF HANDLE ROW CLICK

  // HANDLE ROW CLICK
  const handleHideSlide = () => {
    // setPosition('-100%')
    console.log('hello')
  }
  // END OF HANDLE ROW CLICK

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
  return (
    <div className='datagridWraper'>
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
        {loggedInUserRole === 'phlebotomist' && (
          <div className='basicDetailsWrapper'>
            <FormControl className='genderSelect'>
              <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                //   value={age}
                label='Company name'
                //   onChange={handleChange}
              >
                <MenuItem value={10}>M</MenuItem>
                <MenuItem value={20}>F</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id='outlined-search'
              label='Age'
              type='number'
              className='candidateName basicCandidateDetailsInput'
            />
            <TextField
              id='outlined-search'
              label='Temperature'
              type='number'
              className='candidateName basicCandidateDetailsInput'
            />
            <TextField
              id='outlined-search'
              label='Weight'
              type='number'
              className='candidateName basicCandidateDetailsInput'
            />
            <TextField
              id='outlined-search'
              label='Height'
              type='number'
              className='candidateName basicCandidateDetailsInput'
            />
            <TextField
              id='outlined-search'
              label='BMI'
              type='number'
              className='candidateName basicCandidateDetailsInput'
            />
            <TextField
              id='outlined-search'
              label='Blood Pressure'
              type='search'
              className='candidateName basicCandidateDetailsInput'
            />
          </div>
        )}

        {loggedInUserRole === 'labScientist' && (
          <>
            <div className='qualityAssuranceAccordionWrapper'>
              <Accordion>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls='panel2a-content'
                  id='panel2a-header'
                >
                  <Typography>Candidate Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className='basicDetailsWrapper'>
              <TextField
                id='outlined-search'
                label='PCV'
                type='search'
                className='candidateName basicCandidateDetailsInput'
              />
              <TextField
                id='outlined-search'
                label='Blood Pressure'
                type='search'
                className='candidateName basicCandidateDetailsInput'
              />
            </div>
          </>
        )}
        {loggedInUserRole === 'qualityAssurance' && (
          <div className='qualityAssuranceAccordionWrapper'>
            <Accordion>
              <AccordionSummary
                expandIcon={<FaAngleDown />}
                aria-controls='panel2a-content'
                id='panel2a-header'
              >
                <Typography>Test Details</Typography>
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
        )}
        <div className='bottomButtons'>
          {leftBtnText && (
            <div className='authorize sendDetails'>{leftBtnText}</div>
          )}
          {rightBtnText?.length > 0 && (
            <div className='authorize'>{rightBtnText}</div>
          )}
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
