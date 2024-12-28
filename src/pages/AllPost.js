// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../components/Constant";
import { Alert } from "bootstrap";

function AllPost() {
  const [data, setData] = useState([]);

  // Fetch data from backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/app/user/allpost`);
     
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStatusReject = async (id, status) => {
    try {
      const re = await axios.delete(`${config.API_URL}/app/user/rejectpost`, {
        params: { Id: id },
      }); 

    
      if (re.status == 200) {
        setData(data.filter((item) => item.Id !== id));
      } else {
        Alert("Could not Update the Post");
      }
    } catch (error) {
      console.error("Error Deletin status:", error);
    }
  };

  const handleStatusApprove = async (id, status) => {
    try {
      const re = await axios.post(`${config.API_URL}/app/user/approvepost`, {
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
      <h1>List of Posts</h1>
      {/* <button onClick={handleBulkStatusUpdate}>Change Status of All</button> */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>FullName</th>
            <th>Date_Time</th>
            <th>Category</th>
            <th>Caption</th>
            <th>Post</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.fullName}</td>
                <td>{data.date}</td>
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
                  <a
                    href={`https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserPost/${data.fileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserPost/${data.fileName}`}
                      alt="Description"
                      style={{ height: 100, width: 100 }}
                    />
                  </a>
                </td>
                
                <td>
                  <a
                    href="#"
                    onClick={() => handleStatusApprove(data.Id, "approve")}
                  >
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a
                    href="#"
                    onClick={() => handleStatusReject(data.Id, "reject")}
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllPost;
