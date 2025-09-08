import { Checkbox, FormControlLabel } from "@mui/material"
import "./Sign.css"
import TextField from '@mui/material/TextField'
import { useState } from "react"
import axios from "axios"
import EndPoint from "../../api/EndPoint"
import { toast, ToastContainer } from "react-toastify"
import { Link } from "react-router-dom"
import { BottomBar } from "../navigation/BottomBar"

export function Signup() {
    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        contact: "",
        password: ""
    })


    const [isLoading, setIsLoading] = useState(false)

    const validateName = (name) => {
        if (!name) return "Username is required";
        else if (name.length < 3) return "Username must be at least 3 characters";
        else if (!/^[A-Za-z\s]+$/.test(name)) return "Username can only contain letters and spaces";
        return "";
    };

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

    const validateContact = (contact) => {
        if (!contact) return "Contact number is required";
        else if (!/^\d{10}$/.test(contact)) return "Contact must be a valid 10-digit number";
        return "";
    };


    const validatePassword = (password) => {
        if (!password) return "Password is required"
        else if (password.length < 6 || password.length > 10) return "Password must be 6–10 characters"
        return ""
    }



    const handleSubmit = async (event) => {
        event.preventDefault()


        const nameError = validateName(state.name)
        const emailError = validateEmail(state.email)
        const contactError = validateContact(state.contact)
        const passwordError = validatePassword(state.password)

        setErrors({
            name: nameError,
            email: emailError,
            contact: contactError,
            password: passwordError
        })

        if (nameError || emailError || contactError || passwordError) return

        setIsLoading(true)

        try {
            const response = await axios.post(EndPoint.SIGN_UP, state)
            console.log(response);
            toast.success(response.data.msg)

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
            <div className="container d-flex align-items justify-content-center align-items-center">
                {isLoading ? <div className="spinner-border spinner-position"></div> : ""}
                <div className="row row-div">
                    <div className="col-md-6 p-0 ">
                        <div className="signup-image"></div>
                    </div>
                    <div className="col-md-6 p-0 d-flex flex-column align-items-center ">
                        <span className="mt-4 pinkish fs-3 mt-2">Create Your Account 👋</span>
                        <div className="form-container d-flex align-items-center justify-content-center flex-column">
                            <form className="d-flex flex-column mt-3" onSubmit={handleSubmit}>
                                <TextField onKeyUp={(event) => {
                                    const err = validateName(event.target.value);
                                    setErrors((prev) => ({ ...prev, name: err }));
                                }} onChange={(event) => { setState({ ...state, name: event.target.value }) }} className="mt-3" variant="standard" label="Username" type="text" sx={{ width: '22rem', height: '45px' }} autoComplete="username" />
                                <small className="text-danger">{errors.name}&nbsp;</small>
                                <TextField onKeyUp={(event) => {
                                    const err = validateEmail(event.target.value);
                                    setErrors((prev) => ({ ...prev, email: err }));
                                }} onChange={(event) => { setState({ ...state, email: event.target.value }) }} className="mt-3" variant="standard" label="Email" type="email" sx={{ width: '22rem', height: '45px' }} />
                                <small className="text-danger">{errors.email}&nbsp;</small>
                                <TextField onKeyUp={(event) => {
                                    const err = validateContact(event.target.value);
                                    setErrors((prev) => ({ ...prev, contact: err }));
                                }} onChange={(event) => { setState({ ...state, contact: event.target.value }) }} className="mt-3" variant="standard" label="Contact" type="text" sx={{ width: '22rem', height: '45px' }} />
                                <small className="text-danger">{errors.contact}&nbsp;</small>
                                <TextField onKeyUp={(event) => {
                                    const err = validatePassword(event.target.value);
                                    setErrors((prev) => ({ ...prev, password: err }));
                                }} onChange={(event) => { setState({ ...state, password: event.target.value }) }} className="mt-3" variant="standard" label="Password" type="password" sx={{ width: '22rem', height: '50px' }} autoComplete="current-password" />
                                <small className="text-danger">{errors.password}&nbsp;</small>
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

                                <button type="submit" className="pinkish-btn text-light  mt-2 mb-1">Sign-up</button>
                                <small style={{ "alignSelf": "center" }}><Link to={"/sign-in"}>Already have an account?</Link></small>
                            </form>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}