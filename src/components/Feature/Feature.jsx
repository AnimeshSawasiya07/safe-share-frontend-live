import "./Feature.css"

export function Feature() {
    return (
        <div className="container feature-main-container d-flex flex-column align-items-center">
            <div className="why-text d-flex justify-content-center align-items-center mt-4">
                <small>Why Choose SafeShare?</small>
            </div>

            <div className="feature-heading d-flex align-items-center flex-column text-center">
                <span className="pinkish">Everything You Need to </span>
                <span style={{ color: "#7a124d", borderBottom: "4px solid #e4a4cc" }}>
                    Share Safely
                </span>
            </div>

            <div className="d-flex flex-column align-items-center mt-3 text-center px-3">
                <span>From verification to insurance, we've built everything you need to lend,</span>
                <span> borrow, and sell with confidence.</span>
            </div>

            <div className="container mt-5 pt-4">
                <div className="row gy-4">
                    {/* Top 3 Cards */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-4 d-flex justify-content-center">
                            <div className={`feature-card feature-card${i}`}>
                                <div className="mt-4 d-flex flex-column align-items-center">
                                    <div className={`card-box card-box${i} d-flex align-items-center justify-content-center`}>
                                        <i className={`bi ${i === 1 ? "bi-shield" : i === 2 ? "bi-people" : "bi-lightning"}`}></i>
                                    </div>
                                    <span className="mt-3"><strong>{
                                        i === 1 ? "Secure & Trusted" :
                                        i === 2 ? "Community First" : "Lightning Fast"
                                    }</strong></span>
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-center h-50 text-center px-2">
                                    {i === 1 && <>
                                        <span>All users are verified. Your items are protected</span>
                                        <span>with our insurance policy.</span>
                                    </>}
                                    {i === 2 && <>
                                        <span>Connect with neighbors and friends. Build trust</span>
                                        <span>within your local community.</span>
                                    </>}
                                    {i === 3 && <>
                                        <span>List items in seconds. Find what you need</span>
                                        <span>instantly with smart search.</span>
                                    </>}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Bottom 3 Cards */}
                    {[4, 5, 6].map((i) => (
                        <div key={i} className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                            <div className={`feature-card feature-card${i}`}>
                                <div className="mt-4 d-flex flex-column align-items-center">
                                    <div className={`card-box card-box${i} d-flex align-items-center justify-content-center`}>
                                        <i className={`bi ${
                                            i === 4 ? "bi-clock" :
                                            i === 5 ? "bi-currency-rupee" : "bi-heart"
                                        }`}></i>
                                    </div>
                                    <span className="mt-3"><strong>{
                                        i === 4 ? "Flexible Timing" :
                                        i === 5 ? "Earn Money" : "Sustainable Living"
                                    }</strong></span>
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-center h-50 text-center px-2">
                                    {i === 4 && <>
                                        <span>Set your own rental periods. Available from</span>
                                        <span>hours to months.</span>
                                    </>}
                                    {i === 5 && <>
                                        <span>Monetize your unused items. Set your own</span>
                                        <span>prices and earn passive income.</span>
                                    </>}
                                    {i === 6 && <>
                                        <span>Reduce waste, save money, and help the</span>
                                        <span>environment by sharing resources.</span>
                                    </>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
