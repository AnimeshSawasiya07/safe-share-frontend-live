import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export function Details({product}) {
  return (
    <div className="container my-4">

      <div className="row">
        {/* Left Column */}
        <div className="col-md-6 mb-4">
          <h6 className="fw-bold">Description</h6>
          <p className="text-muted">
            {product.description}
          </p>

          <h6 className=" mt-4 text-secondary">What's Included</h6>
          <ul className="list-unstyled text-muted">
            {product?.whatsIncluded?.map((arr,index)=>{
               return <li className="mb-1 text-success" key={index}>● {arr}</li>
            })}
          </ul>
        </div>

        {/* Right Column */}
        <div className="col-md-6 mb-4">
          <h6 className="fw-bold">Specifications</h6>
          <div className="text-muted small mb-4">
            <div className="row border-bottom py-1">
              <div className="col-6">Brand</div>
              <div className="col-6 fw-bold text-dark">{product?.specification?.brand}</div>
            </div>
            <div className="row border-bottom py-1">
              <div className="col-6">material</div>
              <div className="col-6 fw-bold text-dark">{product?.specification?.material}</div>
            </div>
            <div className="row border-bottom py-1">
              <div className="col-6">color</div>
              <div className="col-6 fw-bold text-dark">{product?.specification?.color}</div>
            </div>
            <div className="row border-bottom py-1">
              <div className="col-6">dimensions</div>
              <div className="col-6 fw-bold text-dark">{product?.specification?.dimensions}</div>
            </div>
            
          </div>

          <h6 className="text-secondary">Key Features</h6>
          <ul className="list-unstyled text-muted small">
            {product?.keyFeatures?.map((arr,index)=>{
               return <li className="mb-1 text-success" key={index}>● {arr}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
