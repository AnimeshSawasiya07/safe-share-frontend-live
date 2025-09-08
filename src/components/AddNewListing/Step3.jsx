import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import { newListing } from "../../redux-config/newListingSlice";

export function Step3({ setCurrentStep, handlePhotos,handlePreviewaphotos,allSteps,setStepsDone }) {
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const [features, setFeatures] = useState(["Lightweight and durable"]);
    const [featureInput, setFeatureInput] = useState("");

    const [includes, setIncludes] = useState(["Warranty Card (if applicable)"]);
    const [includeInput, setIncludeInput] = useState("");

    const { photos, setPhotos } = handlePhotos;

    const {previewUrls, setPreviewUrls} = handlePreviewaphotos;

    const handlePhotoUpload = (e) => {
        const newFiles = Array.from(e.target.files);
        setPhotos(prevPhotos => {
            const combined = [...prevPhotos, ...newFiles].slice(0, 10);
            return combined;
        });

        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => {
            const combined = [...prev, ...newPreviews].slice(0, 10);
            return combined;
        });
    };

    const addItem = (type) => {
        if (type === "tag" && tagInput.trim()) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        } else if (type === "feature" && featureInput.trim()) {
            setFeatures([...features, featureInput.trim()]);
            setFeatureInput("");
        } else if (type === "include" && includeInput.trim()) {
            setIncludes([...includes, includeInput.trim()]);
            setIncludeInput("");
        }
    };

    const removeItem = (type, index) => {
        if (type === "tag") setTags(tags.filter((_, i) => i !== index));
        if (type === "feature") setFeatures(features.filter((_, i) => i !== index));
        if (type === "include") setIncludes(includes.filter((_, i) => i !== index));
    };

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(photos);
        
        dispatch(newListing({ tags, keyFeatures: features, whatsIncluded: includes }));
    }, [tags, features, includes, photos]);

    return (
        <div className="container mt-4 p-0">
            <div className="bg-white shadow p-4 rounded">
                <h5 className="mb-5">📸 Media & Features</h5>

                {/* Photos */}
                <h6>Photos (Required)</h6>
                <div className="border border-dashed p-4 text-center mb-4" style={{ borderRadius: "12px" }}>
                    <div className="text-success fs-3">⬆️</div>
                    <p>Upload Photos<br /><small>Add up to 10 photos to showcase your item</small></p>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="form-control w-auto mx-auto"
                    />
                </div>

                {/* 🖼️ Image Previews */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                    {previewUrls.map((url, idx) => (
                        <div key={idx} style={{ position: "relative", display: "inline-block" }}>
                            <img
                                src={url}
                                alt={`preview-${idx}`}
                                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ccc" }}
                            />
                            <button
                                onClick={() => {
                                    setPhotos(prev => prev.filter((_, i) => i !== idx));
                                    setPreviewUrls(prev => prev.filter((_, i) => i !== idx));
                                }}
                                style={{
                                    position: "absolute",
                                    top: "-6px",
                                    right: "-6px",
                                    backgroundColor: "red",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    lineHeight: "18px",
                                    textAlign: "center",
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>


                {/* Tags */}
                <div className="mb-3">
                    <label className="mb-2">Tags</label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add tags (e.g., professional, compact)"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={() => addItem("tag")}>Add</button>
                    </div>
                    <div className="mt-2 d-flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span key={index} className="badge bg-secondary">
                                {tag} <button className="btn-close btn-close-white btn-sm ms-2" onClick={() => removeItem("tag", index)} />
                            </span>
                        ))}
                    </div>
                </div>

                {/* Key Features */}
                <div className="mb-3">
                    <label className="mb-2">Key Features</label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add a key feature"
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                        />
                        <button className="btn btn-success" onClick={() => addItem("feature")}>Add</button>
                    </div>
                    <div className="mt-2 d-flex flex-column gap-2">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-success bg-opacity-10 text-success p-2 rounded d-flex justify-content-between align-items-center">
                                <div>✅ {feature}</div>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem("feature", index)}>x</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What's Included */}
                <div className="mb-3">
                    <label className="mb-2">What's Included</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add an included item"
                            value={includeInput}
                            onChange={(e) => setIncludeInput(e.target.value)}
                        />
                        <button className="btn btn-info" onClick={() => addItem("include")}>Add</button>
                    </div>
                    <div className="mt-2 d-flex flex-column gap-2">
                        {includes.map((inc, index) => (
                            <div key={index} className="bg-info bg-opacity-10 text-info p-2 rounded d-flex justify-content-between align-items-center">
                                <div>📦 {inc}</div>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem("include", index)}>x</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <button onClick={() => { setCurrentStep(prev => 1) 
                    setStepsDone(prev=>prev.slice(0,-1))
                }} className="btn btn-outline-secondary">← Previous</button>
                <button onClick={() => { setCurrentStep(prev => 3) 
                    setStepsDone(prev=>[...prev,allSteps[3]])
                }} className="btn btn-primary bg-gradient">Continue →</button>
            </div>
        </div>
    );
};
