import { Checkbox, FormControlLabel } from "@mui/material"
import "./Sign.css"
import TextField from '@mui/material/TextField'
import { useState } from "react"
import axios from "axios"
import EndPoint from "../../api/EndPoint"
import { toast, ToastContainer } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux-config/userSlice"
import { BottomBar } from "../navigation/BottomBar"
import { GoogleLogin } from "@react-oauth/google"
import api from "../../interceptor/axios"

export function Signin() {
    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const validateEmail = (email) => {
        if (!email) {
            return "Email is required";
        }
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            return "Only valid Gmail addresses are allowed (e.g., example@gmail.com)";
        }

        return "";
    };


    // ✅ password validation
    const validatePassword = (password) => {
        if (!password) return "Password is required"
        else if (password.length < 6 || password.length > 10) return "Password must be 6–10 characters"
        return ""
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

       
        const emailError = validateEmail(state.email)
        const passwordError = validatePassword(state.password)

        setErrors({ email: emailError, password: passwordError })

        if (emailError || passwordError) return 

        setIsLoading(true)

        try {
            const response = await axios.post(EndPoint.SIGN_IN, state)
            toast.success(response.data.msg)
            sessionStorage.setItem("token", response.data.token)
            dispatch(setUser(response.data))
            navigate(-1)
        } catch (err) {
            console.log(err);
            toast.error("Oops! something went wrong..")
        }

        setIsLoading(false)
    }

    return (
        <>
            <ToastContainer />
            <BottomBar />
            <div className="bg-pinkish-gradient">
                <div className="container d-flex align-items justify-content-center align-items-center">
                    {isLoading ? <div className="spinner-border spinner-position"></div> : ""}
                    <div className="row row-div bg-white">
                        <div className="col-md-6 p-0 d-flex flex-column align-items-center ">
                            <span className="mt-4 pinkish fs-3 pt-3 mt-5">Welcome back! 👋</span>

                            <div className="form-container d-flex align-items-center justify-content-center flex-column mt-5">
                                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                                    {/* Email */}
                                    <TextField
                                        value={state.email}
                                        onKeyUp={(event) => {
                                            const err = validateEmail(event.target.value);
                                            setErrors((prev) => ({ ...prev, email: err }));
                                        }}
                                        onChange={(e) => setState({ ...state, email: e.target.value })}
                                        className="mt-3"
                                        variant="standard"
                                        label="Email"
                                        type="email"
                                        sx={{ width: '22rem', height: '45px' }}
                                    />
                                    <small className="text-danger">{errors.email}&nbsp;</small>

                                    {/* Password */}
                                    <TextField
                                        value={state.password}
                                        onKeyUp={(event) => {
                                            const err = validatePassword(event.target.value);
                                            setErrors((prev) => ({ ...prev, password: err }));
                                        }}
                                        onChange={(e) => setState({ ...state, password: e.target.value })}
                                        className="mt-3"
                                        variant="standard"
                                        label="Password"
                                        type="password"
                                        sx={{ width: '22rem', height: '50px' }}
                                        autoComplete="current-password"
                                    />
                                    <small className="text-danger">{errors.password}&nbsp;</small>

                                    <small><Link to={"/forgot-password"}>Forget Password ?</Link></small>

                                    {/* T&C */}
                                    <FormControlLabel className="mt-3 text-secondary"
                                        control={<Checkbox />}
                                        label="Accept Terms & Conditions"
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: '14px',
                                            }
                                        }}
                                        required
                                    />

                                    <button type="submit" className="pinkish-btn text-light mt-2 mb-1">Sign-in</button>

                                    {/* Google Signin */}
                                    <GoogleLogin
                                        onSuccess={async (credentialResponse) => {
                                            try {
                                                setIsLoading(true)
                                                const idToken = credentialResponse.credential;
                                                const response = await api.post(EndPoint.GOOGLE_SIGN_IN, { idToken });

                                                toast.success(response.data.msg)
                                                sessionStorage.setItem("token", response.data.token)
                                                dispatch(setUser(response.data))
                                                navigate(-1)
                                            }
                                            catch (err) {
                                                console.log(err);
                                                toast.error("Oops! something went wrong..")
                                            }

                                            setIsLoading(false)
                                        }}
                                        onError={() => {
                                            console.log("Login Failed");
                                        }}
                                        useOneTap
                                    />

                                    <small style={{ "alignSelf": "center" }}>
                                        <Link to={"/sign-up"}>Do not have an account ?</Link>
                                    </small>
                                </form>
                            </div>
                        </div>

                        <div className="col-md-6 p-0 ">
                            <div className="signup-image"></div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}
