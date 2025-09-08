import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Auth({children}){
    const {user,isLoggedIn} = useSelector((store)=>store.User);
    if(isLoggedIn)
        return children;
    
    return <Navigate to="/sign-in"/>
      
}
export default Auth;