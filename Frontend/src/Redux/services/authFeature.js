import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const AUTH_URL=`${BACKEND_URL}/users/`

const register = async (userData)=>{
    const response = await axios.post(AUTH_URL + "register",userData);
    console.log(response);
    return response.data;
};
const authSerivce={
    register,
};
export default authSerivce;