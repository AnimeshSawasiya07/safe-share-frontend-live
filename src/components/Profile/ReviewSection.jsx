import React from "react";

function ReviewsSection({reviews}){

  const renderStars = (count) =>
    [...Array(count)].map((_, i) => (
      <i key={i} className="fas fa-star text-warning me-1"></i>
    ));

  return (
    <div className=" my-5">
      <div className="bg-white p-4 shadow rounded-4">
        <h5>Reviews & Ratings</h5>
        <div className="d-flex align-items-center mb-3">
          {renderStars(5)}
          <span className="fw-bold ms-2"> {reviews && reviews.length > 0
                                            ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
                                            : 0} <i className="bi bi-star-fill text-warning"> </i></span>
          <small className="text-muted ms-2">({reviews.length})</small>
        </div>

        {reviews?.map((review, idx) => (
          <div
            key={idx}
            className="bg-light rounded p-3 mb-3 d-flex justify-content-between align-items-start flex-column flex-md-row"
          >
            {/* Left: Avatar + Info */}
            <div className="d-flex align-items-start">
              <img
                src={review.buyer.profile.avatar}
                alt={review.buyer.name}
                className="rounded-circle me-3"
                style={{ width: "48px", height: "48px", objectFit: "cover" }}
              />
              <div>
                <h6 className="mb-0 fw-bold text-dark">{review.buyer.name}</h6>
                <small className="text-muted d-block">{review.listing.title}</small>
                <p className="mb-1 mt-2 text-dark">{review.comment}</p>
                <small className="text-muted">{review.createdAt}</small>
              </div>
            </div>

            {/* Right: Stars */}
            <div className="mt-2 mt-md-0">{}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
