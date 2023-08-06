// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from '@mui/material'
// import { Box } from '@mui/system'
// import { DataGrid } from '@mui/x-data-grid'
// import React, { useState } from 'react'
// import { FaAngleDown } from 'react-icons/fa'
// import { MdCancel } from 'react-icons/md'
// import './reportsDatagrid.scss'
// import SimpleBackdrop from '../backdrop/Backdrop'

// const ReportsDatagrid = (props) => {
//   const [pageSize, setPageSize] = useState(5)
//   const [position, setPosition] = useState('-100%')
//   const [open, setOpen] = React.useState(false)

//   const handleClose = () => {
//     setOpen(false)
//   }

//   let title = 'Reports'
//   let leftBtnText
//   let rightBtnText = 'View Report'
//   // eslint-disable-next-line react/prop-types
//   const loggedInUserRole = props.userDetails?.role

//   // SET SIDE INFO POSITION
//   const handleSetPosition = () => {
//     setPosition('0')
//   }
//   // END OF SET SIDE INFO POSITION

//   // HANDLE ROW CLICK
//   const handleRowClick = (row, e) => {
//     if (e.target.textContent !== 'Authorize') {
//       if (position !== '0') {
//         setPosition('0')
//       }
//     }
//   }
//   // END OF HANDLE ROW CLICK

//   // HANDLE ROW CLICK
//   const handleHideSlide = () => {
//     setPosition('-100%')
//   }
//   // END OF HANDLE ROW CLICK

//   // HANDLE LEFT AND RIGHT BUTTON CLICK
//   const handleBtnClick = (e) => {
//     switch (e.target.textContent) {
//       case 'View Report':
//         setOpen(true)
//         console.log(e.target.textContent)

//         break

//       default:
//         break
//     }
//   }

//   // END OF HANDLE LEFT AND RIGHT BUTTON CLICK

//   const columns = [
//     {
//       field: 'lastName',
//       headerName: 'Candidate Name',
//       width: 250,
//       editable: false,
//     },
//     { field: 'id', headerName: 'Company Name', width: 190 },
//     {
//       field: 'firstName',
//       headerName: 'Number of tests',
//       width: 180,
//       editable: false,
//     },

//     { field: 'date', headerName: 'Appointment Date', width: 220 },

//     {
//       field: 'role',
//       headerName: 'Attended to',
//       width: 180,
//       renderCell: () => {
//         return (
//           <>
//             <div className='attendedTo'>True</div>
//           </>
//         )
//       },
//     },
//   ]

//   const rows = [
//     {
//       id: 1,
//       lastName: 'Snow',
//       firstName: '1',
//       date: '1-March-2023',
//       age: 35,
//       attendedTo: 'true',
//     },
//     {
//       id: 2,
//       lastName: 'Lannister',
//       date: '1-March-2023',
//       firstName: '1',
//       age: 42,
//       attendedTo: 'true',
//     },
//     {
//       id: 3,
//       lastName: 'Lannister',
//       firstName: '3',
//       date: '1-March-2023',
//       age: 45,
//       attendedTo: 'true',
//     },
//     {
//       id: 4,
//       lastName: 'Stark',
//       firstName: '3',
//       date: '1-March-2023',
//       age: 16,
//       attendedTo: 'true',
//     },
//     {
//       id: 5,
//       lastName: 'Targaryen',
//       firstName: '2',
//       age: null,
//       date: '1-March-2023',
//       attendedTo: 'true',
//     },
//     {
//       id: 6,
//       lastName: 'Melisandre',
//       firstName: '2',
//       age: 150,
//       date: '1-March-2023',
//       attendedTo: 'true',
//     },
//     {
//       id: 7,
//       lastName: 'Clifford',
//       firstName: '3',
//       age: 44,
//       attendedTo: 'true',
//       date: '1-March-2023',
//     },
//     {
//       id: 8,
//       lastName: 'Frances',
//       firstName: '3',
//       age: 36,
//       attendedTo: 'true',
//     },
//     { id: 9, lastName: 'Roxie', firstName: '3', age: 65, attendedTo: 'true' },
//   ]

