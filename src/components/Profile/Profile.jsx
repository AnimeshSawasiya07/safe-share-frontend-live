import LogoutIcon from '@mui/icons-material/Logout';
import "./Profile.css"
import { Overview } from './OverView';
import { useEffect, useState } from 'react';
import { BottomBar } from '../navigation/BottomBar';
import ReviewsSection from './ReviewSection';
import { MyOrdersSection } from './MyOrdersSection';
import { MyListing } from './MyListing';
import ManageAddress from './ManageAddress';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../redux-config/userSlice';
import api from '../../interceptor/axios';
import EndPoint, { BASE_URL } from '../../api/EndPoint';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import FooterBottom from '../Footer/FooterBottom';
import { useNavigate } from 'react-router-dom';

export function Profile() {
    const [activeTab, setActiveTab] = useState("overview");
    const navigate = useNavigate()

    const [myOrders, setMyOrders] = useState([])
    const [orderOnMyListing, setOrderOnMyListing] = useState([])
    const [myListing, setMyListing] = useState([])
    const [reviews, setReviews] = useState([])
    const [updateFields, setUpdateFiels] = useState({
        name: "",
        contact: "",
        description: "",
        gender: "",
        dateOfBirth: ""
    })
    const [isChange, setIsChange] = useState(false)
    const dispatch = useDispatch()
    const handleSignout = () => {
        dispatch(signout())
    }
    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "address", label: "Manage Address" },
        { id: "orders", label: "My Orders" },
        { id: "listings", label: "My Listings" },
        { id: "reviews", label: "Reviews" }
    ];

    const [user, setUser] = useState()


    useEffect(() => {
        loadUserData()
        loadMyOrders()
        loadOrderOnMyListing()
        loadMyListings()
        loadReviews()


    }, [isChange])

    const loadUserData = async () => {
        try {
            const response = await api.get(EndPoint.USER_DETAILS)
            console.log(response.data.user);
            setUser(prev => response.data.user)

            setUpdateFiels(prev => {
                return {
                    ...prev,
                    name: response.data.user?.name,
                    contact: response.data.user?.contact,
                    description: response.data.user?.description,
                    gender: response.data.user?.profile?.gender,
                    dateOfBirth: response.data.user?.profile?.dateOfBirth
                }
            })

        } catch (err) {
            console.log(err);
        }

    }

    const loadMyOrders = async () => {
        try {
            const response = await api.get(EndPoint.MY_ORDERS)
            console.log("OrderMain",response.data.order);
            setMyOrders(prev => response.data.order)

        } catch (err) {
            console.log(err);
        }
    }

    const loadOrderOnMyListing = async () => {
        try {
            const response = await api.get(EndPoint.ORDERS_ON_MY_LISTING)
            console.log(response);
            setOrderOnMyListing(prev => response.data.orders)

        } catch (err) {
            console.log(err);

        }
    }

    const loadMyListings = async () => {
        try {
            const response = await api.get(EndPoint.MY_LISTINGS)
            console.log(response);
            setMyListing(prev => response.data.listings)

        } catch (err) {
            console.log(err);

        }
    }
    const loadReviews = async () => {
        try {
            const response = await api.get(EndPoint.REVIEWS)
            console.log(response);
            setReviews(prev => response.data.reviews)

        } catch (err) {
            console.log(err);
        }
    }

    const [openDialog, setOpenDialog] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (event) => {
        try {
            event.preventDefault()

            let response = await api.put(EndPoint.UPDATE_USER, updateFields)

            toast.success(response.data.msg)
            setIsChange(prev => !prev)
            setOpenDialog(prev => false)

        } catch (err) {
            console.log(err);

        }
    }

    const [currentIndex, setCurrentIndex] = useState(0)
    const section = [<Overview user={user} />, <ManageAddress myAddresses={user?.profile?.address} setIsChange={setIsChange} />, <MyOrdersSection myOrders={myOrders} />, <MyListing myListing={myListing} />, <ReviewsSection reviews={reviews} />]


    return (
        <>
            <BottomBar />
            <div className="container product-main-container " >
                <div className="mt-2 product-header d-flex align-items-center justify-content-between">
                    <div>
                        <button onClick={() => { navigate("/browse-products") }} className="btn explore-btn " ><i className="bi bi-arrow-left"></i> Back to Browse Product</button>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <div className='btn' onClick={handleSignout}>
                            <LogoutIcon /> Sign out
                        </div>
                    </div>
                </div>
                <hr />
                <div className='Profile-detail-container'>
                    <div className="row p-5">
                        <div className="col-md-6 d-flex flex-column gap-4">
                            <div className="profile-image d-flex justify-content-center align-items-center">
                                <Avatar
                                    src={BASE_URL + "/user/profile/" + user?.profile?.avatar}
                                    alt="profile preview"
                                    sx={{ width: 120, height: 120 }}
                                />
                            </div>

                            <div className='d-flex flex-column gap-2'>
                                <span>{user?.name}</span>
                                <small>{user?.email}</small>
                                <div>
                                    {user?.isVerified ? <small className='profile-isVerified ps-2 pe-2'>Verified</small> : ""}
                                    <small className='profile-isTrusted ps-2 pe-2 ms-2'>Trusted Seller</small>
                                </div>
                                <span> {reviews && reviews.length > 0
                                            ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
                                            : 0} <i className="bi bi-star-fill text-warning"></i><small>({reviews.length} {reviews?.length > 1 ? "reviews" : "review"})</small></span>
                                <div className='d-flex flex-column mt-2'>
                                    <small>{user?.description} </small>
                                </div>
                                <button onClick={() => { setOpenDialog(true) }} className='btn edit-btn text-light w-25 mt-3'><i className='bi bi-pen'></i> Edit Profile</button>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex flex-column align-items-end gap-3 ">

                            <div className='d-flex gap-3'>
                                <div className='total-earned'>
                                    <div className='d-flex h-100 w-100 flex-column align-items-center justify-content-center'>
                                        <span className='text-success'><i className='bi bi-currency-rupee'></i>{orderOnMyListing.reduce((acc, order) => acc + order.total, 0)}</span>
                                        <small>Total Earned</small>
                                    </div>
                                </div>

                                <div className='items-listed'>
                                    <div className='d-flex h-100 w-100 flex-column align-items-center justify-content-center'>
                                        <span className='text-primary'>{myListing.length}</span>
                                        <small>Items Listed</small>
                                    </div>
                                </div>

                                <div className='orders-complete'>
                                    <div className='d-flex h-100 w-100 flex-column align-items-center justify-content-center'>
                                        <span className='text-success'>{myOrders.length}</span>
                                        <small>Orders Complete</small>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex gap-3'>
                                <div className='total-spent'>
                                    <div className='d-flex h-100 w-100 flex-column align-items-center justify-content-center'>
                                        <span className='text-success'><i className='bi bi-currency-rupee'></i>{myOrders.reduce((acc, order) => acc + order.total, 0).toFixed(2)}</span>
                                        <small>Total Spent</small>
                                    </div>
                                </div>

                                <div className='avg-rating'>
                                    <div className='d-flex h-100 w-100 flex-column align-items-center justify-content-center'>
                                        <span className='text-success'> {reviews && reviews.length > 0
                                            ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
                                            : 0} </span>
                                        <small>Avg Rating</small>
                                    </div>
                                </div>

                                <div className='reviews'>
                                    <div className='d-flex h-100 w-100 flex-column align-items-center justify-content-center'>
                                        <span className='text-success'>{reviews?.length}</span>
                                        <small>Reviews</small>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="d-flex bg-white shadow-sm rounded-pill overflow-hidden justify-content-between mt-4">
                    {tabs.map((tab, index) => (
                        <div
                            key={tab.id}
                            className={`tab-item text-center flex-fill py-2 ${activeTab === tab.id ? "active-tab" : ""
                                }`}
                            onClick={() => {
                                setCurrentIndex(prev => index)
                                setActiveTab(prev => tab.id)
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div >
                {section[currentIndex]}
                <FooterBottom/>
            </div>


            {/* Dialog for update profile */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>Update Profile</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        onChange={(event) => {
                            setUpdateFiels(prev => {
                                return {
                                    ...prev,
                                    name: event.target.value,
                                }
                            })
                        }}
                        fullWidth
                        label="Name"
                        defaultValue={updateFields.name}
                        margin="normal"
                    />
                    <TextField
                        onChange={(event) => {
                            setUpdateFiels(prev => {
                                return {
                                    ...prev,
                                    contact: event.target.value,
                                }
                            })
                        }}
                        fullWidth
                        label="Contact"
                        defaultValue={updateFields.contact}
                        margin="normal"
                    />
                    <TextField
                        onChange={(event) => {
                            setUpdateFiels(prev => {
                                return {
                                    ...prev,
                                    gender: event.target.value,
                                }
                            })
                        }}
                        fullWidth
                        label="Gender"
                        defaultValue={updateFields.gender}
                        margin="normal"
                    />
                    <TextField
                        onChange={(event) => {
                            setUpdateFiels(prev => {
                                return {
                                    ...prev,
                                    dateOfBirth: event.target.value,
                                }
                            })
                        }}
                        fullWidth
                        label="D.O.B."
                        type="date"
                        defaultValue={
                            updateFields?.dateOfBirth
                                ? new Date(updateFields.dateOfBirth).toISOString().split("T")[0]
                                : ""
                        }
                        margin="normal"
                    />

                    <TextField
                        onChange={(event) => {
                            setUpdateFiels(prev => {
                                return {
                                    ...prev,
                                    description: event.target.value,
                                }
                            })
                        }}
                        fullWidth
                        label="Description"
                        defaultValue={updateFields.description}
                        multiline
                        rows={2}
                        margin="normal"
                    />

                    {/* <div className='d-flex'>

                        <div style={{ alignSelf: "center" }}>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload Profile Pic
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </div>
                        {preview && (
                            <Avatar
                                className='ms-2'
                                src={preview}
                                alt="profile preview"
                                sx={{ width: 50, height: 50 }}
                            />
                        )}
                    </div> */}

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    )
}