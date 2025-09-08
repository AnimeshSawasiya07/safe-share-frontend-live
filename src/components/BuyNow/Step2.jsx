import React from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
  InputAdornment,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Box,
} from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import { useSelector } from "react-redux";

export function Step2({ setMethods, formData }) {
  const { setCurrentStep, setFormData } = setMethods;
  const { user } = useSelector((store) => store.User);

  const handleAddressChange = (event) => {
    const addressId = event.target.value;
    const selectedAddress = user?.profile?.address.find(
      (addr) => addr._id === addressId
    );

    if (selectedAddress) {
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          addressId: selectedAddress._id,
          recipientName: selectedAddress.recipientName,
          address: selectedAddress.fullAddress,
        },
      }));
    }
  };

  return (
    <div className="container my-4">
      <div className="p-4 rounded shadow-sm bg-white">
        <h5 className="mb-4">
          <i className="bi bi-credit-card me-2"></i>
          Payment & Contact Information
        </h5>

        {/* Payment Method */}
        <div className="mb-4">
          <FormLabel component="legend" className="mb-2">
            Payment Method
          </FormLabel>
          <RadioGroup
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                paymentMethod: event.target.value,
              }));
            }}
            row
          >
            <FormControlLabel
              value="Cash on Delivery"
              control={<Radio />}
              label="Cash on Delivery"
            />
            <FormControlLabel
              value="upi"
              control={<Radio disabled />}
              label="UPI (Currently Unavailable)"
            />
            <FormControlLabel
              value="card"
              control={<Radio disabled />}
              label="Credit/Debit Card (Currently Unavailable)"
            />
          </RadioGroup>
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <h6>Contact Information</h6>
          <div className="row">
            <div className="col-md-6 mb-3">
              <TextField
                fullWidth
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      email: event.target.value,
                    },
                  }));
                }}
                label="Email Address"
                placeholder="john@example.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <TextField
                fullWidth
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      phone: event.target.value,
                    },
                  }));
                }}
                label="Phone Number"
                placeholder="+91 98765 43210"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>

        {/* Billing Address Card */}
        <Card variant="outlined" className="mb-4">
          <CardContent>
            <Typography className="text-dark" variant="h6" gutterBottom>
              Select Delivery Address
            </Typography>

            <Box className="mb-3">
              <TextField
                select
                value={formData.contactInfo?.addressId || ""}
                onChange={handleAddressChange}
                fullWidth
                label="Choose an Address"
              >
                <MenuItem value="">
                  -- Select from saved addresses --
                </MenuItem>
                {user?.profile?.address.map((address) => (
                  <MenuItem key={address._id} value={address._id}>
                    <strong>{address.recipientName}</strong> —{" "}
                    {address.fullAddress}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Typography variant="body2" color="textSecondary">
              The selected address will be used for delivery and billing. You
              can manage your saved addresses from your profile.
            </Typography>
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <Button
            onClick={() => setCurrentStep(0)}
            variant="outlined"
            color="secondary"
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(2)}
            variant="contained"
            color="primary"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
