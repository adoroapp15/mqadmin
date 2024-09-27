// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { config } from "../components/Constant";
import { Alert } from "bootstrap";
import CreateCampaign from "../components/CreateCampaign";
import Edit from "../components/Blog";

function Blog() {
  const location = useLocation();

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [edit, setEdit] = useState({});

  // Fetch data from backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/admin/getBlog`);
      if (response.status == 200) {
        console.log("responseeeeeeeeeee", response);
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStatus = async (data) => {
    setEdit(data);
    handleShow(true);
    // try {
    //   const re = await axios.post(`${config.API_URL}/app/user/${status}`, {
    //     Id: id,
    //   });
    //   if (re.status == 200) {
    //     setData(data.filter((item) => item.Id !== id));
    //   } else {
    //     Alert("Could not Update the Post");
    //   }
    // } catch (error) {
    //   console.error("Error updating status:", error);
    // }
  };

  return (
    <div>
      <Edit status={show} handleClose={handleClose} type={"Blog"} data={edit} />
      <h1>Blog</h1>
      {/* <button onClick={handleBulkStatusUpdate}>Change Status of All</button> */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Header</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>
                  <div
                    style={{
                      marginTop: "15px",
                      maxWidth: "300px",
                      wordWrap: "break-word",
                    }}
                  >
                    {data.Header}
                  </div>
                </td>

                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleStatus(data);
                    }}
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {/* <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleStatus(data.Id, "rejecttemplate");
                    }}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Blog;
