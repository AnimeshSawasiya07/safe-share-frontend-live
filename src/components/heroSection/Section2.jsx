import { FaArrowCircleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function Section1(){
     const products = [
        {
            title: "Modern Style",
            price: "₹79.99",
            image: "/images/product1.webp",
        },
        {
            title: "Casual Collection",
            price: "₹64.99",
            image: "/images/product-2.webp",
        },
        {
            title: "Premium Design",
            price: "₹89.99",
            image: "/images/product-6.webp",
        },
        {
            title: "Elegant Series",
            price: "₹74.99",
            image: "/images/product-7.webp",
        },
    ];

    return (
        <section className="py-5 bg-white hero-section">
            <div className="container ">
                <div className="row align-items-center">
                    <div className="col-md-6 text-start">
                        <span className="badge rounded-pill bg-pinkish light-pinkish px-3 py-2 mb-3 fw-semibold">
                            Featured Collection
                        </span>

                        <h1 className="fw-bold pinkish display-5 mb-3">
                            Premium{" "}
                            <span style={{ color: "#7a124d", borderBottom: "4px solid #e4a4cc" }}>
                                Quality
                            </span>{" "}
                            Products
                        </h1>

                        <p className="text-muted mb-4">
                            Buy it. Rent it. Love it. Get only premium quality products — just the way you deserve!
                        </p>

                        <button className="btn explore-btn px-4 py-2 fw-bold text-white mb-4">
                            Shop New Arrivals <FaArrowCircleRight className="ms-2" />
                        </button>
                    </div>

                    {/* Right Side - Product Grid */}
                    <div className="right-side-product col-md-6">
                        <div className="row g-3">
                            {products.map((product, index) => (
                                <div className="col-6" key={index}>
                                    <div className="card border-0 shadow-sm text-center ">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="img-fluid"
                                            style={{ height: "110px", objectFit: "contain" }}
                                        />
                                        <div className="opacity-25">
                                            <hr/>
                                        </div>
                                        <div className="card-body">
                                            <h6 className="card-title text-dark fw-semibold">
                                                {product.title}
                                            </h6>
                                            <p className="light-pinkish fw-bold">{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}