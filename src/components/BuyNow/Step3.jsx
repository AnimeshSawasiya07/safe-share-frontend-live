import { useState } from "react";
import { Checkbox, FormControlLabel, Button, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import EndPoint from "../../api/EndPoint";
import { useSelector } from "react-redux";
import api from "../../interceptor/axios";
import { toast, ToastContainer } from "react-toastify";

export function Step3({ setCurrentStep, product }) {
  console.log(product);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [includeProtection, setIncludeProtection] = useState(true);
  const navigate = useNavigate()
  const { orderData } = useSelector((store) => store.orderDetails)
  const { user } = useSelector((store) => store.User)

  const handleConfirm = async () => {
    try {
      await api.post(EndPoint.PLACE_ORDER, { ...orderData, listingId: product._id, sellerId: product?.ownerId?._id, buyerId: user._id, type: product.type })
      navigate("/order-confirmed")
    } catch (err) {
      toast.error("Something went wrong")
      console.log(err);

    }
  }

  return (<>
    <ToastContainer />
    <div className="container py-4 px-3">
      <div className="bg-white rounded-4 shadow p-4">
        <div className="mb-4 d-flex align-items-center">
          <CheckCircleIcon color="green" className="me-2" />
          <h5 className="m-0">Review Your Order</h5>
        </div>

        {/* Order Summary */}
        <div className="border rounded-3 p-3 mb-3 bg-light">
          <h6 className="fw-bold mb-3">Order Summary</h6>
          <div className="row mb-1">
            <div className="col-6 text-secondary">Item:</div>
            <div className="col-6 fw-medium">{product?.title}</div>
          </div>
          <div className="row mb-1">
            <div className="col-6 text-secondary">Duration:</div>
            <div className="col-6">{orderData?.noOfDays} days</div>
          </div>
          {/* <div className="row mb-1">
            <div className="col-6 text-secondary">Dates:</div>
            <div className="col-6">Aug 18 - Feb 06</div>
          </div> */}
          <div className="row mb-1">
            <div className="col-6 text-secondary">Pickup/Delivery:</div>
            <div className="col-6">{orderData?.pickupMethod}</div>
          </div>
          <div className="row mb-1">
            <div className="col-6 text-secondary">Payment:</div>
            <div className="col-6">{orderData?.paymentMethod}</div>
          </div>
        </div>

        {/* Terms Agreement */}
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
          }
          label={
            <span>
              I agree to the{" "}
              <a href="#">Terms of Service</a>, <a href="#">Privacy Policy</a>, and{" "}
              <a href="#">Rental Agreement</a>
            </span>
          }
          className="mb-2"
        />

        {/* ShareHub Protection */}
        <FormControlLabel
          control={
            <Checkbox
              checked={includeProtection}
              onChange={(e) => setIncludeProtection(e.target.checked)}
            />
          }
          label={
            <span>
              Include ShareHub Protection (Recommended) - Covers damage, theft, and disputes
            </span>
          }
          className="mb-3"
        />

        {/* Secure Transaction Box */}
        <div className="border border-success rounded-3 p-3 mb-4 bg-success-subtle d-flex align-items-center">
          <LockIcon className="me-2 text-success" />
          <div className="text-success">
            <strong>Secure Transaction</strong>
            <br />
            Your payment information is encrypted and secure. We never store your card details.
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <Button variant="outlined" onClick={() => setCurrentStep(1)} startIcon={<ArrowBackIcon />} className="rounded-4 px-4">
            Previous
          </Button>

          <Button onClick={handleConfirm}
            variant="contained"
            color="success"
            className="rounded-4 px-4"
            disabled={!agreeTerms}
          >
            Confirm Rental
          </Button>
        </div>
      </div>
    </div>
  </>
  );
}
