import React from "react";
import StarRatings from "react-star-ratings";

function Stars({ rating, changeRating }) {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="rgb(255, 211, 51)"
      starHoverColor="rgb(255, 211, 51)"
      starDimension="20px"
      starSpacing="0px"
      changeRating={changeRating}
    />
  );
}

export default Stars;
