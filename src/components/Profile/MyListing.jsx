import React from "react";
import { Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/EndPoint";


const getStatusBadge = (status) => {

  if (status === "available")
    return <Badge bg="success" className="text-capitalize">{status}</Badge>;
  else if (status === "rented")
    return <Badge bg="warning" className="text-capitalize">{status}</Badge>;
  else return <Badge bg="secondary">{status}</Badge>;
};

export function MyListing({myListing}){
  const navigate = useNavigate()
  return (
    <div className=" my-5">
      <div className="row mb-4 justify-content-between align-items-center">
        <div className="col">
          <h5 className="fw-semibold">My Listings</h5>
        </div>
        <div className="col-auto">
          <Button variant="primary" onClick={()=>navigate("/add-new-listing")} className="d-flex align-items-center">
            <i className="bi bi-plus-lg me-2"></i> Add New Listing
          </Button>
        </div>
      </div>

      <div className="row">
        {myListing?.map((item, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="bg-light rounded p-3 shadow-sm h-100">
              <img
                src={item?.images[0]?.startsWith("http")?item.images[0] : BASE_URL+"/products/images/"+item?.images[0]}
                alt={item.title}
                className="img-fluid rounded mb-2"
                style={{ height: "160px", objectFit: "contain", width: "100%" }}
              />
              <h6 className="fw-semibold text-secondary mb-1">{item.title}</h6>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-success fw-semibold text-dark">{item.price} Rs.</span>
                {getStatusBadge(item.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