//   return (
//     <div className='datagridWraper'>
//       <SimpleBackdrop open={open} handleClose={handleClose} />

//       <div className='slide' style={{ right: position }}>
//         <div className='slideTop'>
//           <div className='cancelconWrapper' onClick={handleHideSlide}>
//             <MdCancel className='cancelIcon' />
//           </div>
//           <div className='initials'>AA</div>
//           <div className='slideFullname'>Alausa Abdulazeez</div>
//         </div>
//         <div className='companyName h3'>
//           <h3>Company Name</h3>
//           <p>Chicken Republic</p>
//         </div>

//         <div className='phoneNo h3'>
//           <h3>Candidate Phone Number</h3>
//           <p>+23456789010</p>
//         </div>
//         <div className='numberOfTests h3'>
//           <h3>Number of Tests</h3>
//           <p>3</p>
//         </div>
//         {loggedInUserRole === 'receptionist' && (
//           <div className='listOfTests'>
//             <div className='singleTest'></div>
//             <h3>Number of Tests</h3>
//             <p>
//               1. <span>Malaria test</span>
//             </p>
//           </div>
//         )}
//         {loggedInUserRole === 'phlebotomist' && (
//           <div className='basicDetailsWrapper'>
//             <FormControl className='genderSelect'>
//               <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
//               <Select
//                 labelId='demo-simple-select-label'
//                 id='demo-simple-select'
//                 //   value={age}
//                 label='Company name'
//                 //   onChange={handleChange}
//               >
//                 <MenuItem value={10}>M</MenuItem>
//                 <MenuItem value={20}>F</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               id='outlined-search'
//               label='Age'
//               type='number'
//               className='candidateName basicCandidateDetailsInput'
//             />
//             <TextField
//               id='outlined-search'
//               label='Temperature'
//               type='number'
//               className='candidateName basicCandidateDetailsInput'
//             />
//             <TextField
//               id='outlined-search'
//               label='Weight'
//               type='number'
//               className='candidateName basicCandidateDetailsInput'
//             />
//             <TextField
//               id='outlined-search'
//               label='Height'
//               type='number'
//               className='candidateName basicCandidateDetailsInput'
//             />
//             <TextField
//               id='outlined-search'
//               label='BMI'
//               type='number'
//               className='candidateName basicCandidateDetailsInput'
//             />
//             <TextField
//               id='outlined-search'
//               label='Blood Pressure'
//               type='search'
//               className='candidateName basicCandidateDetailsInput'
//             />
//           </div>
//         )}
//         {loggedInUserRole === 'labScientist' && (
//           <>
//             <div className='qualityAssuranceAccordionWrapper'>
//               <Accordion>
//                 <AccordionSummary
//                   expandIcon={<FaAngleDown />}
//                   aria-controls='panel2a-content'
//                   id='panel2a-header'
//                 >
//                   <Typography>Candidate Details</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     Suspendisse malesuada lacus ex, sit amet blandit leo
//                     lobortis eget.
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>
//             </div>
//             <div className='basicDetailsWrapper'>
//               <TextField
//                 id='outlined-search'
//                 label='PCV'
//                 type='search'
//                 className='candidateName basicCandidateDetailsInput'
//               />
//               <TextField
//                 id='outlined-search'
//                 label='Blood Pressure'
//                 type='search'
//                 className='candidateName basicCandidateDetailsInput'
//               />
//             </div>
//           </>
//         )}

