import React from "react";
import Carousel from "react-elastic-carousel";
import Avatar from "react-avatar";
import Item from "./Item.js";
import "./reviewShow.css";
import ReactStars from "react-rating-stars-component";

const ReviewShow = ({ reviews }) => {
  const options = {
    productcount: 5,
    size: 24,
    isHalf: true,
    edit: false,
    activeColor: "#ffd700",
  };
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];
  console.log("revs", reviews);
  return (
    <div className="reviews">
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints}>
          {reviews?.map((review) => (
            <Item key={review._id}>
              <div className="review-container">
                <Avatar
                  style={{ borderRadius: "50%" }}
                  name={review?.name}
                  size="50"
                  textSizeRatio={1.75}
                />
                <h5>{review?.name}</h5>
                <ReactStars {...options} value={review.rating}></ReactStars>
                <p>{review?.comment}</p>
              </div>
            </Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ReviewShow;
