import axios from "axios";
import { BACKEND_URL} from "../../utils/url";

export const BIDDING_URL = `${BACKEND_URL}/bidding/`

const placebid = async (formData)=>{
    const response = await axios.post(BIDDING_URL , formData);
    return response.data;
};
const fetchBiddingHistory = async (id)=>{
    const response = await axios.get(`${BIDDING_URL}/${id}`);
    return response.data;
};
const sellproductsbyuser = async (productId)=>{
    const response = await axios.post(`${BIDDING_URL}/sell`,{productId});
    return response.data;
};


const biddingSerivce={
    placebid,
    fetchBiddingHistory,
    sellproductsbyuser
};
export default biddingSerivce;