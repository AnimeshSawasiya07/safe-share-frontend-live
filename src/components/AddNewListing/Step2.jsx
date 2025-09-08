import React, { useEffect, useState } from "react";
import { RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import { newListing } from "../../redux-config/newListingSlice";

const conditionOptions = [
    { label: "Like New", description: "Brand new, never used" },
    { label: "Excellent", description: "Like new, minimal wear" },
    { label: "Good", description: "Some wear, fully functional" },
    { label: "Fair", description: "Noticeable wear, works well" },
];

export function Step2({setCurrentStep,allSteps,stepsDone,setStepsDone}) {
    const [condition, setCondition] = useState("Fair");
    const [specs, setSpecs] = useState({
        brand: "Generic",
        material: "Plastic/Metal",
        color: "Black",
        dimensions: "Standard size",
    });

    const handleChange = (e) => {
        setSpecs({ ...specs, [e.target.name]: e.target.value });
    };

     const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(newListing({condition,specification:specs}))
    },[condition,specs])

    return (
        <div className="container mt-4 p-0">
            <div className="bg-white shadow p-3 rounded">
                <h5 className="mb-5">🛠️ Specifications & Condition</h5>

                {/* Item Condition */}
                <h6 className="text-dark mb-3">Item Condition</h6>
                <RadioGroup value={condition} onChange={(e) => setCondition(e.target.value)}>
                    {conditionOptions.map((item, index) => (
                        <div key={index} className="border rounded ps-3 pe-3 mb-3 d-flex align-items-center">
                            <FormControlLabel
                                value={item.label}
                                control={<Radio />}
                                label={
                                    <div>
                                        <strong>{item.label}</strong>{" "}
                                        <span className="text-muted">{item.description}</span>
                                    </div>
                                }
                            />
                        </div>
                    ))}
                </RadioGroup>

                {/* Product Specifications */}
                <h6 className="mt-4 mb-3 text-dark">Product Specifications</h6>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Brand"
                            name="brand"
                            value={specs.brand}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Material"
                            name="material"
                            value={specs.material}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Color"
                            name="color"
                            value={specs.color}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Dimensions"
                            name="dimensions"
                            value={specs.dimensions}
                            onChange={handleChange}
                        />
                    </div>
                </div>

            </div>
            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <button onClick={()=>{setCurrentStep(prev=>0)
                    setStepsDone(prev=>prev.slice(0,-1))
                }} className="btn btn-outline-secondary">← Previous</button>
                <button onClick={()=>{setCurrentStep(prev=>2)
                    setStepsDone(prev=>[...prev,allSteps[2]])
                }} className="btn btn-primary bg-gradient">Continue →</button>
            </div>
        </div>
    );
};

