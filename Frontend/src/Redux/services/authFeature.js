import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const AUTH_URL=`${BACKEND_URL}/users/`

const register = async (userData)=>{
    const response = await axios.post(AUTH_URL + "register",userData);
    return response.data;
};
const login = async (userData)=>{
    const response = await axios.post(AUTH_URL + "login",userData);
    return response.data;
};
const logOut = async ()=>{
    const response = await axios.get(AUTH_URL + "logout");
    return response.data.message;
};
const getLogInStatus = async ()=>{
    const response = await axios.get(AUTH_URL + "loggedIn");
    return response.data;
};
const getuserProfile = async ()=>{
    const response = await axios.get(AUTH_URL + "getuser");
    return response.data;
};
const authSerivce={
    register,
    login,
    logOut,
    getLogInStatus,
    getuserProfile,
};
export default authSerivce;