// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { config } from "../components/Constant";
import { Alert } from "bootstrap";

function AllTemplate() {
  const location = useLocation();

  const [data, setData] = useState([]);

  // Fetch data from backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${config.API_URL}/app/user/alltemplates`
      );
      if (response.status == 200) {
        setData(response.data.templates);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      const re = await axios.post(`${config.API_URL}/app/user/${status}`, {
        Id: id,
      }); // Adjust the endpoint as per your backend API
      if (re.status == 200) {
        setData(data.filter((item) => item.Id !== id));
      } else {
        Alert("Could not Update the Post");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <h1>List of User's Templates</h1>
      {/* <button onClick={handleBulkStatusUpdate}>Change Status of All</button> */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>userName</th>
            {/* <th>Date_Time</th>
            <th>Category</th>
            <th>Caption</th>
            <th>Post</th>
            <th>Action</th> */}
            <th>Caption</th>
            <th>Category</th>
            <th>File </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{data.user}</td>
                <td>
                  <div
                    style={{
                      marginTop: "15px",
                      maxWidth: "300px",
                      wordWrap: "break-word",
                    }}
                  >
                    {data.caption}
                  </div>
                </td>

                <td> {data.category} </td>
                <td>
                  <a
                    href={`https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserTemplate/${data.fileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserTemplate/${data.fileName}`}
                      alt="Description"
                      style={{ height: 100, width: 100 }}
                    />
                  </a>
                </td>

                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleStatus(data.Id, "approvetemplate");
                    }}
                  >
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleStatus(data.Id, "rejecttemplate");
                    }}
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </a>
                </td>
                {/* <td>{data.date}</td>
                <td> {data.category} </td>

                <td>
                  <div
                    style={{
                      marginTop: "15px",
                      maxWidth: "300px",
                      wordWrap: "break-word",
                    }}
                  >
                    {data.content}
                  </div>
                </td>
                <td>
                  {" "}
                  <Link
                    to={`https://adoro-data-storage.s3.ap-south-1.amazonaws.com
 
 /UserPost/${data.fileName}`}
                  >
                    {data.type}
                  </Link>{" "}
                </td>
                <td>
                  <i
                    className="fa fa-check"
                    aria-hidden="true"
                    // onClick={() => handleStatusApprove(data.Id, "approve")}
                  ></i>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    // onClick={() => handleStatusReject(data.Id, "reject")}
                  ></i>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllTemplate;
