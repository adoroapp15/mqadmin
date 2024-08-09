import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { config } from "../components/Constant";
import { Editor } from "@tinymce/tinymce-react";

const Edit = ({ status, handleClose, type, data }) => {
  const [formData, setFormData] = useState({
    file: data.Image || "",
    content: data.Content || "",
    header: data.Header || "",
  });

  useEffect(() => {
    setFormData({
      file: data.Image,
      content: data.Content,
      header: data.Header,
    });
  }, [data]);

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

    if (!type) {
      return;
    }
    const configr = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
        console.log('fffffff',formData.file)

      await axios
        .put(`${config.API_URL}/admin/update/${type}`, formData, configr)
        .then((res) => {
          if (res.status === 200) alert(`${type} is updated successfully`);
          handleClose();
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
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
        <Modal.Title>Edit {type}</Modal.Title>
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
              />
            </div>
          </div>

          <div className="row main-row_header mt-3">
            <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                name="header"
                onChange={handleInputChange}
                value={formData.header}
                required
              />
            </div>
          </div>

          <div className="row main-row_header mt-3">
            <Editor
              apiKey="w5d68fz7nax5tcy1iq6i57gm7noite7eiyl1l7tqk4a9svcv"
              value={formData.content}
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
              <button type="submit" className="btn btn-success single-click">
                Update {type}
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Edit;
