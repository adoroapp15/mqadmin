import React, { useState, useEffect } from "react";
import { Tab, Tabs, Col, Row, Modal } from "react-bootstrap";
import axios from "axios";
import { config } from "../components/Constant";
import { Link } from "react-router-dom";

const ModalC = ({ campaignDetail, show, handleClose }) => {
  console.log("modaling");
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{campaignDetail.campaign_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <ul>
          <li>
            <span className="modal-key">Product Id: </span>
            <span className="modal-value">{campaignDetail.Id}</span>
          </li>
          <li>
            <span className="modal-key">Product Name: </span>
            <span className="modal-value">{campaignDetail.brand_name}</span>
          </li>
          <li>
            <span className="modal-key">Created On: </span>
            <span className="modal-value">
              {campaignDetail.date} &nbsp; {campaignDetail.time}
            </span>
          </li>
          <li>
            <span className="modal-key">Description: </span>
            <span className="modal-value">
              {campaignDetail.brand_guidlines}
            </span>
          </li>
          <li>
            <span className="modal-key">Logo: </span>
            <span className="modal-value">{campaignDetail.Logo}</span>
          </li>
          <li>
            <span className="modal-key">No of meme needed: </span>
            <span className="modal-value">
              {campaignDetail.static_meme + campaignDetail.video_meme}
            </span>
          </li>

          <li>
            <span className="modal-key">Time Limit: </span>
            <span className="modal-value">{campaignDetail.time_limit}</span>
          </li>
          <li>
            <span className="modal-key">Status: </span>
            <span className="modal-value">{campaignDetail.Status}</span>
          </li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};

const handlecomplete = async (Id) => {
  try {
    const response = await axios.put(
      `${config.API_URL}/admin/action/Completed`,
      { Id }
    );

    if (response.status === 200) {
      alert("Status is changed successfully");
    }
  } catch (error) {
    alert(error);
    console.error("Error:", error);
  }
};

const ProjectItem = ({ campaign, onClickView }) => {
  console.log("project");
  return (
    <Row>
      <Col md={6}>
        <div className="project-item">
          <h2>{campaign.campaign_name}</h2>
          <div className="project-item-content">
            {campaign.Status != "pending" && (
              <>
                <Link
                  to={{
                    pathname: "/dashboard/view-campaigns",
                    search: `?Id=${campaign.Id}`,
                  }}
                >
                  Applicants
                </Link>
               
              </>
            )}
            {campaign.Status === "Accepted" && (
              <>
              <button
                  className="custom-btn"
                  onClick={() => handlecomplete(campaign.Id)}
                >
                  Finish
                </button>
               
              </>
            )}

            <button
              className="custom-btn"
              onClick={() => onClickView(campaign)}
            >
              View
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

const AllProjects = () => {
  const [campaignData, setCampaignData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = sessionStorage.getItem("User");
        const res = await axios.get(`${config.API_URL}/brand/campaign`);
        setCampaignData(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterCampaignsByStatus = (status) => {
    if (status === "all") {
      return campaignData;
    }
    return campaignData.filter((campaign) => campaign.Status === status);
  };

  const handleViewClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  return (
    <Col md={12}>
      <Tabs
        defaultActiveKey="all"
        id="uncontrolled-tab-example"
        className="mb-3"
        onSelect={(eventKey) => setSelectedStatus(eventKey)}
      >
        <Tab eventKey="all" title="All">
          {filterCampaignsByStatus("all").map((campaign, index) => (
            //<ProjectItem key={index} campaign={campaign} onClickView={handleViewClick} />
            <ProjectItem
              key={index}
              campaign={campaign}
              onClickView={handleViewClick}
            />
          ))}
        </Tab>
        <Tab eventKey="pending" title="Pending">
          {filterCampaignsByStatus("pending").map((campaign, index) => (
            <ProjectItem
              key={index}
              campaign={campaign}
              onClickView={handleViewClick}
            />
          ))}
        </Tab>
        <Tab eventKey="active" title="Accepted">
          {filterCampaignsByStatus("Accepted").map((campaign, index) => (
            <ProjectItem
              key={index}
              campaign={campaign}
              onClickView={handleViewClick}
            />
          ))}
        </Tab>
        <Tab eventKey="completed" title="Completed">
          {filterCampaignsByStatus("Completed").map((campaign, index) => (
            <ProjectItem
              key={index}
              campaign={campaign}
              onClickView={handleViewClick}
            />
          ))}
        </Tab>
      </Tabs>

      {selectedCampaign && (
        <ModalC
          campaignDetail={selectedCampaign}
          show={!!selectedCampaign}
          handleClose={() => setSelectedCampaign(null)}
        />
      )}
    </Col>
  );
};

export default AllProjects;
