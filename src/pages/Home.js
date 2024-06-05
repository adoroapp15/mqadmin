import React,{useState, useEffect} from "react";
import {Col,Row} from 'react-bootstrap';
import { config } from "../components/Constant";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCampaign } from "../actions";


const Home = () => {
    const [campaignCount, setCampaignCount ] = useState(0);
    const [pendingCampaignCount, setPendingCampaignCount] = useState(0)
    const userId = useSelector(state => state.userId)
    const dispatch = useDispatch();
   
    useEffect(() => {
        document.body.classList.add('hide-outer-logo');
        async function fetchData(){
           await axios.get(`${config.API_URL+'/brand/campaign'}`).then(res => {
                if(res.status === 200){
                    let campaignData = res.data.data
                    let tempArr = []
                    setCampaignCount(campaignData.length)
                    campaignData.map(i => {
                        if(i.Status === "pending"){
                            tempArr.push(i)
                        }
                    })
                    setPendingCampaignCount(tempArr.length)
                   dispatch(setCampaign(campaignData))
                }
            });

            
        }
        fetchData();
    
         
    },[userId])

    return( 
        <>
        <Col sm={12}>
            <div className="dashboard-welcome">
                <h3>Welcome {}</h3>
                <p>Here check latest updates on your project</p>
            </div>
        </Col>
        <Col sm={12}>
            <Row>
                <Col sm={3}>
                    <div className="dashboard-count">
                        <div className="dashboard-count-heading">
                            <p>Total no. of campaigns</p>
                        </div>
                        <div className="dashboard-count-content">
                            <p>{campaignCount}</p>
                            <Link to="/dashboard/campaigns" >View All</Link>
                        </div>
                    </div>
                </Col>
                <Col sm={3}>
                    <div className="dashboard-count">
                        <div className="dashboard-count-heading">
                            <p>Pending Approvals</p>
                        </div>
                        <div className="dashboard-count-content">
                            <p>{pendingCampaignCount}</p>
                            <Link to="/dashboard/pendingcampaigns">View All</Link>
                        </div>
                    </div>
                </Col>
                {/* <Col sm={3}>
                    <div className="dashboard-count">
                        <div className="dashboard-count-heading">
                            <p>Preview</p>
                        </div>
                        <div className="dashboard-count-content">
                            <p>0</p>
                            <Link to="/dashboard/campaigns">View All</Link>
                        </div>
                    </div>
                </Col> */}
                {/* <Col sm={3}>
                    <div className="dashboard-count">
                        <div className="dashboard-count-heading">
                            <p>Download Memes</p>
                        </div>
                        <div className="dashboard-count-content">
                            <p>0</p>
                            <Link to="/dashboard/campaigns">View All</Link>
                        </div>
                    </div>
                </Col> */}
            </Row>
        </Col>
        </>
    )
}

export default Home;