import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";

export function OrderConfirmationPage() {
  const navigate = useNavigate()
  return (
    <div className="container my-5 w-50">
      <div className="text-center mb-4">
        <CheckCircleIcon style={{ fontSize: 50, color: "green" }} />
        <h3 className="fw-bold mt-2">Rental Confirmed! 🎉</h3>
        <p>Your order has been successfully placed</p>
        <small className="text-muted">Order ID: SH-2024-6156</small>
      </div>

      <div className="row gy-4">
        {/* Left Column */}
        <div className="col-lg-8">
          {/* Order Details */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold text-success mb-3">Order Details</h5>
              <div className="row">
                <div className="col-md-2">
                  <img
                    src="https://i.imgur.com/5T3hyCQ.png"
                    alt="Camera"
                    className="rounded"
                    width="60"
                  />
                </div>
                <div className="col-md-10">
                  <h6 className="fw-semibold mb-0">Canon EOS R5 Mirrorless Camera</h6>
                  <small className="text-muted">Photography | Condition: Excellent</small>
                  <p className="fw-bold mt-2 text-success">
                    $45 <small>/day</small>
                  </p>
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <strong>Rental Period</strong>
                      <p className="mb-0">Jan 19, 2024 - Jan 21, 2024</p>
                      <small className="text-muted">Duration: 3 days</small>
                    </div>
                    <div className="col-md-6">
                      <strong>Order Placed</strong>
                      <p className="mb-0">Jan 15, 2:30 PM</p>
                      <small className="text-muted">Protection: ShareHub Insurance</small>
                      <br />
                      <small className="text-muted">Payment: **** **** **** 4242</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Information */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h6 className="fw-bold text-primary mb-3">Pickup Information</h6>
              <p className="mb-2">
                <strong>Self Pickup</strong>
                <br />
                1847 Mission Street, San Francisco, CA 94103
              </p>
              <small className="text-muted">Pickup between 9 AM - 6 PM</small>
              <div className="row mt-3">
                <div className="col-md-6">
                  <small className="text-muted">Contact Number</small>
                  <p className="mb-0">+1 (555) 123-4567</p>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">Confirmation Code</small>
                  <p className="mb-0">#491516</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Reminders */}
          <div className="card shadow-sm mb-4 border-warning">
            <div className="card-body">
              <h6 className="fw-bold text-warning">⚠ Important Reminders</h6>
              <ul className="ps-3">
                <li>Bring a valid ID and confirmation number for pickup</li>
                <li>Take photos of the item condition before and after use</li>
                <li>Return the item in the same condition</li>
                <li>Contact the owner immediately if there are any issues</li>
                <li>Keep this confirmation for your records</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
          {/* Item Owner */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-2">Item Owner</h6>
              <div className="d-flex align-items-center gap-2">
                <div className="bg-light rounded-circle p-2">SC</div>
                <div>
                  <strong>Sarah Chen</strong>
                  <br />
                  <small className="text-muted">⭐ 4.9 (234 reviews)</small>
                </div>
              </div>
              <button className="btn btn-primary btn-sm mt-2">Message Sarah</button>
              <div className="d-flex gap-2 mt-2">
                <button className="btn btn-outline-secondary btn-sm">
                  <CallIcon fontSize="small" />
                </button>
                <button className="btn btn-outline-secondary btn-sm">
                  <EmailIcon fontSize="small" />
                </button>
              </div>
            </div>
          </div>

          {/* Rental Timeline */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Rental Timeline</h6>
              <span className="badge bg-success mb-2">Order Confirmed</span>
              <p className="mb-1">Pickup Day: Jan 19</p>
              <p className="mb-1">Return Due: Jan 21</p>
              <span className="badge bg-danger">2d 14h 35m left</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Quick Actions</h6>
              <button onClick={()=>{navigate("/browse-products")}} className="btn btn-outline-dark w-100 mb-2">Browse More Items</button>
              <button onClick={()=>{navigate("/profile")}} className="btn btn-outline-dark w-100 mb-2">View My Orders</button>
              <button className="btn btn-outline-dark w-100">Add to Favorites</button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Footer */}
      <div className="text-center mt-5">
        <small className="text-muted">
          Need help with your order? Our support team is here to assist you.
        </small>
        <div className="d-flex justify-content-center gap-2 mt-2">
          <button className="btn btn-outline-dark btn-sm">Contact Support</button>
          <button onClick={()=>{navigate("/browse-products")}} className="btn btn-primary btn-sm">Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};
