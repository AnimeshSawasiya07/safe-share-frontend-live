import { useEffect, useState } from "react"
import { BottomBar } from "../navigation/BottomBar"
import "./Cart.css"
import api from "../../interceptor/axios"
import EndPoint from "../../api/EndPoint"
import CartItem from "./CartItem"
import { Box, Card, CardContent, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, InputAdornment, MenuItem, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { Button } from "react-bootstrap"
import { Email } from "@mui/icons-material"
import { Phone } from "react-bootstrap-icons"
import { useSelector } from "react-redux"
import { LockIcon } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import FooterBottom from "../Footer/FooterBottom"
import { useNavigate } from "react-router-dom"

export function Cart() {
    const [cart, setCart] = useState([])
    const [isChange, setIsChange] = useState(false)
    const { user } = useSelector((store) => store.User);
    const navigate = useNavigate()
    const [cartCalculation, setCartCalculation] = useState({
        cartItems: [],

        subTotal: 0,
        discounts: 0,
        discountedPrice: 0,
        ServiceFee: 100,
        deliveryFee: 0,
        taxPercent: 0,
        taxAmount: 0,
        grossAmount: 0,
        netAmount: 0,
        total: 0,
        pickupMethod: "",
        paymentMethod: "",
        contactInfo: {},

    })

    useEffect(() => {
        loadCart()
        console.log("cart-calculation ", cartCalculation);

    }, [cartCalculation,isChange])

    const loadCart = async () => {
        const response = await api.get(EndPoint.GET_CART)
        console.log(response.data.cart.items);
        setCart(response.data.cart.items || [])
    }

    const [openDialog, setOpenDialog] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [includeProtection, setIncludeProtection] = useState(true);

    const handleAddressChange = (event) => {
        const addressId = event.target.value;
        const selectedAddress = user?.profile?.address.find(
            (addr) => addr._id === addressId
        );

        if (selectedAddress) {
            setCartCalculation((prev) => ({
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


    const handlePlaceCart = async () => {
        try {
            await api.post(EndPoint.PLACE_WHOLE_CART, cartCalculation)
            navigate("/order-confirmed")
            openDialog(prev=>false)

        } catch (err) {
            toast.error("Something went wrong")
            console.log(err);

        }
    }

    return (
        <>
            <ToastContainer />
            <BottomBar />
            <div className="container product-main-container" >
                <div className="mt-2 product-header d-flex align-items-center justify-content-between">
                    <div>
                        <button onClick={() => { navigate("/browse-products") }} className="btn explore-btn " ><i className="bi bi-arrow-left"></i> Back to Browse Product</button>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <div>
                            <i className="bi bi-cart3"></i> Cart ({cart.length})
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-8">
                        <div className="cart-products-container p-3">

                            {cart.length > 0 ? cart.map((item, index) => {
                                return <CartItem key={index} item={item} setCartCalculation={setCartCalculation} setIsChange={setIsChange} />

                            }) : <p>No items in cart</p>}

                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="order-summary p-4 d-flex flex-column gap-2">
                            <span><b>Order Summary</b></span>
                            <div className="d-flex justify-content-between mt-4">
                                <small>SubTotal</small>
                                <small><b><i className="bi bi-currency-rupee"></i>{cartCalculation.subTotal.toFixed(2)}</b></small>
                            </div>
                            <div className="d-flex justify-content-between text-success">
                                <small>% Discounts</small>
                                <small><b>{cartCalculation.discounts.toFixed(2)}</b> %</small>
                            </div>
                            <div className="d-flex justify-content-between">
                                <small>Service Fee</small>
                                <small><b><i className="bi bi-currency-rupee"></i>{cartCalculation?.ServiceFee.toFixed(2)}</b></small>
                            </div>
                            <div className="d-flex justify-content-between">
                                <small>Tax</small>
                                <small><b><i className="bi bi-currency-rupee"></i>{cartCalculation.taxAmount.toFixed(2)}</b></small>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <small><b>Total</b></small>
                                <small className="text-success"><b><i className="bi bi-currency-rupee"></i>{cartCalculation.total.toFixed(2)}</b></small>
                            </div>
                            <button onClick={() => { setOpenDialog(true) }} className="form-control mt-2 btn btn-success">Place Cart</button>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <small className="pinkish">Some items are unavailable and will be </small>
                                <small className="pinkish"> excluded from checkout</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            {/* Dialog to plce cart */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>Order</DialogTitle>
                <DialogContent dividers>
                    {/* Payment Method */}
                    <div className="mb-4">
                        <FormLabel component="legend" className="mb-2">
                            Payment Method
                        </FormLabel>
                        <RadioGroup
                            onChange={(event) => {
                                setCartCalculation((prev) => ({
                                    ...prev,
                                    paymentMethod: event.target.value
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
                                        setCartCalculation((prev) => ({
                                            ...prev,
                                            contactInfo: {
                                                ...prev.contactInfo,
                                                email: event.target.value
                                            }

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
                                        setCartCalculation((prev) => ({
                                            ...prev,
                                            contactInfo: {
                                                ...prev.contactInfo,
                                                phone: event.target.value
                                            }
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
                                    value={cartCalculation.contactInfo?.addressId || ""}
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


                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handlePlaceCart} variant="contained">
                        Place Cart
                    </Button>
                </DialogActions>
            </Dialog>

            <FooterBottom/>
        </>
    )
}
