import { Link, useNavigate } from "react-router-dom"
import "./Navigation.css"
import { useDispatch, useSelector } from "react-redux"
import { signout } from "../../redux-config/userSlice"

export function Navigation() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user,isLoggedIn} = useSelector(store=>store.User)
    const handleSignout =()=>{
        dispatch(signout())
    }
    return (
        <>
            <div className="main-container">
                <div className="container h-100 d-flex align-items-center justify-content-between">
                    <div className="logo-name-container d-flex align-items-center">
                        <div className="logo-div"> </div>
                        <div className="logo-name">SafeShare</div>
                    </div>
                    <div className="sign-options d-flex gap-2">
                        {!isLoggedIn?
                        <div className="sign-options d-flex gap-2">
                        <button className="singn-options d-flex justify-content-center align-items-center btn btn-light" onClick={()=>{navigate("/sign-in")}}>Sign in</button>
                        <button className="singn-options d-flex justify-content-center align-items-center btn btn-light" onClick={()=>{navigate("/sign-up")}}>Sign up</button>
                        </div>
                        :
                        <button className="singn-options d-flex justify-content-center align-items-center btn btn-light" onClick={handleSignout}>Sign out</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}