export function Section3() {
    return (
        <>
            <section className="py-5 bg-white hero-section">
                <div className="container my-5">
                    <div className="row align-items-center">
                        {/* LEFT CONTENT */}
                        <div className="col-md-6">
                            <div className="mb-2">
                                <span className="badge bg-light light-pinkish bg-pinkish fw-semibold px-3 py-2">Limited Time</span>
                            </div>
                            <h1 className="fw-bold display-5 pinkish">
                                Season <span style={{ color: "#7a124d", borderBottom: "4px solid #e4a4cc" }}>Sale</span> Up To 50% Off
                            </h1>
                            <p className="text-muted">
                                Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit.
                            </p>
                            <button className="btn explore-btn text-white px-4 py-2 fw-bold">
                                Shop Sale →
                            </button>

                            <div className="mt-4">
                                <p className="fw-semibold text-dark">Offer ends in:</p>
                                <div className="row g-2">
                                    {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
                                        <div className="col" key={i}>
                                            <div className="bg-white shadow-sm rounded text-center px-3 py-2">
                                                <h5 className="light-pinkish">-47</h5>
                                                <small className="text-muted">{label}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="col-md-6 position-relative text-center mt-4 mt-md-0">
                            <img
                                src="/images/product-8.webp"
                                alt="Shoe"
                                className="img-fluid"
                                style={{ maxHeight: "400px" }}
                            />

                            {/* Discount badge */}
                            <div
                                className="position-absolute top-0 end-0 translate-middle p-2 rounded-circle explore-btn  text-white shadow fw-bold"
                                style={{ width: "60px", height: "60px", fontSize: "14px" }}
                            >
                                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                                    50%<br />OFF
                                </div>
                            </div>

                            {/* Price Tag */}
                            <div
                                className="card position-absolute bottom-0 start-50 translate-middle-x shadow-sm border-0"
                                style={{ width: "140px" }}
                            >
                                <div className="card-body p-2 text-start">
                                    <small className="text-muted">Best Seller</small>
                                    <br />
                                    <del className="text-muted">₹129.99</del>{" "}
                                    <span className="fw-bold light-pinkish ">₹64.99</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}