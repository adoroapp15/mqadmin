import axios from "axios";
import { config } from "../components/Constant";

const USER = sessionStorage.getItem("USER")
const userId = JSON.parse(USER)


const fetchCampaigns = () => async (dispatch) => {
    console.log("oyyyyyyy");
    try {
        const res = await axios.get(`${config.API_URL}/brand/campaign/${userId.email}`);
        console.log("ress",res)
        if (res.status === 200) {
            console.log(res);
            let allCampaign = res.data.data;
            let pendingCampaign = [];
            let completedCampaign = [];
            let activeCampaign = [];
            if (allCampaign) {
                allCampaign.forEach(i => {
                    console.log(i.status)
                    if (i.Status === "pending") {
                        pendingCampaign.push(i);
                    } else if (i.Status === "completed") {
                        completedCampaign.push(i);
                    } else if (i.Status === 'active') {
                        activeCampaign.push(i);
                    }
                });
            }
            console.log(pendingCampaign)
            dispatch({
                type: "SET_USER_CAMPAIGN",
                payload: {
                    allCampaign,
                    pendingCampaign,
                    completedCampaign,
                    activeCampaign
                }
            });
        }
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        // Optionally dispatch an action for error handling
    }
};


const fetchBlogs = (id) => async (dispatch) => {
   
    await axios.get(`${config.API_URL+'/getBlog'}`).then(res => {
        if(res.status === 200){
            let blogs = res.data.data;
            let featured = res.data.Featured;
            let mostRecent = res.data.mostRecent;

            let allBlogs = [...blogs, ...featured, ...mostRecent];
            console.log(res)
            let blogDetails = []
            if(id != undefined){
                console.log(id )
                allBlogs.map((i)=>{
                    if(i.header === id){
                        blogDetails.push(i)
                    }
                })
            }
           
           return  dispatch({type: "SET_BLOG", payload: {blogs, featured, mostRecent, blogDetails} })
        }
    }); 
}


const setUser = (userObj) => {
    return {
        type: "SET_USER",
        payload: userObj
    }
}

const setUserID = (userObj) => {
    return {
        type: "SET_USER_ID",
        payload: userObj
    }
}

const setCampaign = (userObj) => {
    return {
        type: "SET_USER_CAMPAIGN",
        payload: userObj
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

const campaignCreated = () => {
    return {
        type: "CAMPAIGN_CREATED"
    }
}


const currentPage = (str) => {
    return {
        type: "CURRENT_PAGE",
        payload: str
    }
}
export  {
    setUser,
    setUserID,
    setCampaign,
    logOut,
    currentPage,
    fetchCampaigns,
    fetchBlogs,
    campaignCreated
}