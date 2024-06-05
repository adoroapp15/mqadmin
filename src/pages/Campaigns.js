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

const ModalC =({campaignDetail, show, handleClose}) => {
   
    return (
        <Modal show={show} onHide={() => handleClose()}>
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
                </Modal.Body>
            </Modal>
    )
}
const Campaigns = ({status}) => {
    
 
    const [campaignDetail, setCampaignDetail] = useState({})
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [data,setData]=useState()
    const [pendingcampiagn,setPendingcampaign]=useState([])
    
    const handleClose = (e) => {
        setShow(false)
    }
    useEffect(() => {
        console.log(1223)
        const fetchData = async () => {
            try {
                const user =sessionStorage.getItem('User')
                console.log("user",user)
                const res = await axios.get(`${config.API_URL}/brand/campaign`);
                setData(res.data.data)
             

                console.log("Done", data);
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


export default Campaigns;