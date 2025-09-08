import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EndPoint from "../../api/EndPoint";
import axios from "axios";
import api from "../../interceptor/axios";
import { toast, ToastContainer } from "react-toastify";

export function Step5({ setCurrentStep, handlePhotos, handlePreviewaphotos, allSteps, setStepsDone }) {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [confirmOwnership, setConfirmOwnership] = useState(false);
  const navigate = useNavigate()

  const { photos } = handlePhotos
  const { previewUrls, setPreviewUrls } = handlePreviewaphotos;

  const { addListing } = useSelector(store => {
    return store.newListing
  })
  console.log(addListing);
  console.log(photos);


  const handlePublish = async () => {
    try {
      if (!agreeTerms || !confirmOwnership) {
        toast.error("Please accept terms and confirm ownership before publishing.");
        return;
      }

      const formData = new FormData();
      Object.entries(addListing).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formData.append(`${key}.${subKey}`, subValue);
          });
        } else {
          formData.append(key, value);
        }
      });

      photos.forEach((img) => {
        formData.append("images", img);
      });

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await api.post(EndPoint.LIST_ITEM, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Listing published!");
      navigate("/profile")
    }
    catch (err) {
      console.log(err);
      toast.error("Oops! something went wrong..")
    }
  };


  return (
    <>
      <ToastContainer />
      <div className="container mt-4 p-0">
        <div className="bg-white shadow p-4 rounded">

          {/* Header */}
          <h5 className="mb-5 text-success">✔️ Review & Submit</h5>

          {/* Summary Box */}
          <div className="bg-light p-4 rounded mb-4">
            <h6 className="mb-3 fw-semibold text-dark">Listing Summary</h6>
            <div className="row">
              <div className="col-md-6 mb-2">
                <strong>Title:</strong> {addListing?.title}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Category:</strong> {addListing?.category}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Type:</strong> For {addListing?.listingType}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Condition:</strong> {addListing?.condition}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Brand:</strong> {addListing?.specification.brand}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Price:</strong> {addListing?.price}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Location:</strong> {addListing?.location?.city}, {addListing?.location?.state}
              </div>
              <div className="col-md-6 mb-2">
                <strong>Images:</strong> {photos.length} uploaded
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="termsCheck"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
            />
            <label className="form-check-label" htmlFor="termsCheck">
              I agree to the <span className="text-success fw-semibold">Terms of Service</span> and <span className="text-success fw-semibold">Community Guidelines</span>
            </label>
          </div>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="confirmCheck"
              checked={confirmOwnership}
              onChange={() => setConfirmOwnership(!confirmOwnership)}
            />
            <label className="form-check-label" htmlFor="confirmCheck">
              I confirm that all information provided is accurate and I own this item
            </label>
          </div>

          {/* Secure Message */}
          <div className="alert alert-success d-flex align-items-center gap-2" role="alert">
            <i className="bi-shield-check"></i>
            <div>
              <strong>Secure Platform</strong><br />
              Your listing will be reviewed for quality and safety before going live. All transactions are protected by SafeShare's security guarantee.
            </div>
          </div>

          {/* Navigation */}
          <div className="d-flex justify-content-between mt-4">
            <button onClick={() => {
              setCurrentStep(prev => 3)
              setStepsDone(prev => prev.slice(0, -1))
            }} className="btn btn-outline-secondary">← Previous</button>
            <div className="d-flex gap-2">
              {/* <button onClick={() => {
                navigate("/preview-new-listing", {
                  state: { previewUrls }
                })
              }} className="btn btn-light border border-primary text-primary">👁️ Preview</button> */}
              <button className="btn btn-success" onClick={handlePublish}><i className="bi bi-upload me-1"></i> Publish Listing</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
