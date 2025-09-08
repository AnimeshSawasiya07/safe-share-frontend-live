import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { useEffect } from "react";
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setOrderDetails } from "../../redux-config/orderSlice";

export function Step1({ setMethods, product }) {
  const { setCurrentStep, setFormData } = setMethods;
  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {

  }, [])

  return (
    <>
      <div className="date-container p-3 d-flex flex-column gap-3">
        <span><i className="bi bi-calendar"></i> Select Rental Dates</span>
        <span className="mt-5">When do you need this item?</span>

        {product.type === "sell" &&
          <div className="d-flex">
            <div>
              <TextField onChange={(event) => {
                const quantity = Math.max(1, Number(event.target.value));
                setFormData(prev => { return { ...prev, quantity: quantity } });
              }}
                defaultValue={1}
                inputProps={{ min: 1 }}
                type="number" id="outlined-basic" label="Quantity" variant="outlined" />

            </div>
          </div>}

        {product.type === "rent" &&
          <div className="d-flex">
            <div>

              <TextField onChange={(event) => {
                const quantity = Math.max(1, Number(event.target.value));
                setFormData(prev => { return { ...prev, quantity: quantity } });
              }}
                defaultValue={1}
                inputProps={{ min: 1 }}
                type="number" id="outlined-basic" label="Quantity" variant="outlined" />
            </div>
            <div>
              <TextField onChange={(event) => {
                const days = Math.max(1, Number(event.target.value));
                setFormData(prev => { return { ...prev, noOfDays: days } });
              }}
                defaultValue={1}
                inputProps={{ min: 1 }}
                type="number" id="outlined-basic" label="Duration (e.g. 7 days)" variant="outlined" />

            </div>
          </div>}

        <span className="mt-2">Pickup Method</span>
        <RadioGroup
          className="d-flex gap-2"
          name="use-radio-group"
          defaultValue="Self Pickup"
          onChange={(event) => {
            const selectedValue = event.target.value;
            if (selectedValue === "Self Pickup") {
              setFormData(prev => { return { ...prev, deliveryFee: 0, pickupMethod: "Self Pickup" } });
            } else if (selectedValue === "Local Delivery") {
              setFormData(prev => { return { ...prev, deliveryFee: 15, pickupMethod: "Local Delivery" } });

            }
          }}
        >
          <div className="delivery-option ps-3 d-flex align-items-center">
            <FormControlLabel value="Self Pickup" control={<Radio />} />
            <div><span>Self Pickup (Free)</span></div>
          </div>
          <div className="delivery-option ps-3 d-flex align-items-center">
            <FormControlLabel value="Local Delivery" control={<Radio />} />
            <div><span>Local Delivery (<i className="bi bi-currency-rupee"></i>15)</span></div>
          </div>
        </RadioGroup>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <Button onClick={() => navigate(-1)} className="btn-outline-secondary" variant="outlined">
          Previous
        </Button>
        <Button onClick={() => setCurrentStep(1)} className="btn-primary" variant="contained">
          Continue
        </Button>
      </div>
    </>
  );
}
