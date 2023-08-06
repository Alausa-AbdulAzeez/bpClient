import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./pendingCandidates.scss";
import PendingCandidatesDatagrid from "../../components/pendingCandidatesDatagrid/PendingCandidatesDatagrid";
import { useSelector } from "react-redux";
import { publicRequest } from "../../functions/requestMethods";
import Loading from "../../components/loading/Loading";
import ErrorComponent from "../../components/error/Error";

const PendingCandidates = () => {
  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user);
  const loggedInUserRole = currentUser?.data?.role;
  const userName = currentUser?.data?.profile?.fullName;

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // TABLE DATA
  const [tableData, setTableData] = useState([]);
  const [searchedTableData, setSearchedTableData] = useState([]);

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // END OF LOADING AND ERROR DATA

  // FUNCTION TO GET AND SET PENDING CANDIDATES
  const getPendingCandidates = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("/Candidate/stage", {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setTableData(res.data?.data === "" ? [] : res.data?.data);
        setSearchedTableData(res.data?.data === "" ? [] : res.data?.data);
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
  // END OF FUNCTION TO GET AND SET PENDING CANDIDATES

  // SEARCH FUNCTIONALITY
  const handleSearchParamsChange = (e) => {
    let filteredPendingCandidatesArray;
    filteredPendingCandidatesArray = tableData.filter((tableDatum) =>
      tableDatum?.candidateName
        ?.toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    );
    setSearchedTableData(filteredPendingCandidatesArray);
    // console.log(filteredPendingCandidatesArray)
  };
  // END OF SEARCH FUNCTIONALITY

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getPendingCandidates();
  }, []);

  return (
    <div className="pendingCandidatesWrapper">
      <Sidebar loggedInUserRole={loggedInUserRole} />
      <div className="pendingCandidatesRight">
        <Topber userName={userName} />
        <div className="pendingCandidatesMainWrapper">
          <div className="pendingCandidatesMainTop">
            <h3 className="pendingCandidatesMainTopTitle">Search</h3>
            <div className="pendingCandidatesMainTopForm">
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
                label="Candidate name"
                type="search"
                className="candidateName"
                onChange={(e) => handleSearchParamsChange(e)}
              />

              <div className="pendingCandidatesBtn">Search</div>
            </div>
          </div>
          <div className="pendingCandidatesMainBottom">
            {loading || error ? (
              loading ? (
                <Loading />
              ) : (
                <ErrorComponent errorMessage={errorMessage && errorMessage} />
              )
            ) : (
              <PendingCandidatesDatagrid
                userDetails={currentUser}
                tableData={searchedTableData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingCandidates;
