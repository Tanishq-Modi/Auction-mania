import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authSerivce from '../redux/services/authFeature';

export const UseRedirectLoggedOutUser = (path) => {
    const navigate= useNavigate();

    useEffect(()=>{
        let isLoggedIn;

        const redirectloggedOutUser= async()=>{
            try{
                isLoggedIn= await authSerivce.getLogInStatus();
            }catch(error){
                console.log(error.message);
            }

            if(!isLoggedIn){
                navigate(path);
                return;
            }
        };
        redirectloggedOutUser();
    },[path,navigate])
}
