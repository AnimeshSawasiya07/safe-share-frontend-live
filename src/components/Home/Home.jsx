import { AboutUs } from "../AboutUs/AboutUs";
import FAQSection from "../FAQSection/FAQSection";
import { Feature } from "../Feature/Feature";
import { Footer } from "../Footer/Footer";
import { HeroSection } from "../heroSection/HeroSection";
import { BottomBar } from "../navigation/BottomBar";
import { Navigation } from "../navigation/Navigation";

export function Home() {
    return (
        <>
            <Navigation />
            <HeroSection />
            <BottomBar/>
            <Feature />
            <AboutUs/>
            <FAQSection/>
            <Footer/>
        </>
    )
}