import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./candidateSearch.scss";
import CandidateSearchDatagrid from "../../components/candidateSearchDatagrid/CandidateSearchDatagrid";
import Loading from "../../components/loading/Loading";
import ErrorComponent from "../../components/error/Error";
import { publicRequest } from "../../functions/requestMethods";
import { useSelector } from "react-redux";
import { RxReload } from "react-icons/rx";
import { toast } from "react-toastify";

const CandidateSearch = (props) => {
  // MISCELLANEOUS
  const toastId = React.useRef(null);

  // LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user);
  const clientId = currentUser?.data?.profile?.clientId;

  //

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // CANDIDATE'S PHONE NUMBER
  const [phoneNumber, setPhoneNumber] = useState("");

  // CANDIDATES
  const [rows, setRows] = useState([]);

  // FUNCTION TO GET AND SET ALL CANDIDATES
  const getAllCandidates = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get(
        `/Candidate/SearchByClientID?Clientid=${clientId}`,
        {
          headers: {
            Accept: "*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        setRows(res.data?.data?.reverse());
        setLoading(false);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error);

      console.log(error);
    }
  };
  // END OF FUNCTION TO GET AND SET ALL CANDIDATES

  // FUNCTION TO HANDLE PHONE NUMBER CHANGE
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target?.value);
  };
  // END OF FUNCTION TO HANDLE PHONE NUMBER CHANGE

  // FUNCTION TO HANDLE CANDIDATE SEARCH
  const handleCandidateSearch = async () => {
    toastId.current = toast("Please wait...", {
      autoClose: 3000,
      isLoading: true,
    });
    try {
      const res = await publicRequest.get(
        `Candidate/SearchByPhoneNumber?Clientid=${clientId}&phone=${phoneNumber?.trim()}`,
        {
          headers: {
            Accept: "*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data?.data?.length === 0) {
        throw new Error("Candidate not found");
      } else {
        toast.update(toastId.current, {
          render: "Candidate found!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setRows(res?.data?.data);
      }
    } catch (error) {
      console.log(error.message);
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
  // END FUNCTION TO HANDLE CANDIDATE SEARCH

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getAllCandidates();
  }, []);

  return (
    <div className="candidateSearchWrapper">
      <Sidebar />
      <div className="candidateSearchRight">
        <Topber userName={props?.userDetails?.name} />
        {loading || error ? (
          loading ? (
            <Loading />
          ) : (
            <ErrorComponent errorMessage={errorMessage && errorMessage} />
          )
        ) : (
          <div className="candidateSearchMainWrapper">
            <div className="candidateSearchMainTop">
              <h3 className="candidateSearchMainTopTitle">Search</h3>
              <div className="candidateSearchMainTopForm">
                {/* <FormControl className='companySelect'>
                <InputLabel id='demo-simple-select-label'>
                  Company name
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  //   value={age}
                  label='Company name'
                  //   onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
                <TextField
                  id="outlined-search"
                  label="Candidate Phone no"
                  type="search"
                  className="candidateName"
                  onChange={(e) => handlePhoneNumberChange(e)}
                />

                <div
                  className="candidateSearchBtn"
                  onClick={handleCandidateSearch}
                >
                  Search
                </div>
                <button className="reloadBtn" onClick={getAllCandidates}>
                  Show All
                  <span>
                    <RxReload className="reloadIcon" />
                  </span>
                </button>
              </div>
            </div>
            <div className="candidateSearchMainBottom">
              {loading || error ? (
                loading ? (
                  <Loading />
                ) : (
                  <ErrorComponent errorMessage={errorMessage && errorMessage} />
                )
              ) : (
                <CandidateSearchDatagrid
                  userDetails={currentUser}
                  tableData={rows}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateSearch;
