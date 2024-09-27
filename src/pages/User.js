import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { config } from "../components/Constant";
import { Alert } from "bootstrap";

function User() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/app/user/user`);
      if (response.status === 200) {
        setData(response.data.templates);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveData = async () => {
    try {
      const response = await axios.post(
        `${config.API_URL}/app/user/saveresult`,
        {
          data: data.map((item) => ({
            userName: item.userName,
            contestName: item.contestName,
            rank: item.rank,
            mobileNo:item.mobileNo
            
          })),
        }
      );
      if (response.status === 200) {
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div>
      <h1>List of Users</h1>
      <div style={{ overflow: "auto" }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Mobile No</th>
              <th>Instagram</th>
              <th>BankName</th>
              <th>BenificiaryName</th>
              <th>AccountNo.</th>
              <th>IFSCCode</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.userName}</td>
                {/* <td>
                <Link to={`https://www.adoro.social/ContestApply/${item.fileName}`}>
                  {item.type}
                </Link>
              </td>
              <td>
                <input
                  type="number"
                  value={item.rank || ''}
                  onChange={(e) => {
                    const newData = [...data];
                    newData[index].rank = e.target.value;
                    setData(newData);
                  }}
                />
              </td> */}
                <td>{item.fullName}</td>
                <td>{item.mobileNo}</td>
                <td>{item.instaId}</td>
                <td>{item.bankName}</td>
                <td>{item.benificiaryName}</td>
                <td>{item.accountNo}</td>
                <td>{item.ifscCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
