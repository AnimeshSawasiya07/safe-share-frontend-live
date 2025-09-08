import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export function PreviewNewListing({handlePhotos}) {
  const {state} = useLocation()
  const navigate = useNavigate()
  const {previewUrls } = state
  console.log(previewUrls);
  
  
  const { addListing } = useSelector(store => {
    return store.newListing
  })
  return (
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Browse Product
        </button>
        <span className="text-muted">
          <i className="bi bi-eye me-1"></i> Preview Mode
        </span>
      </div>

      <hr />

      {/* Product Card */}
      <div className="d-flex justify-content-center">
        <div className="card shadow rounded" style={{ width: "26rem" }}>
          <img
            src={previewUrls[0]}
            className="card-img-top"
            alt="Birthday Cake"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
          <div className="card-body w-100">
            {/* Tags and Price */}
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
              <div className="d-flex gap-2 flex-wrap">
                <span className="badge bg-success">{addListing?.category}</span>
                <span className="badge bg-purple text-dark">For {addListing?.listingType}</span>
                <span className="badge bg-secondary">{addListing?.condition}</span>
              </div>
              <h5 className="text-success mt-2 mt-sm-0">{addListing?.price}</h5>
            </div>

            {/* Title and Description */}
            <h5 className="card-title mb-1">{addListing?.title}</h5>
            <p className="card-text text-muted small">
              {addListing?.description}
            </p>

            {/* Location */}
            <p className="text-muted small mb-3">
              <i className="bi bi-geo-alt-fill me-1"></i>
              {addListing?.location?.city}, {addListing?.location?.state} - {addListing?.location.pincode}
            </p>

            {/* Specifications */}
            <h6 className="fw-bold text-dark">Specifications</h6>
            <div className="row text-muted small mb-3">
              <div className="col-6">Brand: {addListing?.specification?.brand}</div>
              <div className="col-6">Material: {addListing?.specification?.material}</div>
              <div className="col-6">Color: {addListing?.specification?.color}</div>
              <div className="col-6">Dimensions: {addListing?.specification?.dimensions}</div>
            </div>

            {/* Key Features */}
            <h6 className="fw-bold text-dark">Key Features</h6>
            <ul className="text-muted small mb-3 ps-3">
              {addListing?.keyFeatures.map((feature,index)=>{
                return <li key={index}>{feature}</li>
              })}
            </ul>

            {/* What's Included */}
            <h6 className="fw-bold text-dark">What's Included</h6>
            <ul className="text-muted small mb-3 ps-3">
              {addListing?.whatsIncluded.map((included,index)=>{
                return <li key={index}>{included}</li>
              })}
            </ul>

            {/* Action Buttons */}
            <div className="d-flex justify-content-between">
              <button onClick={() => {navigate(-1) }} className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-pencil me-1"></i>Edit Listing
              </button>
              <button className="btn btn-success btn-sm">
                <i className="bi bi-upload me-1"></i>Publish Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
