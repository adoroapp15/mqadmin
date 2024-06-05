import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns } from "../actions";
import { Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import { config } from "../components/Constant";
import CreateContest from "../components/CreateContest";
import { Link } from "react-router-dom";

const ModalC = ({ campaignDetail, show, handleClose }) => {
  return (
    <Modal show={show} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{campaignDetail.campaign_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li>
            <span className="modal-key">Name: </span>
            <span className="modal-value">{campaignDetail.contestName}</span>
          </li>
          <li>
            <span className="modal-key">Created On: </span>
            <span className="modal-value">{campaignDetail.date}</span>
          </li>
          <li>
            <span className="modal-key">Description: </span>
            <span className="modal-value">{campaignDetail.Description}</span>
          </li>

          <li>
            <span className="modal-key">Time Limit: </span>
            <span className="modal-value">{campaignDetail.time_limit}</span>
          </li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};
const AllContest = ({ status }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [campaignDetail, setCampaignDetail] = useState({});
  const [contest, setContest] = useState(false);
  const [action, setAction] = useState("Create");
  const [updatedata, setUpdatedata] = useState({});

  const handleClose = (e) => {
    setShow(false);
  };
  useEffect(() => {
    console.log(1223);
    const fetchData = async () => {
      try {
        const user = sessionStorage.getItem("User");
        console.log("user", user);
        const res = await axios.get(`${config.API_URL}/app/user/getallcontest`);
        setData(res.data.contest);
        console.log("response staa issssss", res.data);

        console.log("Done", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [action,updatedata]);

  const handleClosec = (e) => {
    setContest(false);
  };

  const modal = (i, action) => {
    setShow(true);
    setCampaignDetail(i);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <CreateContest
          status={contest}
          handleClose={handleClosec}
          action={action}
          data={updatedata}
        />
        <a
          className="custom-btn"
          onClick={() => {
            setContest(true);
            setAction("Create");
            setUpdatedata({})
          }}
        >
          + Contest
        </a>
      </div>

      {show && (
        <ModalC
          campaignDetail={campaignDetail}
          show={show}
          handleClose={handleClose}
        />
      )}
      <Col sm={12}>
        <Row>
          {data !== undefined &&
            data.map((i) => (
              <Col sm={6} md={3}>
                <div className="dashboard-count">
                  <div className="dashboard-count-heading">
                    <p>{i.contestName}</p>
                  </div>
                  <div className="dashboard-count-content status">
                    <i
                      className="fas fa-edit"
                      onClick={() => {
                        setContest(true);
                        setAction("Update");
                        setUpdatedata(i);
                      }}
                    ></i>
                    <Link
                      to={{
                        pathname: "/dashboard/view-applicants",
                        search: `?Id=${i.Id}`,
                      }}
                    >
                      Applicants
                    </Link>
                    <a className="custom-btn" onClick={() => modal(i)}>
                      View
                    </a>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Col>
    </>
    // <div className="campaign-table">
    //     <BootstrapTable
    //         bootstrap4
    //         keyField="id"
    //         data={data !== undefined && (status != undefined ? data.pendingCampaign : data.allCampaign)}
    //         columns={columns}
    //         pagination={paginationFactory({ sizePerPage: 5 })}
    //     />
    // </div>
  );
};

export default AllContest;
