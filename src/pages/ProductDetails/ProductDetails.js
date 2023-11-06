import React from "react";
import Details from "./Details";
import Similar from "./Similar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductDetails() {
  const { id } = useParams();
  const { details } = useSelector((state) => state.product);
  const category = details?.product?.category;

  return (
    <>
      <Details />
      <Similar category={category} productId={id} />
    </>
  );
}

export default ProductDetails;
