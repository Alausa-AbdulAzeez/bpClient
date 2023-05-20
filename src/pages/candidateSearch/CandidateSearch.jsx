import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./candidateSearch.scss";
import searchImg from "../../utils/images/searchImg.png";
import CandidateSearchDatagrid from "../../components/candidateSearchDatagrid/CandidateSearchDatagrid";
import Loading from "../../components/loading/Loading";
import ErrorComponent from "../../components/error/Error";
import { publicRequest } from "../../functions/requestMethods";

const CandidateSearch = (props) => {
  // const [searched, setSearched] = useState(false);
  const loggedInUserRole = props.userDetails?.role;

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // FUNCTION TO GET AND SET ALL CANDIDATES
  const getAllCandidates = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("/Candidate");

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

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getAllCandidates();
  }, []);

  return (
    <div className="candidateSearchWrapper">
      <Sidebar loggedInUserRole={loggedInUserRole} />
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
                />

                <div className="candidateSearchBtn">Search</div>
              </div>
            </div>
            <div className="candidateSearchMainBottom">
              {/* {searched && (
              <>
                <img src={searchImg} alt="Search" className="searchImg" />
                <h3>Nothing to see here, yet</h3>
              </>
            )} */}
              {<CandidateSearchDatagrid userDetails={props.userDetails} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateSearch;
