import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { MdCancel, MdEdit } from "react-icons/md";
import "./candidateSearchDatagrid.scss";
import { BsTrashFill } from "react-icons/bs";
import AlertDialogSlide from "../Dialogue";
import { toast } from "react-toastify";
import { publicRequest } from "../../functions/requestMethods";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Autocomplete, TextField } from "@mui/material";
import DatePicker from "react-datepicker";

const CandidateSearchDatagrid = (props) => {
  // MISCELLANEOUS
  const toastId = React.useRef(null);

  // DATE SELECTION
  const [startDate, setStartDate] = useState(null);

  // ROWS PER PAGE
  const [pageSize, setPageSize] = useState(5);

  // INITIAL SLIDE
  const [position, setPosition] = useState("-100%");

  // DATA FOR TOGGLE ALERT
  const [open, setOpen] = React.useState(false);

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [selectedCandidate, setSelecedCandidate] = useState({});

  // TEST CATEGORY LIST
  const [testCategory, setTestCategory] = useState([]);

  // CANDIDATE TO BE EDITED INFO
  const [candidateToBeEdited, setCandidateToBeEdited] = useState(null);

  // DATA TO BE DISPLAYED IN THE INPUTS AND SENT TO THE BACKEND
  const [updatedCandidateInfo, setUpdatedCandidateInfo] = useState(null);

  // CANDIDATE TO BE DELETED INFO
  const [candidateToBeDeleted, setCandidateToBeDeleted] = useState(null);

  // GET CURRENT USER TOKEN
  const token = useSelector((state) => state?.user?.currentUser?.data?.token);

  // handlerowclick function
  const showSlide = (props) => {
    // getCandidate(props?.row)
    setCandidateToBeEdited(props?.row);
    setUpdatedCandidateInfo(props?.row);
    if (position !== "0") {
      setPosition("0");
    }
  };
  // end of  handlerowclick function

  // DATE SELECTION AND CHANGE FUNCTIONALITIES
  // function for handling date chande
  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    setUpdatedCandidateInfo((prev) => {
      return {
        ...prev,
        appointmentdate: selectedDate?.toISOString(),
      };
    });

    // end of function for handling date chande
  };
  // END OF DATE SELECTION AND CHANGE FUNCTIONALITIES

  // function for seting candidate info
  const handleUpdateCandidateInfo = (e, dataName, data) => {
    if (dataName === "testCategory") {
      setUpdatedCandidateInfo((prev) => {
        return {
          ...prev,
          testcategory: data?.categoryName,
        };
      });
    } else {
      setUpdatedCandidateInfo((prev) => {
        return {
          ...prev,
          [dataName]: e.target.value,
        };
      });
    }
  };
  // end of function for seting candidate info

  // UPDATE USER FUNCTION
  const handleUpdateUser = async () => {
    toastId.current = toast("Please wait...", {
      autoClose: 3000,
      isLoading: true,
    });

    try {
      await publicRequest
        .put(
          `Candidate/EditbyCID?Candidateid=${candidateToBeEdited?.candidateId}`,
          updatedCandidateInfo,
          {
            headers: {
              Accept: "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.update(toastId.current, {
            render: "Candidate updated succesfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        })
        .then(() => {
          getAllCandidates().then(() => {
            setPosition("-100%");
          });
          // setPosition("-100%");
        });
      // .then(() => {

      //   window.location.reload();
      // });
    } catch (error) {
      console.log(error);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 3000,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Something went wrong, please try again"
        }`,
      });
    }
  };
  // END OF UPDATE USER FUNCTION

  // FUNCTION TO DELETE SINGLE CANDIDTE
  const handleDeleteCandidate = async () => {
    try {
      await publicRequest
        .delete(
          `Candidate/DeleteByID?Candidateid=${Number(
            candidateToBeDeleted?.row?.candidateId
          )}`,
          {
            headers: {
              Accept: "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success("Candidate deleted successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setOpen(false);
        })
        .then(async () => {
          return await props?.getAllCandidates();
        });
    } catch (error) {
      console.log(error);
      toast.error("Could not delete candidate. Try again", {
        position: "top-right",
        // autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOpen(false);
    }
  };
  // END OF FUNCTION TO DELETE SINGLE CANDIDTE

  // FUNCTIONS TO TOGGLE ALERT SLIDE
  const handleClickOpen = (props) => {
    setOpen(true);
    setCandidateToBeDeleted(props);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // END OF FUNCTIONS TO TOGGLE ALERT SLIDE

  let rows = props?.tableData;
  const columns = [
    {
      field: "candidateName",
      headerName: "Name",
      width: 250,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      editable: false,
    },
    {
      field: "appointmentdate",
      headerName: "Appointment Date",
      width: 200,
      editable: false,
      description: "The candidate shoul be present by this date",
      renderCell: (props) => {
        const refinedDate = new Date(props?.value);
        const dateWithRightFormat = format(refinedDate, "dd-MMM-yyyy");
        return <div>{dateWithRightFormat}</div>;
      },
    },
    {
      field: "testcategory",
      headerName: "Test Category",
      width: 200,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: false,
    },

    {
      field: "createdDate",
      headerName: "Date Created",
      width: 150,
      editable: false,
      renderCell: (props) => {
        const refinedDate = new Date(props?.value);
        const dateWithRightFormat = format(refinedDate, "dd-MMM-yyyy");
        return <div>{dateWithRightFormat}</div>;
      },
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Action',

    //   sortable: false,
    //   width: 260,
    //   renderCell: (props) => {
    //     return (
    //       <div className='buttons'>
    //         <div
    //           className='editWrapper'
    //           style={{ cursor: 'pointer' }}
    //           onClick={() => showSlide(props)}
    //         >
    //           <div className='edit'>Edit</div>
    //           <MdEdit className='editIcon' />
    //         </div>
    //         <div className='deleteWrapper' style={{ cursor: 'pointer' }}>
    //           <div
    //             className='delete'
    //             style={{ cursor: 'pointer' }}
    //             onClick={() => handleClickOpen(props)}
    //           >
    //             Delete
    //           </div>
    //           <BsTrashFill className='deleteIcon' />
    //         </div>
    //       </div>
    //     )
    //   },
    // },
  ];

  // GRID TITLE
  let title = "Candiates";

  // eslint-disable-next-line react/prop-types
  const loggedInUserRole = props.userDetails?.role;
  // const loggedInUserRole = 'phlebotomist'
  // const loggedInUserRole = 'receptionist'

  // SET SIDE INFO POSITION
  const handleSetPosition = () => {
    setPosition("0");
  };
  // END OF SET SIDE INFO POSITION

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    setSelecedCandidate(row?.row);
    if (position !== "0") {
      setPosition("0");
    }

    console.log(row, e);
  };
  // END OF HANDLE ROW CLICK

  // HANDLE SLIDE HIDE
  const handleHideSlide = () => {
    setPosition("-100%");
  };
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

  // function to get all TestCategories
  const getAllTestCategories = async () => {
    try {
      const res = await publicRequest.get(
        `Test/test-category/${updatedCandidateInfo.clientid}`,
        {
          headers: {
            Accept: "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        setTestCategory(res.data?.data);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // end of function to get all TestCategories

  useEffect(() => {
    getAllTestCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedCandidateInfo]);

  // USEEFFECT TO UPDATE SELECTED ROW
  useEffect(() => {}, [selectedCandidate]);

  return (
    <div className="datagridWraper">
      <AlertDialogSlide
        open={open}
        handleClose={handleClose}
        title="Delete"
        link="/scheduleCandidate"
        message="Warning!! Are you sure you want to delete this candidate? Action cannot be undone"
        action={handleDeleteCandidate}
      />
      <div
        className={position === "-100%" ? "zeroWidth" : "slide"}
        style={{ right: position }}
      >
        <div className="slideTop">
          <div className="cancelconWrapper" onClick={handleHideSlide}>
            <MdCancel className="cancelIcon" />
          </div>
          <div className="initials">
            {selectedCandidate?.candidateName &&
              selectedCandidate?.candidateName[0]?.toUpperCase()}
          </div>
          <div className="slideFullname">
            {selectedCandidate?.candidateName?.toUpperCase()}
          </div>
        </div>
        <div className="companyName h3">
          <h3>Company Name</h3>
          <p>{selectedCandidate?.phoneNumber}</p>
        </div>

        <div className="phoneNo h3">
          <h3>Candidate Phone Number</h3>
          <p>{selectedCandidate?.phoneNumber}</p>
        </div>
        <div className="numberOfTests h3">
          <h3>{"Candidate's Email"}</h3>
          <p>{selectedCandidate?.email}</p>
        </div>
        {/* <div className='updateUserSlideBottom'>
          <div className='updateUserInputWrapper'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              className='updateUserInput'
              value={updatedCandidateInfo?.email}
              onChange={(e) => handleUpdateCandidateInfo(e, 'email')}
            />
          </div>
          <div className='updateUserInputWrapper'>
            <label htmlFor='phoneNo'>Phone Number</label>
            <input
              type='text'
              id='phoneNo'
              className='updateUserInput'
              value={updatedCandidateInfo?.phoneNumber}
              onChange={(e) => handleUpdateCandidateInfo(e, 'phoneNumber')}
            />
          </div>
          <div className='updateUserInputWrapper'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              className='updateUserInput'
              value={updatedCandidateInfo?.address}
              onChange={(e) => handleUpdateCandidateInfo(e, 'address')}
            />
          </div>
          <div className='updateUserInputWrapper'>
            <label htmlFor='testCategory' style={{ visibility: 'hidden' }}>
              Test Category
            </label>
            

            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={testCategory}
              getOptionLabel={(option) => `${option.categoryName}`}
              onChange={(e, option) =>
                handleUpdateCandidateInfo(e, 'testCategory', option)
              }
              sx={{ width: 300, alignSelf: 'flex-end' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={updatedCandidateInfo?.testcategory}
                />
              )}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.categoryName}
                  </li>
                )
              }}
            />
          </div>
          <div className='updateUserInputWrapper'>
            <label htmlFor='email'>Appointment Date</label>
            <DatePicker
              selected={startDate}
              onChange={(selectedDate) => handleDateChange(selectedDate)}
              dateFormat='MMMM d, yyyy'
              className='updateUserDatePicker'
              showMonthDropdown
              showYearDropdown
              minDate={new Date()}
              placeholderText={
                candidateToBeEdited &&
                format(
                  new Date(candidateToBeEdited?.appointmentdate),
                  'dd-MMM-yyyy'
                )
              }
            />
          </div>
        </div>
        <div className='updateUserBtn' onClick={handleUpdateUser}>
          Update
        </div> */}
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
            getRowId={(row) => row?.candidateId}
            pagination
          />
        </Box>
      </div>
    </div>
  );
};

export default CandidateSearchDatagrid;
