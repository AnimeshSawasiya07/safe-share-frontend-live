// HeroSection.jsx
import { useEffect, useState, forwardRef, useMemo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./HeroSection.css";
import { Section1 } from "./Section2";
import { Section2 } from "./Section1";
import { Section3 } from "./Section3";

export const HeroSection = forwardRef((props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const components = useMemo(() => [Section1, Section2 , Section3], []);;
const CurrentComponent = components[currentIndex];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + components.length) % components.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
    };

    return (
        <div ref={ref}>
            <CurrentComponent/>
            <div className="d-flex justify-content-center gap-3 mb-5 pb-5">
                <button onClick={handlePrev} className="btn btn-light rounded-circle shadow" style={{"zIndex":999}}>
                    <FaArrowLeft />
                </button>
                <button onClick={handleNext} className="btn btn-light rounded-circle shadow" style={{"zIndex":999}}>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
});
