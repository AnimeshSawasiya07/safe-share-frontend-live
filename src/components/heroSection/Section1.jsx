import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaCheckCircle, FaStar } from "react-icons/fa";

export function Section2() {
    return (
        <section className="hero-section py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 text-start">
                        <span className="badge rounded-pill bg-pinkish light-pinkish px-3 py-2 mb-3 fw-semibold">
                            Featured Collection
                        </span>

                        <h1 className="fw-bold pinkish display-5 mb-3">
                            Lend or{" "}
                            <span style={{ color: "#7a124d", borderBottom: "4px solid #e4a4cc" }}
                            >
                                Sell
                            </span>{" "}
                            Your Items.
                        </h1>

                        <p className="text-muted mb-4">
                            Share your books, tools, or gadgets with your community.
                            Rent or sell them temporarily — only to verified users you trust.
                        </p>

                        <button className="btn explore-btn px-4 py-2 fw-bold text-white mb-4">
                            Explore Collection <FaArrowCircleRight className="ms-2" />
                        </button>

                        <ul className="list-unstyled">
                            <li className="mb-2 text-dark">
                                <FaCheckCircle className="light-pinkish me-2" /> Verified Listings
                            </li>
                            <li className="mb-2 text-dark">
                                <FaCheckCircle className="light-pinkish me-2" /> Flexible Rentals & Sales
                            </li>
                            <li className="mb-2 text-dark">
                                <FaCheckCircle className="light-pinkish me-2" /> No Hidden Charges
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-6 position-relative text-center mt-4 mt-md-0">
                        <span
                            className="badge rounded-pill explore-btn text-white px-3 py-2 fw-semibold position-absolute top-0 end-0 me-5 mt-3 shadow"
                            style={{ zIndex: 2 }}
                        >
                            <FaStar className="me-1" /> Featured
                        </span>

                        <img src="/images/product-bag.webp" alt="Product" className="img-fluid bag-image" />

                        <div
                            className="bg-white shadow p-3 rounded position-absolute bottom-0 end-0 me-5 mb-4 text-start"
                            style={{ width: "250px" }}
                        >
                            <div className="text-warning mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <p className="mb-1 fst-italic text-dark">
                                "Exceptional quality and design"
                            </p>
                            <small className="text-muted">- Anshika</small>
                        </div>
                    </div>
                </div>    
            </div>
        </section>
    );
}