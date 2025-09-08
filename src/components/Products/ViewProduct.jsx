import { useNavigate, useParams } from "react-router-dom"
import "./ViewProduct.css"
import { useEffect, useReducer, useState } from "react"
import { Carousel } from "react-bootstrap";
import EndPoint, { BASE_URL } from "../../api/EndPoint"
import { useSelector } from "react-redux";
import api from "../../interceptor/axios";
import Reviews from "./Reviews";
import { Details } from "./Details";
import { toast, ToastContainer } from "react-toastify";
import FooterBottom from "../Footer/FooterBottom";

export function ViewProduct() {

    const { id } = useParams()
    const navigate = useNavigate()
    const images = [
        {
            src: "/images/product-2.webp",
            alt: "Birthday Cake",
        },
        {
            src: "/images/product-6.webp",
            alt: "Camera",
        },
        {
            src: "/images/product-7.webp",
            alt: "No Image",
        },
        {
            src: "/images/product-7.webp",
            alt: "Art",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    const [state, dispatch] = useReducer((state, action) => {
        if (action.type == "set-product") {
            state.product = action.payload
        }

        return { ...state }
    }, {
        product: {}
    })


    useEffect(() => {
        loadProduct()
        console.log(state);
        
    }, [])

    const loadProduct = async () => {
        const response = await api.get(EndPoint.VIEW_PRODUCT + `/${id}`)
        console.log(response.data.product);
        dispatch({ type: "set-product", payload: response.data.product })
    }

    const { user, isLoggedIn } = useSelector((store) => store.User);
    const handleAddToCart = async () => {
        console.log(user._id);

        try {
            if (!isLoggedIn) {
                navigate("/sign-in")
                return;
            }
            await api.post(EndPoint.ADD_TO_CART, {
                user: user._id,
                items: {
                    listing: state?.product?._id,
                }
            })
            toast.success("Item added to cart")
        } catch (err) {

        }
    }

    const [currentIndex, setCurrentIndex] = useState(0)
    const component = [<Details product={state.product} />, <Reviews />]

    return (
        <>
        <ToastContainer/>
            <div className="container product-main-container" >
                <div className="mt-2 product-header d-flex align-items-center justify-content-between">
                    <div>
                        <button onClick={() => { navigate("/browse-products") }} className="btn pinkish" ><i className="bi bi-arrow-left"></i> Back to Browse Product</button>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <div>
                            <i className="bi bi-heart"></i>
                        </div>
                    </div>
                </div>
                <hr />

                <div className="row">
                    <div className="col-md-6">
                        <div className="container my-4">
                            <div className="rounded shadow overflow-hidden">
                                <Carousel
                                    activeIndex={activeIndex}
                                    onSelect={handleSelect}
                                    indicators={false}
                                    controls={true}
                                    interval={null}
                                >
                                    {state?.product?.images?.map((img, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                src={img.startsWith("http")?img : BASE_URL+"/products/images/"+img}
                                                alt={img}
                                                className="d-block w-100"
                                                style={{ height: "450px", objectFit: "contain" }}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>

                                <span
                                    className="position-absolute p-2"
                                    style={{
                                        background: "rgba(0, 0, 0, 0.15)",
                                        color: "black",
                                        borderRadius: "0.5rem",
                                        top: "66%",
                                        left: "46%"
                                    }}
                                >
                                    {activeIndex + 1}/{state?.product?.images?.length}
                                </span>
                            </div>

                            <div className="d-flex justify-content-center mt-3 gap-3 flex-wrap">
                                {state?.product?.images?.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`border rounded overflow-hidden ${index === activeIndex ? "border-success shadow" : ""
                                            }`}
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            cursor: "pointer",
                                            padding: "4px",
                                        }}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        <img
                                            src={img.startsWith("http")?img : BASE_URL+"/products/images/"+img}
                                            alt={img.alt}
                                            className="w-100 h-100 object-fit-cover rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6 d-flex flex-column gap-2">
                        <div className="d-flex gap-2">
                            <div className="category-name ps-2 pe-2 d-flex justify-content-center align-items-center">
                                <small>{state?.product?.category?.name}</small>
                            </div>
                            <div className="view-condition-txt ps-2 pe-2 d-flex justify-content-center align-items-center">
                                <small>
                                    {state?.product?.condition}
                                </small>
                            </div>
                            <div>
                                <small className="verified-owner-badge ps-2 pe-2 d-flex justify-content-center align-items-center gap-1">
                                    <i className="bi bi-patch-check"></i> Verified Owner
                                </small>
                            </div>
                        </div>

                        <div className="title-div">
                            <span>{state?.product?.title}</span>
                        </div>
                        <div className="d-flex gap-4">
                            <div><small><i className="bi bi-star-fill text-warning"></i> {state?.product?.rating}(74 reviews)</small></div>
                            <div><small><i className="bi bi-geo-alt"></i> {state?.product?.location?.city}, {state?.product?.location?.state}</small></div>
                        </div>

                        <div className="price-div mt-2 d-flex align-items-center justify-content-center">
                            {state.product.type == "sell" ?
                                <div className="d-flex flex-column  align-items-center justify-content-center "><span className="">Buy it now</span><span className="fs-1 text-success">{state?.product?.price} Rs.</span></div>
                                :
                                <div className="d-flex flex-column"><span>Rent it now</span><span className="fs-1 text-success">{state?.product?.price} Rs./day</span></div>}
                        </div>
                        <div className="d-flex gap-4">
                            <button onClick={() => { navigate("/buy-now-1", { state: { product: state.product } }) }} className="btn buy-rent-button form-control text-white mt-3">{state?.product?.type == "sell" ? <span>Buy</span> : <span>Rent</span>} Now</button>
                            <button onClick={handleAddToCart} className="btn-outline-secondary form-control mt-3">Add to Cart</button>
                        </div>

                        <div className="safety-protection-info p-4 d-flex flex-column gap-3 mt-3">
                            <div><i className="bi bi-shield"></i> Safety & Protection</div>
                            <div className="d-flex">
                                <div className="w-50"><small><i className="bi bi-check text-success"></i> Verified owner</small></div>
                                <div><small><i className="bi bi-check text-success"></i> Insurance covered</small></div>
                            </div>
                            <div className="d-flex">
                                <div className="w-50"><small><i className="bi bi-check text-success"></i> Secure payments</small></div>
                                <div><small><i className="bi bi-check text-success"></i> 24/7 support</small></div>
                            </div>

                        </div>

                        <div className="profile-info p-3 mt-3">
                            <div className="d-flex p-2 gap-4">
                                <div className="p-profile-img mt-1">
                                </div>
                                <div className="d-flex flex-column">
                                    <span><strong>{state?.product?.ownerId?.name}    </strong></span>
                                    <small><i className="bi bi-star-fill text-warning"></i> 0 (0 reviews)</small>
                                    <small>Joined 2025 • Responds Within 1 hour</small>
                                </div>
                            </div>
                            {/* <div>
                                <button className="form-control mt-2"><i className="bi bi-chat"></i>&nbsp; Contact Owner</button>
                            </div> */}
                        </div>

                    </div>
                </div>
                <div className="container">
                    <ul className="nav nav-tabs mb-4">
                        <li className="nav-item">
                            <button onClick={()=>{setCurrentIndex(prev=>0)}} className="nav-link active">Details</button>
                        </li>
                        <li className="nav-item">   
                            <button onClick={()=>{setCurrentIndex(prev=>1)}} className="nav-link">Reviews</button>
                        </li>
                    </ul>
                    {component[currentIndex]}
                </div>

<FooterBottom/>
            </div >
        </>
    )
}