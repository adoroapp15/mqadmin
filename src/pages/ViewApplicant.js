import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { config } from "../components/Constant";

function ViewApplicant() {
  const location = useLocation();

  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const Id = queryParams.get('Id');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/app/user/contestapplicants`, {
        params: { Id }
      });
      if (response.status === 200) {
        setData(response.data.applicants);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveData = async () => {
    try {
      // Sort the data by rank (ascending) and select the top 5
      const sortedData = data
        .filter(item => item.rank !== undefined && item.rank !== '')
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 5);
  
      const datamil = sortedData.map(item => ({
        userName: item.userName,
        contestName: item.contestName,
        rank: item.rank
      }));
  
      const Name = datamil[0]?.contestName || ''; // Use optional chaining to avoid errors if datamil is empty
  
      const body = {
        campaign: 0,
        Name: Name,
        data: {
         "Array": datamil
        }
      };
  
  
      const response = await axios.post(`${config.API_URL}/app/user/saveresult`, body);
  
      if (response.status === 200) {
        await axios.post(`${config.API_URL}/app/user/send`, {
          title:`Result is Out`,
          body:`Contest Result is Out.`
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  

  return (
    <div>
      <h1>List of Applicants</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Username</th>
            <th>File</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.userName}</td>
              <td>
                <a href={`https://www.adoro.social/ContestApply/${item.fileName}`} target="_blank" rel="noopener noreferrer">
                  <img src={`https://www.adoro.social/ContestApply/${item.fileName}`} alt="Description" style={{ height: 100, width: 100 }} />
                </a>
              </td>
              <td>
                <input
                  type="number"
                  value={item.rank || ''}
                  onChange={(e) => {
                    const newData = [...data];
                    newData[index].rank = parseInt(e.target.value, 10);
                    setData(newData);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <button className="custom-btn" onClick={saveData}>Save</button>
      </div>
    </div>
  );
}

export default ViewApplicant;
