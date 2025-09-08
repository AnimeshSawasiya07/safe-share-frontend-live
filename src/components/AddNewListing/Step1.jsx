import { TextField, MenuItem, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { newListing } from "../../redux-config/newListingSlice";
import {useNavigate } from "react-router-dom";
import api from "../../interceptor/axios";
import EndPoint from "../../api/EndPoint";

export function Step1({setCurrentStep,allSteps,stepsDone,setStepsDone}) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [listingType, setListingType] = useState("sale");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [categories,setCategories] = useState([])

    useEffect(()=>{
        dispatch(newListing({title,category,listingType,description}))
    },[title,category,listingType,description])

    useEffect(()=>{
        loadCategory()
    },[])

    const loadCategory = async () => {
        try {
            const response = await api.get(EndPoint.CATEGORY_LIST)
            console.log(response.data.categories);
            
            setCategories(prev=>response.data.categories)
        } catch (err) {
            console.log(err);

        }
    }

    return (
        <>
            <div className="bg-white shadow p-4 rounded ">
                <h5 className="mb-3">Basic Details</h5>

                {/* Title */}
                <div className="mb-3">
                    <TextField
                        label="Item Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        helperText={`${title.length}/25 characters`}
                        inputProps={{ maxLength: 25 }}
                    />
                </div>

                {/* Category & Listing Type */}
                <div className="row mb-3">
                    <div className="col-md-6">
                        <TextField
                            select
                            label="Category"
                            variant="outlined"
                            fullWidth
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((option,index) => (
                                <MenuItem key={index} value={option?._id}>
                                    {option?.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className="col-md-6">
                        <FormLabel component="legend" className="mb-2">Listing Type</FormLabel>
                        <RadioGroup
                            row
                            value={listingType}
                            onChange={(e) => setListingType(e.target.value)}
                        >
                            <FormControlLabel value="rent" control={<Radio />} label="For Rent" />
                            <FormControlLabel value="sell" control={<Radio />} label="For Sell" />
                        </RadioGroup>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                    <TextField
                        label="Description"
                        multiline
                        minRows={4}
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outlined"
                    />
                </div>

                {/* Buttons */}

            </div>
            <div className="d-flex justify-content-between mt-4">
                <button onClick={()=>{navigate(-1)}} className="btn btn-outline-secondary">← Cancel</button>
                <button onClick={()=>{setCurrentStep(prev=> 1)
                    setStepsDone(prev=>[...prev,allSteps[1]])
                }} className="btn btn-primary bg-gradient">Continue →</button>
            </div>
        </>
    )
}