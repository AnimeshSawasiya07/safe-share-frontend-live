import { Link } from "react-router-dom"
import "./Navigation.css"

export function BottomBar() {
    return (
        <>
                <div className="nav-container d-flex align-items-center justify-content-center">
                    <div className="nav-inner-container d-flex gap-2 align-items-center justify-content-center">
                        <div className="nav-items d-flex justify-content-center align-items-center"><Link className="link" to={"/"}>Home</Link></div>
                        <div className="nav-items d-flex justify-content-center align-items-center"><Link className="link" to={"/browse-products"}>Browse</Link></div>
                        <div className="nav-items d-flex justify-content-center align-items-center"><Link className="link" to={"/cart"}>Cart</Link></div>
                        <div className="nav-items d-flex justify-content-center align-items-center"><Link className="link" to={"/profile"}>profile</Link></div>
                    </div>
                </div>
        </>
    )
}