//         {
//           <div className='bottomButtons'>
//             {leftBtnText && (
//               <div className='authorize sendDetails'>{leftBtnText}</div>
//             )}
//             {rightBtnText?.length > 0 && (
//               <div className='authorize' onClick={(e) => handleBtnClick(e)}>
//                 {rightBtnText}
//               </div>
//             )}
//           </div>
//         }
//       </div>
//       <div className='boxWrapper'>
//         <Box sx={{ height: 350 }}>
//           <h3>{title}</h3>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={pageSize}
//             experimentalFeatures={{ newEditingApi: true }}
//             onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//             rowsPerPageOptions={[5, 10, 20]}
//             onRowClick={(row, e) => handleRowClick(row, e)}
//             pagination
//           />
//         </Box>
//       </div>
//     </div>
//   )
// }

// export default ReportsDatagrid

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import "./reportsDatagrid.scss";
import SimpleBackdrop from "../backdrop/Backdrop";
import { publicRequest } from "../../functions/requestMethods";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const ReportsDatagrid = (props) => {
  const [pageSize, setPageSize] = useState(5);
  const [position, setPosition] = useState("-100%");
  const [open, setOpen] = React.useState(false);

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [selectedCandidate, setSelecedCandidate] = useState({});

  // SELECTED CANDIDATE SUBMITTED RESULTS (FOR QA and REPORTS )
  const [candidateSubmittedResults, setCandidateSubmittedResults] = useState(
    []
  );

  // SELECTED CANDIDATE SUBMITTED RESULTS (FOR QA REPORTS )
  const [
    loadingCandedateSubmittedResults,
    setLoadingCandedateSubmittedResults,
  ] = useState(false);
  const [candedateSubmittedResultsError, setCandedateSubmittedResultsError] =
    useState(false);
  const [
    candedateSubmittedResultsErrorMsg,
    setCandedateSubmittedResultsErrorMsg,
  ] = useState("");

  // SELECTED CANDIDATE RESULTS
  let [candidateResults, setCandidateResults] = useState([]);
  let [selectedCandidateResults, setSelectedCandidateResults] = useState([]);

  // COLUMNS
  const defaultColumns = [
    {
      field: "candidateName",
      headerName: "Candidate Name",
      width: 350,
      editable: false,
    },
    { field: "clientName", headerName: "Client Name", width: 300 },
    // {
    //   field: 'testcategory',
    //   headerName: 'Test Category',
    //   width: 250,
    //   editable: false,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (param) => {
        const rowId = param?.row?.tests?.[0]?.candidateId;
        return (
          <>
            <Link to={`/labReport/${rowId}`} target="_blank">
              <div className="notAuthorized">View Report</div>
            </Link>
          </>
        );
      },
    },
  ];

  // RESULT COLUMN
  const resultColumn = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "testName",
      headerName: "Test name",
      width: 150,
    },
    {
      field: "result",
      headerName: "Result",
      width: 150,
    },
    {
      field: "action",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {loggedInUserRole === "Report" && (
              <div
                className={
                  params?.row?.status === "PENDING"
                    ? "pendingResult"
                    : "approvedResult"
                }
              >
                {params?.row?.status}
              </div>
            )}
          </>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  let rows = props?.tableData;
  let columns = defaultColumns;
  let title = "Candidates";
  let leftBtnText = "View Report";

  // LOGGED IN USER RLOE
  const loggedInUserRole = props.userDetails?.data?.role;

  // SET SIDE INFO POSITION
  const handleSetPosition = () => {
    setPosition("0");
  };
  // END OF SET SIDE INFO POSITION

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    setSelecedCandidate(row?.row);
    if (e.target.textContent !== "Authorize") {
      if (position !== "0") {
        setPosition("0");
      }
    }
  };
  // END OF HANDLE ROW CLICK

  // HANDLE ROW CLICK
  const handleHideSlide = () => {
    setPosition("-100%");
  };
  // END OF HANDLE ROW CLICK

  // HANDLE LEFT AND RIGHT BUTTON CLICK
  const handleBtnClick = (e) => {
    switch (e.target.textContent) {
      case "View Report":
        // setOpen(true)
        Navigate({ to: "/labReport" });

        break;

      default:
        break;
    }
  };

  // END OF HANDLE LEFT AND RIGHT BUTTON CLICK

  // USEEFFECT TO UPDATE SELECTED CANDIDATE INFO
  useEffect(() => {
    if (selectedCandidate.tests?.[0].candidateId) {
      const getCandidatetResults = async () => {
        setLoadingCandedateSubmittedResults(true);
        setCandedateSubmittedResultsError(false);
        try {
          await publicRequest
            .get(
              `Result/candidate/${selectedCandidate.tests?.[0].candidateId}`,
              {
                headers: {
                  Accept: "*",
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              setLoadingCandedateSubmittedResults(false);
              setLoadingCandedateSubmittedResults(false);
              setCandidateSubmittedResults(res?.data?.data);
            });
        } catch (error) {
          console.log(error);
          setLoadingCandedateSubmittedResults(false);
          setCandedateSubmittedResultsError(true);
          setCandidateSubmittedResults([]);
          setCandedateSubmittedResultsErrorMsg(
            error?.response?.data?.title ||
              error?.response?.data?.description ||
              error?.message ||
              "Something went wrong, please try again"
          );
        }
      };

      getCandidatetResults();
    }
  }, [selectedCandidate]);

  return (
    <div className="datagridWraper">
      <SimpleBackdrop open={open} handleClose={handleClose} />

      <div className="slide" style={{ right: position }}>
        <div className="slideTop">
          <div className="cancelconWrapper" onClick={handleHideSlide}>
            <MdCancel className="cancelIcon" />
          </div>
          <div className="initials">AA</div>
          <div className="slideFullname">Alausa Abdulazeez</div>
        </div>
        <div className="companyName h3">
          <h3>Company Name</h3>
          <p>Chicken Republic</p>
        </div>

        <div className="phoneNo h3">
          <h3>Candidate Phone Number</h3>
          <p>+23456789010</p>
        </div>
        <div className="numberOfTests h3">
          <h3>Number of Tests</h3>
          <p>3</p>
        </div>
        {loggedInUserRole === "Report" && (
          <div className="reportResultsWrapper">
            <div className="qualityAssuranceAccordionWrapper">
              <Accordion>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Candidate Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Age -{selectedCandidate?.age} years</Typography>
                  <Typography>Gender - {selectedCandidate?.gender}</Typography>
                  <Typography>BMI - {selectedCandidate?.bmi}</Typography>
                  <Typography>
                    Height - {selectedCandidate?.height}cm
                  </Typography>
                  <Typography>
                    Weight - {selectedCandidate?.weight}kg
                  </Typography>
                  <Typography>
                    bloodPressure - {selectedCandidate?.bloodPressure}mm/Hg
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            {loadingCandedateSubmittedResults ||
            candedateSubmittedResultsError ? (
              loadingCandedateSubmittedResults ? (
                <div className="">Loading...</div>
              ) : (
                candedateSubmittedResultsErrorMsg
              )
            ) : candidateSubmittedResults?.length === 0 ? (
              "No test for selected candidate"
            ) : (
              <Box sx={{ height: 300, width: "100%" }}>
                <DataGrid
                  rows={candidateSubmittedResults || []}
                  columns={resultColumn}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => row?.resultId}
                  onRowSelectionModelChange={(result) => {
                    return setSelectedCandidateResults(result);
                  }}
                />
              </Box>
            )}
          </div>
        )}

        {
          <div className="bottomButtons">
            <Link
              to={`/labReport/${
                selectedCandidate && selectedCandidate.tests?.[0].candidateId
              }`}
              target="_blank"
            >
              <div className="authorize sendDetails">{leftBtnText}</div>
            </Link>
          </div>
        }
      </div>
      <div className="boxWrapper">
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
            getRowId={(row) =>
              row[0]?.clientId
                ? row[0]?.candidateId
                : row?.candidateName + row?.clientName
            }
            pagination
          />
        </Box>
      </div>
    </div>
  );
};

export default ReportsDatagrid;
