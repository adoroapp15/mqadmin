import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../components/Constant";

function AllSupport() {
  const [data, setData] = useState([]);

  // Fetch data from backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/app/user/support`);
      if (response.status === 200) {
        console.log("response is", response.data);
        setData(response.data.queries.map(item => ({ ...item, response: '' }))); // Initialize response field
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveData = async () => {
    try {
      const response = await axios.post(`${config.API_URL}/app/user/saveresult`, {
        data: data.map(item => ({ userName: item.userName, contestName: item.contestName, rank: item.rank }))
      });
      if (response.status === 200) {
        console.log("Data saved successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleResponseChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].response = value.slice(0, 10000); // Limit the input to 10000 characters
    setData(updatedData);
  };

  const sendResponse = async (email, response) => {
    console.log('email and response isssssss',email,response)
    try {
      const res = await axios.post(`${config.API_URL}/app/user/sendresponse`, {
        email,
        response
      });
      if (res.status === 200) {
        console.log("Response sent successfully");
      }
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };

  return (
    <div>
      <h1>Support Query</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Message</th>
            <th>Response</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>
                <div
                  style={{
                    marginTop: "15px",
                    maxWidth: "300px",
                    wordWrap: "break-word",
                  }}
                >
                  {item.message}
                </div>
              </td>
              <td>
              <textarea
                  value={item.response}
                  onChange={(e) => handleResponseChange(index, e.target.value)}
                  maxLength="10000"
                  style={{ width: '100%', resize: 'vertical' }} // Added resize property
                  rows={3} // Initial number of rows
                />
              </td>
              <td>
                <button className="custom-btn" onClick={() => sendResponse(item.email, item.response)}>Send</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
}

export default AllSupport;
