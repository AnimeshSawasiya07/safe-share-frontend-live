import { useEffect, useMemo, useState } from "react";
import EndPoint, { BASE_URL } from "../../api/EndPoint";
import { toast, ToastContainer } from "react-toastify";
import api from "../../interceptor/axios";

function CartItem({ item, setCartCalculation, setIsChange }) {

    const [quantity, setQuantity] = useState(1)
    const [noOfDays, setNoOfDays] = useState(1)

    const TAX_PERCENT = 18;

    const orderSummary = useMemo(() => {
        const basePrice = (item?.listing?.price || 0) * (quantity || 1);
        const subTotal = item?.listing?.type === "rent"
            ? basePrice * (noOfDays || 1)
            : basePrice;

        const discount = item?.listing?.discount || 0;
        const discountedPrice = subTotal - (subTotal * discount) / 100;

        const netAmount = discountedPrice;
        const taxAmount = (netAmount * TAX_PERCENT) / 100;
        const grossAmount = netAmount + taxAmount;

        return {
            listingId: item?.listing?._id,
            sellerId: item?.listing?.ownerId?._id,
            subTotal,
            discount,
            discountedPrice,
            quantity: quantity,
            noOfDays: noOfDays,
            taxPercent: TAX_PERCENT,
            taxAmount,
            netAmount,
            grossAmount,
            total: grossAmount,
        };
    }, [quantity, noOfDays, item]);


    useEffect(() => {
        setCartCalculation(prev => {
            // check if item already exists
            const existingIndex = prev.cartItems.findIndex(ci => ci.id === item._id);

            let updatedCartItems;

            if (existingIndex !== -1) {
                // update existing item
                updatedCartItems = [...prev.cartItems];
                updatedCartItems[existingIndex] = orderSummary;
            } else {
                // add new item
                updatedCartItems = [...prev.cartItems, orderSummary];
            }

            const subTotal = updatedCartItems.reduce((sum, ci) => sum + ci.subTotal, 0);
            const discounts = updatedCartItems.reduce((sum, ci) => sum + (ci.subTotal - ci.discountedPrice), 0);
            const taxAmount = updatedCartItems.reduce((sum, ci) => sum + ci.taxAmount, 0);
            const ServiceFee = prev.ServiceFee || 100;
            const total = subTotal - discounts + taxAmount + ServiceFee;

            return {
                ...prev,
                cartItems: updatedCartItems,
                subTotal,
                discounts,
                taxAmount,
                total

            };
        });
    }, [quantity, noOfDays]);

    const handleRemoveFromCart = async () => {
        try {
            console.log(item.listing._id);

            await api.delete(EndPoint.REMOVE_FROM_CART+`/${item.listing._id}`)
            toast.success("item removed from cart")
            setIsChange(prev => !prev)
        } catch (err) {
            toast.error("Something went wrong")
            console.log(err);

        }

    }

    return (
        <>
            <ToastContainer />
            <div className="cart-product p-3 d-flex">
                <div className="cart-product-image" style={{ height: "100px", width: "100px" }}>
                    <img style={{ height: "100px", width: "100px" }} src={item?.listing?.images[0].startsWith("http") ? item?.listing?.images[0] : BASE_URL + "/products/images/" + item?.listing?.images[0]} alt={item?.listing?.title} />
                </div>
                <div className="ms-4 me-3 w-100 d-flex flex-column gap-2">
                    <div className="cart-p-title d-flex justify-content-between">
                        <div>{item?.listing?.title}</div>
                        <div className="d-flex gap-4">
                            <button className="btn"><i className="bi bi-heart"></i></button>
                            <button onClick={handleRemoveFromCart} className="btn"><i className="bi bi-trash"></i></button>
                        </div>
                    </div>
                    <div className="d-flex gap-4">
                        <div className="cart-p-category ps-3 pe-3 d-flex justify-content-center align-items-center">
                            <small>{item?.listing?.category.name}</small>
                        </div>
                        <div className="cart-p-type ps-3 pe-3 d-flex justify-content-center align-items-center">
                            <small>{item?.listing?.type}</small>
                        </div>
                    </div>
                    <div className="d-flex gap-4">
                        <small>by {item?.listing?.ownerId?.name}</small>
                        <small><i className="bi bi-star"></i> {item?.listing?.rating}</small>
                        <small><i className="bi bi-geo-alt"></i> {item?.listing?.location?.city || "N/A"}</small>
                    </div>
                    <div className="d-flex gap-4">
                        <small><i className="bi bi-clock"></i> {item.duration || "N/A"}</small>
                        <small>{item.dateRange || "N/A"}</small>
                    </div>

                    {/* Quantity / No of Days Controls */}
                    <div className="d-flex align-items-center gap-5 mt-2">
                        <div className="d-flex align-items-center gap-2">
                            <span>Quantity: </span>
                            <button onClick={() => {
                                setQuantity(prev => {
                                    if (prev <= 1)
                                        return 1

                                    return prev - 1
                                })
                            }} className="btn btn-sm btn-outline-secondary" >-</button>
                            {quantity}
                            <button onClick={() => { setQuantity(prev => prev + 1) }} className="btn btn-sm btn-outline-secondary" >+</button>

                        </div>
                        {item?.listing?.type === "rent" && <div className="d-flex align-items-center gap-2">
                            <span>Duration (in days): </span>
                            <button onClick={() => {
                                setNoOfDays(prev => {
                                    if (prev <= 1)
                                        return 1

                                    return prev - 1
                                })
                            }} className="btn btn-sm btn-outline-secondary" >-</button>
                            {noOfDays}
                            <button onClick={() => { setNoOfDays(prev => prev + 1) }} className="btn btn-sm btn-outline-secondary" >+</button>
                        </div>}
                    </div>

                    <div className="d-flex justify-content-end mt-2">
                        <span className="text-success">
                            <b><i className="bi bi-currency-rupee"></i>{item?.listing?.price}</b>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem;