import { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { PreviewNewListing } from "./PreviewNewListing";
import { useNavigate } from "react-router-dom";

export const AddNewListing = () => {

    const navigate = useNavigate()

    const [photos, setPhotos] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [currentStep, setCurrentStep] = useState(0)

    const allSteps = ["Basic Details", "Specifications", "Media & Features", "Location & Pricing", "Review & Submit"]
    const [stepsDone , setStepsDone] = useState(["Basic Details"])

    const steps = [
        <Step1 setCurrentStep={setCurrentStep} allSteps={allSteps} stepsDone={stepsDone} setStepsDone={setStepsDone} />,
        <Step2 setCurrentStep={setCurrentStep} allSteps={allSteps} stepsDone={stepsDone} setStepsDone={setStepsDone} />,
        <Step3 setCurrentStep={setCurrentStep} allSteps={allSteps} stepsDone={stepsDone} setStepsDone={setStepsDone} handlePhotos={{ photos, setPhotos }} handlePreviewaphotos={{previewUrls,setPreviewUrls}} />,
        <Step4 setCurrentStep={setCurrentStep} allSteps={allSteps} stepsDone={stepsDone} setStepsDone={setStepsDone} />,
        <Step5 setCurrentStep={setCurrentStep} allSteps={allSteps} stepsDone={stepsDone} setStepsDone={setStepsDone} handlePhotos={{photos,setPhotos}} handlePreviewaphotos={{previewUrls,setPreviewUrls}}/>
    ]

    return (<>
        <div className="container " >
            <div className="mt-2 product-header d-flex align-items-center justify-content-between">
                <div>
                    <button onClick={()=>{navigate("/browse-products")}} className="btn btn-secondary" ><i className="bi bi-arrow-left"></i> Back to Browse Product</button>
                </div>
                <div className="d-flex justify-content-end gap-2">
                    <div>
                        <i className="bi bi-shield me-1"></i> Secure Checkout
                    </div>
                </div>
            </div>
            <hr />
            <div className="container h-75 mt-4 w-50 ">
                {/* Stepper */}
                <div className="d-flex justify-content-between mb-4">
                    {allSteps.map((step, index) => (
                        <div className={`text-center d-flex flex-column justify-content-center align-items-center ${stepsDone.includes(step) ? "text-success" : "text-muted"}`} key={index}>
                            <div className={`rounded-circle border border-2 ${stepsDone.includes(step) ? "border-success bg-success text-white" : "bg-light"} mb-1`} style={{ width: 40, height: 40, lineHeight: "40px" }}>
                                {index + 1}
                            </div>
                            <div style={{ fontSize: "0.8rem" }}>{step}</div>
                        </div>
                    ))}
                </div>

                {/* Form */}
                {steps[currentStep]}
            </div>
        </div>
    </>
    );

};

