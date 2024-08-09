import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns } from '../actions';
import { Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import { config } from '../components/Constant';

const ModalC = ({ campaignDetail, show, handleClose }) => {
   // const [action, setAction] = useState('');

    const handleButtonClick = async (buttonName) => {
       // setAction(buttonName);
       // console.log("action is",action)
        await handleSubmit(buttonName);
    }

    const handleSubmit = async (action) => {
        
        try {
            const response = await axios.put(`${config.API_URL}/admin/action/${action}`, {'Id': campaignDetail.Id});
           
            if (response.status === 200) {
                alert("Status is changed successfully");
                handleClose()
            }
        } catch (error) {
            alert(error)
            console.error("Error:", error);
        }
    }
    

    return (
        <Modal show={show} onHide={() => handleClose()} >
            <Modal.Header closeButton>
                <Modal.Title>{campaignDetail.campaign_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ul>
                        <li>
                            <span className='modal-key'>Product Id: </span>
                            <span className='modal-value'>{campaignDetail.Id}</span>
                        </li>
                        <li>
                            <span className='modal-key'>Product Name: </span>
                            <span className='modal-value'>{campaignDetail.brand_name}</span>
                        </li>
                        <li>
                            <span className='modal-key'>Created On: </span>
                            <span className='modal-value'>{campaignDetail.date} &nbsp; {campaignDetail.time}</span>
                        </li>
                        <li>
                            <span className='modal-key'>Description: </span>
                            <span className='modal-value'>{campaignDetail.brand_guidlines}</span>
                        </li>
                        <li>
                            <span className='modal-key'>Logo: </span>
                            <span className='modal-value'>{campaignDetail.Logo}</span>
                        </li>
                        <li>
                            <span className='modal-key'>No of meme needed: </span>
                            <span className='modal-value'>{campaignDetail.static_meme+campaignDetail.video_meme}</span>
                        </li>
                        
                        <li>
                            <span className='modal-key'>Time Limit: </span>
                            <span className='modal-value'>{campaignDetail.time_limit}</span>
                        </li>
                        <li>
                            <span className='modal-key'>Status: </span>
                            <span className='modal-value'>{campaignDetail.Status}</span>
                        </li>
                        
                    </ul>
                <div className="d-flex justify-content-between">
                    <a className='custom-btn custom-btn-red' onClick={() => handleButtonClick('Accepted')}>Accept</a>
                    <a className='custom-btn' onClick={() => handleButtonClick('Reject')}>Reject</a>
                </div>
            </Modal.Body>
        </Modal>
    )
}

const Campaign = ({status}) => {

    const [campaignDetail, setCampaignDetail] = useState({})
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [data,setData]=useState()
    const [pendingcampiagn,setPendingcampaign]=useState([])
    
    const handleClose = (e) => {
        setShow(false)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user =sessionStorage.getItem('User')
                const res = await axios.get(`${config.API_URL}/brand/campaign`);
                // setData(res.data.data)
             const total=res.data.data
             const pending=[]
             total.map((i)=>{

                if (i.Status==='pending'){
                    pending.push(i)

                }
             })
             setData(pending)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    
        fetchData();
    }, []);
    



      const modal = (i) => {
        setShow(true)
        setCampaignDetail(i)

      }
    return (
        <>
         { show && <ModalC campaignDetail={campaignDetail} show={show} handleClose={handleClose}/>}
        <Col sm={12}>
            <Row>
                {
                    data !== undefined && data.map(i => (
                        <Col sm={6} md={3}>
                        <div className="dashboard-count">
                            <div className="dashboard-count-heading">
                                <p>{i.campaign_name}</p>
                            </div>
                            <div className="dashboard-count-content status">
                                <p>Status: {i.Status}</p>
                                <a className='custom-btn' onClick={() => modal(i)}>View</a>
                            </div>
                        </div>
                    </Col>
                    ))
                }
            </Row>
        </Col>
        </>
       
    )
}


export default Campaign;