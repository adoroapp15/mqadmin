import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { config } from "../components/Constant";

const CreateContest = ({ status, handleClose, action, data }) => {
  const [formData, setFormData] = useState({
    file: null,
    Description: "",
    contestName: "",
    time: 0,
  });

  useEffect(() => {
    if (action === "Create") {
      setFormData({
        file: null,
        Description: "",
        contestName: "",
        time: 0,
      });
    } else {
      setFormData({
        file: data.fileName ? data.fileName : null,
        Description: data.Description || "",
        contestName: data.contestName || "",
        time: data.time_limit || 0,
      });
    }
  }, [action, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const configr = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      console.log('formmmmmmm dataaaaa',formData)
      if (action === 'Create') {
        console.log('creatinggggggggg')
        await axios.post(`${config.API_URL}/app/user/createcontest`, formData, configr);
        alert('Contest Created Successfully');
      } else {
        console.log('updattttttinggggggg')
        const response = await axios.put(`${config.API_URL}/app/user/updatecontest/${data.Id}`, formData, configr);
       if (response.status==200){
        alert('Contest Updated Successfully');
       }
      }
      handleClose();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <Modal
      show={status}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{action === "Create" ? "Create Contest" : "Edit Contest"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row main-row_header mt-3">
            <div className="col-md-12">
              <input
                type="file"
                className="form-control"
                id="logo"
                name="file"
                onChange={handleFileChange}
                required={action === "Create"}
              />
            </div>
          </div>

          <div className="row main-row_header mt-3">
            <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                name="contestName"
                placeholder="Contest Name"
                value={formData.contestName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row main-row_header mt-3">
            <div className="col-md-12">
              <input
                type="number"
                className="form-control"
                name="time"
                placeholder="Time Limit"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row main-row_header mt-3">
            <div className="col-md-12">
              <textarea
                type="text"
                className="form-control"
                name="Description"
                placeholder="Description"
                value={formData.Description}
                onChange={handleInputChange}
                required
                rows={5}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <div>
              <button type="submit" className="btn btn-success single-click">
                {action}
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateContest;
