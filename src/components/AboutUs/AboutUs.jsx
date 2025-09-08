export const AboutUs = () => {
  return (
    <div className="about-us-container container py-5 h-100 ">
      <div className="row align-items-center flex-column-reverse flex-md-row">
        
        {/* Left Side Content */}
        <div className="col-md-7 text-center text-md-start">
          <button className="btn light-pinkish bg-pinkish btn-sm rounded-pill mb-3 px-3">
            ● About ShareHub
          </button>

          <h1 className="fw-bold pinkish fs-2 fs-md-1">
            Building a <br />
            <span style={{ color: "#7a124d", borderBottom: "4px solid #e4a4cc" }}>
              Sharing Economy
            </span><br />
            for Everyone
          </h1>

          <p className="text-muted mb-4">
            We believe in the power of community. ShareHub connects neighbors, friends, and local businesses to share resources, reduce waste, and build stronger relationships.
          </p>

          {/* Features List */}
          <div className="row mb-4">
            <div className="col-12 col-sm-6">
              <p className="pinkish mb-2">✔ Verified community members only</p>
              <p className="pinkish mb-2">✔ 24/7 customer support</p>
              <p className="pinkish mb-2">✔ Easy dispute resolution</p>
            </div>
            <div className="col-12 col-sm-6">
              <p className="pinkish mb-2">✔ Secure payment processing</p>
              <p className="pinkish mb-2">✔ Insurance coverage included</p>
              <p className="pinkish mb-2">✔ Mobile app available</p>
            </div>
          </div>

          {/* Stats */}
          <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-4 mb-4">
            <div>
              <h5 className="text-primary">100K+</h5>
              <small className="text-muted">Active Users</small>
            </div>
            <div>
              <h5 className="text-primary">1M+</h5>
              <small className="text-muted">Items Shared</small>
            </div>
            <div>
              <h5 className="text-primary">50+</h5>
              <small className="text-muted">Cities</small>
            </div>
            <div>
              <h5 className="text-primary">4.9</h5>
              <small className="text-muted">Rating</small>
            </div>
          </div>

          {/* CTA Button */}
          <button className="btn explore-btn text-secondary px-4 py-2 rounded-pill">
            Join Our Community →
          </button>
        </div>

        {/* Right Side Image */}
        <div className="col-md-5 mb-4 mb-md-0 text-center">
          <img
            src="/images/About_us.webp"
            alt="Team working"
            className="img-fluid rounded-4 shadow w-100"
            style={{ maxWidth: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};
