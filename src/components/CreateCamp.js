import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { config } from "./Constant";

import { campaignCreated } from "../actions";

const ToastComp = ({ show, onClose }) => {
  return (
    <ToastContainer>
      <Toast show={show.show} delay={3000} autohide onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">ALERT</strong>
        </Toast.Header>
        <Toast.Body>{show.msg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

const Campaign = ({ show, handleClose, action = "Create", data }) => {
  const USER = JSON.parse(sessionStorage.getItem("USER"));
  const [showToast, setshowToast] = useState({ show: false, msg: "" });
  const navigate = useNavigate();
  const toggleShow = () => setshowToast({ show: false, msg: "" });

  const dispatch = useDispatch();

  // const initialValues =
  //   action === "Create"
  //     ? {
  //         brand_name: "",
  //         campaign_name: "",
  //         logo: null,
  //         time_limit: "",
  //         brand_guidlines: "",
  //         static_meme: "",
  //         video_meme: "",
  //         gif: "",
  //       }
  //     : {
  //         brand_name: data.brand_name || "",
  //         campaign_name: data.campaign_name || "",
  //         logo: null,
  //         time_limit: data.time_limit || "",
  //         brand_guidlines: data.brand_guidlines || "",
  //         static_meme: data.static_meme || "",
  //         video_meme: data.video_meme || "",
  //         gif: data.gif || "",
  //       };

        const initialValues =
  action === "Create"
    ? {
        brand_name: "",
        campaign_name: "",
        logo: null,
        time_limit: "",
        brand_guidlines: "",
        static_meme: "",
        video_meme: "",
        gif: "",
        amt: "", // Added here
      }
    : {
        brand_name: data.brand_name || "",
        campaign_name: data.campaign_name || "",
        logo: null,
        time_limit: data.time_limit || "",
        brand_guidlines: data.brand_guidlines || "",
        static_meme: data.static_meme || "",
        video_meme: data.video_meme || "",
        gif: data.gif || "",
        amt: data.amt || "", // Added here
      };


  return (
    <>
      <ToastComp show={showToast} onClose={toggleShow} />
      <Modal show={show} onHide={() => handleClose()} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "Create" ? "Create Campaign" : "Update Campaign"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              let formData = new FormData();
              formData.append("brand_name", values.brand_name);
              formData.append("campaign_name", values.campaign_name);
              formData.append("file", values.logo);
              formData.append("time_limit", values.time_limit);
              formData.append("brand_guidlines", values.brand_guidlines);
              formData.append("static_meme", values.static_meme);
              formData.append("video_meme", values.video_meme);
              formData.append("gif", values.gif);
              formData.append("email", "info@marqueberry.com");
              formData.append("status", "Accepted");
              formData.append("amt", values.amt);

              const configr = {
                headers: { "content-type": "multipart/form-data" },
              };

              try {
                if (action === "Create") {
                  const res = await axios.post(
                    `${config.API_URL}/brand/saveinfo`,
                    formData,
                    configr
                  );
                  if (res.status === 200) {
                    handleClose();
                    dispatch(campaignCreated());
                    navigate("/dashboard/home");
                    window.location.reload(false);
                    alert("Created Campaign Successfully");
                  } else {
                    setshowToast({ show: true, msg: "Cannot Create Campaign" });
                  }
                } else {
                  const res = await axios.put(
                    `${config.API_URL}/brand/updateinfo/${data.Id}`,
                    formData
                  );
                  if (res.status === 200) {
                    handleClose();
                    dispatch(campaignCreated());
                    navigate("/dashboard/Dashboard");
                    window.location.reload(false);
                    alert("Updated Campaign Successfully");
                  } else {
                    setshowToast({ show: true, msg: "Cannot Update Campaign" });
                  }
                }
              } catch (error) {
                console.error("Error sending data:", error);
                setshowToast({
                  show: true,
                  msg: "An error occurred while sending data",
                });
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Field
                  name="brand_name"
                  placeholder="Brand Name"
                  required
                  value={values.brand_name}
                />
                <Field
                  name="campaign_name"
                  placeholder="Campaign Name"
                  required
                  value={values.campaign_name}
                />
                {action === "Create" && (
                  <div className="file-upload">
                    <p>Upload Logo</p>
                    <input
                      type="file"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        const maxSize = 5 * 1024 * 1024;
                        if (file && file.size <= maxSize) {
                          setFieldValue("logo", file);
                        } else {
                          alert("File size exceeds 5MB limit");
                          event.target.value = null;
                        }
                      }}
                    />
                  </div>
                )}

                <Field
                  as="textarea"
                  name="brand_guidlines"
                  placeholder="Description"
                  rows="5"
                  required
                  value={values.brand_guidlines}
                />
                <Field
                  name="static_meme"
                  placeholder="Static Meme Quantity"
                  type="number"
                  min="1"
                  required
                  value={values.static_meme}
                />
                <Field
                  name="video_meme"
                  placeholder="Video Meme Quantity"
                  type="number"
                  min="1"
                  required
                  value={values.video_meme}
                />
                <Field
                  name="gif"
                  placeholder="Gif Meme Quantity"
                  type="number"
                  min="1"
                  required
                  value={values.gif}
                />
                <Field
                  name="time_limit"
                  placeholder="Time Limit(Days)"
                  type="number"
                  min="1"
                  required
                  value={values.time_limit}
                />

                <Field
                  name="amt"
                  placeholder="Amount(Rs)"
                  type="number"
                  min="1"
                  required
                  value={values.amt}
                />
                <button type="submit" className="custom-btn">
                  {action === "Create" ? "Submit" : "Update"}
                </button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Campaign;
