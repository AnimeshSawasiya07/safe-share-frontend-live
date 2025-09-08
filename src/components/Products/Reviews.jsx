import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Rating } from "@mui/material";
export default function Reviews() {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const validate = () => {
    const newErrors = { rating: "", comment: "" };
    if (!rating || rating < 1) newErrors.rating = "Please select a rating.";
    if (requireComment && !comment.trim()) newErrors.comment = "Comment is required.";
    if (comment.length > maxLength)
      newErrors.comment = `Comment must be under ${maxLength} characters.`;
    setErrors(newErrors);
    return !newErrors.rating && !newErrors.comment;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await onSubmit?.({ rating, comment: comment.trim() });
    } catch (err) {

      console.error(err);
    }
  };

  const handleClear = () => {
    setRating(0);
    setComment("");
    setErrors({ rating: "", comment: "" });
  };

  useEffect(()=>{
console.log(rating);
console.log(comment);

  },[rating,comment])
  return (
    <div className="container my-4">
      <div className="row">
        {/* Rating Summary */}
        <div className="col-md-4 text-center mb-4">
          <h2 className="text-success mb-1">4.8</h2>
          <div className="mb-1 text-warning fs-4">★★★★★</div>
          <p className="text-muted small">45 reviews</p>
        </div>

        {/* Rating Breakdown */}
        <div className="col-md-8 d-flex flex-column p-2 rounded border">
          <label>Give your rating</label>
          <Rating onChange={(event)=>{setRating(prev=>event.target.value)}} className="mt-1" name="half-rating" defaultValue={rating} precision={0.5} />
          <label className="mt-2">Comment</label>
          <textarea onChange={(event)=>{setComment(prev=>event.target.value)}} className="form-control mt-1" name="comment" rows="4" placeholder="Write your review here..."></textarea>
          <button className="btn btn-success mt-2" style={{"width":"8%","alignSelf":"end"}}>Done</button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-4">
        {[
          {
            name: "Mike Johnson",
            stars: 5,
            text: "Amazing camera! Sarah was super helpful and the equipment was in perfect condition. Highly recommend!",
            time: "2 days ago",
            img: "https://via.placeholder.com/40",
          },
          {
            name: "Emily Davis",
            stars: 5,
            text: "Perfect for my wedding shoot. The camera performed flawlessly and Sarah was very responsive.",
            time: "1 week ago",
            img: "https://via.placeholder.com/40",
          },
          {
            name: "David Kim",
            stars: 5,
            text: "Great quality camera. Easy pickup and return process. Will definitely rent again!",
            time: "2 weeks ago",
            img: "https://via.placeholder.com/40",
          },
        ].map((review, idx) => (
          <div
            key={idx}
            className="border rounded p-3 mb-3 bg-white shadow-sm"
          >
            <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex align-items-center">
                <img
                  src={review.img}
                  alt={review.name}
                  className="rounded-circle me-3"
                  width="40"
                  height="40"
                />
                <div>
                  <strong>{review.name}</strong>
                  <div className="text-warning small">
                    {"★".repeat(review.stars)}
                  </div>
                </div>
              </div>
              <small className="text-muted">{review.time}</small>
            </div>
            <p className="mt-2 mb-0 text-muted small">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
