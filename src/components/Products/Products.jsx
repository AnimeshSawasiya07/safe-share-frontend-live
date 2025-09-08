import { useEffect, useReducer, useState } from "react"
import "./Products.css"
import axios from "axios"
import EndPoint, { BASE_URL } from "../../api/EndPoint"
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { Checkbox, FormControlLabel, FormGroup, Rating, Slider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../navigation/BottomBar";
import { HeroSection } from "../heroSection/HeroSection";
import api from "../../interceptor/axios";
import FooterBottom from "../Footer/FooterBottom";
import { Footer } from "../Footer/Footer";

export function Products() {

    const navigate = useNavigate()
    const sliderMinValue = 0
    const sliderMaxValue = 100000

    const [categoryFilter, setCategoryFilter] = useState([])
    const [conditionFilter, setConditionFilter] = useState([])
    const [minimumRating, setMinimumRating] = useState(0)
    const [value, setValue] = useState([sliderMinValue, sliderMaxValue])
    const [search, setSearch] = useState("");

    const [state, dispatch] = useReducer((state, action) => {
        if (action.type == "set-category") {
            state.categoryList = action.payload
        }
        else if (action.type == "set-products") {
            state.productList = action.payload
            state.OriginalProductsList = action.payload
        }
        else if (action.type == "set-visible-products") {
            state.productList = state.OriginalProductsList.filter(product => categoryFilter.includes(product?.category?.name) || categoryFilter.includes("All") || categoryFilter.length == 0)
            state.productList = state.productList.filter(product => conditionFilter.includes(product?.condition) || conditionFilter.includes("All") || conditionFilter.length == 0)
            state.productList = state.productList.filter(product => product.rating * 1 >= minimumRating || minimumRating == 0)
            state.productList = state.productList.filter(product => product.price >= value[0] && product.price <= value[1])
        }

        return { ...state }
    }, {
        categoryList: [],
        productList: [],
        OriginalProductsList: []

    })


    useEffect(() => {
        loadCategory();
        loadProducts()
    }, [])


    useEffect(() => {

        if (search.length > 0) {
            fetchSearchProducts();
        } else {
            console.log("search else load product");

            loadProducts();
        }
    }, [search]);


    useEffect(() => {
        dispatch({ type: "set-visible-products" })

    }, [categoryFilter, value, minimumRating, conditionFilter])

    const fetchSearchProducts = async () => {
        try {
            const res = await api.get(EndPoint.SEARCH_PRODUCTS + `/${search}`);
            dispatch({ type: "set-products", payload: res.data.Listings });
        } catch (err) {
            console.log(err);
        }
    };


    const loadCategory = async () => {
        try {
            const response = await api.get(EndPoint.CATEGORY_LIST)
            dispatch({ type: "set-category", payload: response.data.categories })
        } catch (err) {
            console.log(err);

        }
    }


    const loadProducts = async () => {
        try {
            const response = await api.get(EndPoint.PRODUCTS_LIST)
            dispatch({ type: "set-products", payload: response.data.Listings })

        } catch (err) {
            console.log(err);

        }
    }


    const handleChange = (event, newValue) => {
        setValue(prev => newValue)
    }

    const handleCategoryChange = (event, category) => {
        const checked = event.target.checked
        if (checked)
            setCategoryFilter(prev => [...prev, category])
        else {
            setCategoryFilter(prev => prev.filter(prevCategory => prevCategory != category))
        }

    }

    const handleMinimumChange = (event, rate) => {
        const checked = event.target.checked

        setMinimumRating(prev => prev === rate ? null : rate)
    }

    const handleClear = () => {
        setCategoryFilter(prev => [])
        setConditionFilter(prev => [])
        setMinimumRating(prev => 0)
        setValue(prev => [sliderMinValue, sliderMaxValue])
    }

    return (
        <>
            <BottomBar />
            <div className="container product-main-container" >
                <div className="mt-2 product-header d-flex align-items-center justify-content-between">
                    <div>
                        <button className="btn explore-btn text-dark" >Products Page</button>
                    </div>
                    <div className="d-flex header-options gap-2 justify-content-end">
                        <div>
                            <input type="text" className="form-control " placeholder="🔍 Search products..."
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>

                    </div>
                </div>
                <hr />
                <HeroSection />

                <div className="container h-100 ">
                    <div className="row h-100 w-100 mb-5 ">
                        <div className="col-md-3 pb-5">
           
                                <div className="mb-3">
                                    <input type="text" className="form-control " placeholder="🔍 Search products..."
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                    />
                                </div>

                            <div className="d-flex justify-content-between">
                                <div><TuneOutlinedIcon />Filters</div>
                                <div><button className="btn" onClick={handleClear}>Clear All</button></div>
                            </div>
                            <div className="mt-4 p-3 side-container">
                                <div>Categories</div>
                                <div className=" category-container">

                                    <div>
                                        <FormControlLabel className=" text-secondary"
                                            control={<Checkbox />}
                                            label="All Categories"
                                            onChange={() => { handleCategoryChange(event, "All") }}
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '14px',
                                                }
                                            }}

                                        />
                                    </div>
                                    {state?.categoryList?.map((category, index) => {
                                        return <div key={category.name}>
                                            <FormControlLabel className=" text-secondary"
                                                control={<Checkbox />}
                                                checked={categoryFilter.includes(category.name)}
                                                onChange={() => { handleCategoryChange(event, category.name) }}
                                                label={category.name}
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '14px',
                                                    }
                                                }}
                                            />
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div className="mt-4 p-3 side-container">
                                <div>Price Range</div>
                                <div className="mt-2">
                                    <Slider className="text-dark"
                                        getAriaLabel={() => 'Minimum Price'}
                                        value={value}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        min={sliderMinValue}
                                        max={sliderMaxValue}
                                        disableSwap
                                    />
                                </div>
                                <div>

                                </div>

                            </div>

                            <div className="mt-4 p-3 side-container">
                                <div>Minimum Rating</div>

                                <div>
                                    <FormGroup>
                                        {[4, 3,].map((rate) => (
                                            <FormControlLabel key={rate} className=" text-secondary"
                                                control={<Checkbox />}
                                                checked={minimumRating == rate}
                                                onChange={() => { handleMinimumChange(event, rate) }}
                                                label={<Rating value={rate} readOnly />}
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '14px',
                                                    }
                                                }}
                                            />
                                        ))}
                                        <FormControlLabel className="text-secondary"
                                            control={<Checkbox />}
                                            label="All Rating"
                                            onChange={() => { handleMinimumChange(event, 0) }}
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '14px',
                                                }
                                            }}
                                        />
                                    </FormGroup>
                                </div>

                            </div>

                            <div className="mt-4 p-3 side-container">
                                <div>Condition</div>

                                <div>
                                    <FormGroup>
                                        {["All", "Excellent", "Like New", "Good", "Fair"].map((condition) => (
                                            <FormControlLabel key={condition} className=" text-secondary"
                                                control={<Checkbox />}
                                                label={condition}
                                                checked={conditionFilter.includes(condition)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked
                                                    if (checked)
                                                        setConditionFilter(prev => [...prev, condition])
                                                    else {
                                                        setConditionFilter(prev => prev.filter(prevCondition => prevCondition != condition))
                                                    }

                                                    console.log(conditionFilter);

                                                }}
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '14px',
                                                    }
                                                }}
                                            />
                                        ))}
                                    </FormGroup>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-9" style={{ height: "1138px", overflowX: "scroll", "overflowY": "scroll", scrollbarWidth: "none" }}>

                            <div className="container">
                                <div className="row w-100">

                                    {state?.productList?.map((product, index) => {
                                        return <div key={product._id} onClick={() => { navigate(`/view-Product/${product._id}`) }} className="  col-md-4 d-flex justify-content-center pb-3 pt-3">
                                            <div className="product-card">
                                                <div className="img-div bg-white">
                                                    <img className="p-img h-100 w-100" src={product?.images[0]?.startsWith("http") ? product?.images[0] : BASE_URL + "/products/images/" + product?.images[0]} alt="" />
                                                    <div className="img-text-div p-2 d-flex">
                                                        <div className="img-text d-flex justify-content-center align-items-center"><small>{product?.category?.name}</small></div>
                                                        <div className="heart-btn d-flex align-items-center justify-content-center"><i className="mt-1 bi bi-heart"></i></div>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column gap-2 pl-2 ps-2 pe-2 pt-2">
                                                    <div className="d-flex justify-content-between">
                                                        <div><i className="bi bi-star-fill text-warning"></i><small> {product?.rating}({product.totalReviews})</small></div>
                                                        <div className="condition-txt d-flex align-items-center justify-content-center mt-1"><small>{product?.condition}</small></div>
                                                    </div>
                                                    <span><strong>{product?.title}</strong></span>
                                                    <span>{product?.location?.city},{product?.location?.state}</span>
                                                    <div className="d-flex justify-content-between">
                                                        <div><small><strong className="text-success">{product?.price} Rs</strong></small>{product?.rentDurationUnit ? <small>/{product.rentDurationUnit}</small> : ""}</div>
                                                        <div><small>by {product?.ownerId?.name}</small></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}