import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { config } from "../components/Constant";
import { Editor } from "@tinymce/tinymce-react";

const CreateCampaign = ({ status, handleClose }) => {
  const [formData, setFormData] = useState({
    file: null,
    content: "",
    header: "",
  });

  const [saveType, setSaveType] = useState(null);

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

  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      content: content,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("formdata");
    if (!saveType) {
      console.error("Please select Blog or Case Study");
      return;
    }
    const configr = {
      headers: { "content-type": "multipart/form-data" },
    };
    console.log(formData);
    try {
      await axios
        .post(`${config.API_URL}/admin/save/${saveType}`, formData, configr)
        .then((res) => {
          if (res.status === 200) 
          alert(`${saveType} is saved successfully`)
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
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
        <Modal.Title>Create Blog or CaseStudy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row main-row_header mt-3">
            <div className="col-md-20">
              <input
                type="file"
                className="form-control"
                id="logo"
                name="file"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>

          <div className="row main-row_header mt-3">
            <div className="col-md-20">
              <input
                type="text"
                className="form-control"
                name="header"
                placeholder="Header"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row main-row_header mt-3">
            <Editor
              apiKey="w5d68fz7nax5tcy1iq6i57gm7noite7eiyl1l7tqk4a9svcv"
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          <div className="d-flex justify-content-between mt-3">
            <div>
              <button
                type="submit"
                className="btn btn-success single-click"
                onClick={() => setSaveType("Blog")}
              >
                Add Blog
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-success single-click"
                onClick={() => setSaveType("CaseStudy")}
              >
                Add Case Study
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCampaign;
