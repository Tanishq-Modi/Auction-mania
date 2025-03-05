import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../redux/features/authSlice"

export const ShowOnlogin= ({children}) => {
    const isLoggedIn=useSelector(selectIsLoggedIn);

    if(isLoggedIn){
        return <>{children}</>
    }
    return null;
};
export const ShowOnlogout= ({children}) => {
    const isLoggedIn=useSelector(selectIsLoggedIn);

    if(!isLoggedIn){
        return <>{children}</>
    }
    return null;
};
