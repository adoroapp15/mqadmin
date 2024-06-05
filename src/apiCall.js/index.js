import axios from "axios";
import { config } from "../components/Constant";

import { useDispatch } from "react-redux";
import { setCampaign } from "../actions";
const dispatch = useDispatch;
const USER = sessionStorage.getItem("USER");
const userId = JSON.parse(USER);

const fetchCampaigns = async () => {
  await axios
    .get(`${config.API_URL + "/listCampaign/?userId=" + userId.userId}`)
    .then((res) => {
      if (res.status === 200) {
        let campaignData = res.data.data;
        dispatch(setCampaign(campaignData));
      }
    });
};

export { fetchCampaigns };
