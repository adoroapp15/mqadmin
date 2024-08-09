import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { config } from "../components/Constant";

function ViewCampaign() {
  const location = useLocation();

  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const rawId = queryParams.get('Id');
  const Id = decodeURIComponent(rawId);
  
  const [data, setData] = useState([]);

  // Fetch data from backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/app/user/getBrandCampaign`, {
        params: { Id }
      });
      setData(response.data.campaigndetails);
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
  
  
      // Construct the body object with a dynamic key in the data object
      const body = {
        campaign: 1,
        Name: Name,
        data: {
         "Array": datamil
        }
      };
  
  
      const response = await axios.post(`${config.API_URL}/app/user/saveresult`, body);
  
      if (response.status === 200) {
      
        await axios.post(`${config.API_URL}/app/user/send`, {
          title:`Result is Out`,
          body:`Campaign Result is Out.`
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleRankChange = (index, value) => {
    const newData = [...data];
    newData[index].rank = value;
    setData(newData);
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
                <a
                  href={`https://www.adoro.social/Campaign/${item.fileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://www.adoro.social/Campaign/${item.fileName}`}
                    alt="Description"
                    style={{ height: 100, width: 100 }}
                  />
                </a>
              </td>
              <td>
                <input
                  type="number"
                  value={item.rank || ''}
                  onChange={(e) => handleRankChange(index, e.target.value)}
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

export default ViewCampaign;
