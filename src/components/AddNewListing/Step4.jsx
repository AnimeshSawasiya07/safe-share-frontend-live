import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import { newListing } from "../../redux-config/newListingSlice";

export function Step4({setCurrentStep,allSteps,setStepsDone}){
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("400001");
  const [price, setPrice] = useState("1850");
  const [available, setAvailable] = useState(true);

  const dispatch = useDispatch();
      useEffect(() => {
          dispatch(newListing({location:{city,state,pincode},price,available}));
      }, [city, state, pincode, price,available]);
  

  return (
    <div className="container mt-4 p-0">
      <div className="bg-white shadow p-4 rounded">
        <h5 className="mb-5 text-success">💲 Location & Pricing</h5>

        {/* Location */}
        <h6 className="text-dark mb-3">Location Details</h6>
        <div className="row mb-4">
          <div className="col-md-4 mb-2">
            <label className="form-label">City <small>(0/20)</small></label>
            <input
              type="text"
              className="form-control"
              maxLength={20}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
            />
          </div>
          <div className="col-md-4 mb-2">
            <label className="form-label">State <small>(0/20)</small></label>
            <input
              type="text"
              className="form-control"
              maxLength={20}
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state"
            />
          </div>
          <div className="col-md-4 mb-2">
            <label className="form-label">Pincode <small>(6 digits)</small></label>
            <input
              type="text"
              className="form-control"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="e.g. 400001"
            />
          </div>
        </div>

        {/* Price */}
        <h6 className="text-dark">Price (₹)</h6>
        <div className="input-group mb-2">
          <span className="input-group-text">₹</span>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Set your selling price"
          />
        </div>
        <small className="text-muted mb-3 d-block">Set your selling price</small>

        {/* Availability */}
        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="availableCheck"
            checked={available}
            onChange={() => setAvailable(!available)}
          />
          <label className="form-check-label fw-medium" htmlFor="availableCheck">
            Item is currently available
          </label>
        </div>

        {/* Navigation */}
        <div className="d-flex justify-content-between">
          <button onClick={()=>{setCurrentStep(prev=>2)
            setStepsDone(prev=>prev.slice(0,-1))
          }} className="btn btn-outline-secondary">← Previous</button>
          <button onClick={()=>{setCurrentStep(prev=>4)
            setStepsDone(prev=>[...prev,allSteps[4]])
          }} className="btn btn-primary bg-gradient">Continue →</button>
        </div>
      </div>
    </div>
  );
};
