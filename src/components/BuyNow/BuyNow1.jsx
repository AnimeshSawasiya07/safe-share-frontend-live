import { Radio, RadioGroup, TextField } from "@mui/material"
import FormControlLabel from '@mui/material/FormControlLabel';
import "./BuyNow1.css"
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { useEffect, useMemo, useState } from "react";
import { Step3 } from "./Step3";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../../redux-config/orderSlice";

export function BuyNow1() {
    const dispatch = useDispatch()
    const location = useLocation()
    const product = location.state?.product;
    const navigate = useNavigate()

    const TAX_PERCENT = 18;
    const SERVICE_FEE = 30;

    const [formData, setFormData] = useState({
        deliveryFee: 0,
        noOfDays: 1,
        pickupMethod: "Self Pickup",
        quantity: 1,
        paymentMethod: "",
        contactInfo: {},
    });

    const orderSummary = useMemo(() => {
        const basePrice = (product?.price || 0) * (formData.quantity || 1);
        const subTotal = product?.type === "rent"
            ? basePrice * (formData.noOfDays || 1)
            : basePrice;

        const discount = product?.discount || 0;
        const discountedPrice = subTotal - (subTotal * discount) / 100;

        const netAmount = discountedPrice + SERVICE_FEE + (formData.deliveryFee || 0);
        const taxAmount = (netAmount * TAX_PERCENT) / 100;
        const grossAmount = netAmount + taxAmount;

        return {
            subTotal,
            discount,
            discountedPrice,
            quantity: formData.quantity,
            serviceFee: SERVICE_FEE,
            deliveryFee: formData.deliveryFee || 0,
            noOfDays: formData.noOfDays,
            pickupMethod: formData.pickupMethod,
            paymentMethod: formData.paymentMethod,
            contactInfo: formData.contactInfo,
            taxPercent: TAX_PERCENT,
            taxAmount,
            netAmount,
            grossAmount,
            total: grossAmount,
        };
    }, [formData, product]);



    useEffect(() => {
        dispatch(setOrderDetails({ ...orderSummary }))
    }, [formData, product]);

    const [currentStep, setCurrentStep] = useState(0)
    const step = [
        <Step1 setMethods={{ setCurrentStep, setFormData }} product={product} />,
        <Step2 setMethods={{ setCurrentStep, setFormData }} formData={formData}/>,
        <Step3 setCurrentStep={setCurrentStep} product={product} />
    ]


    return (
        <>
            <div className="container product-main-container" >
                <div className="mt-2 product-header d-flex align-items-center justify-content-between">
                    <div>
                        <button onClick={() => { navigate("/browse-products") }} className="btn pinkish" ><i className="bi bi-arrow-left"></i> Back to Browse Product</button>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <div>
                            <i className="bi bi-shield me-1"></i> Secure Checkout
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-8 p-2">
                        {step[currentStep]}
                    </div>
                    <div className="col-md-4 ">
                        <div className="order-summary p-4 mt-2 d-flex flex-column gap-2">
                            <span><b>Order Summary</b></span>
                            <div className="d-flex justify-content-between mt-4">
                                <small>SubTotal</small>
                                <small><b><i className="bi bi-currency-rupee"></i>{orderSummary?.subTotal}</b></small>
                            </div>
                            <div className="d-flex justify-content-between text-success">
                                <small>Discounted Price</small>
                                <small><b><i className="bi bi-currency-rupee"></i>{orderSummary?.discountedPrice}</b></small>
                            </div>
                            <div className="d-flex justify-content-between">
                                <small>Service Fee</small>
                                <small><b><i className="bi bi-currency-rupee"></i>{orderSummary?.serviceFee}</b></small>
                            </div>
                            <div className="d-flex justify-content-between">
                                <small>Delivery Fee</small>
                                <small><b><i className="bi bi-currency-rupee"></i>{orderSummary?.deliveryFee}</b></small>
                            </div>
                            <div className="d-flex justify-content-between">
                                <small>Net Amount</small>
                                <small><b><i className="bi bi-currency-rupee"></i>{orderSummary?.netAmount}</b></small>
                            </div>
                            <div className="d-flex justify-content-between">
                                <small>Tax(18%)</small>
                                <small><b><i className="bi bi-currency-rupee"></i>{orderSummary?.taxAmount}</b></small>
                            </div>
                            <div className="d-flex justify-content-between">
                                <small>Gross Amount</small>
                                <small><b><i className="bi bi-currency-rupee"></i>{orderSummary?.grossAmount}</b></small>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <small><b>Total</b></small>
                                <small className="text-success"><b><i className="bi bi-currency-rupee"></i>{orderSummary?.total}</b></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}