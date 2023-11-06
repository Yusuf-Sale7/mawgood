import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
  updateCart,
} from "../stores/user/userSilce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import StarRatings from "react-star-ratings";
import { NavLink, useNavigate } from "react-router-dom";
import LoadImage from "./LoadImage";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

function Product({ product, size, page }) {
  const isEnglish = i18next.language === "en" ? true : false;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleAddFavProduct = (id) => {
    dispatch(addFavoriteProduct(id));
  };

  const handleRemoveFavProduct = (id) => {
    dispatch(removeFavoriteProduct(id));
  };

  const handleUpdateCart = (id, quantity, size, color) => {
    dispatch(updateCart({ id, quantity, size, color }));
  };

  const handleSearch = (query) => {
    navigateTo(`/search?query=${query}`);
  };

  return (
    <div
      className={
        size === "lg"
          ? "col-lg-4 col-md-6 col-sm-6 pb-1"
          : size === "auto"
          ? ""
          : "col-lg-3 col-md-4 col-sm-6 pb-1"
      }
    >
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden text-center">
          <NavLink to={`/product/${product.id}`}>
            <LoadImage
              src={product.thumbnail}
              alt="Product image"
              width={250}
              height={250}
            />
          </NavLink>
          <div className="product-action">
            {user.inCart?.includes(product.id) ? (
              <button
                className="btn btn-dark text-primary btn-square mx-1 animate__animated animate__bounce"
                onClick={() => handleUpdateCart(product.id, 0, "all", "all")}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            ) : (
              <button
                className="btn btn-outline-dark btn-square mx-1"
                onClick={() =>
                  user.username
                    ? handleUpdateCart(
                        product.id,
                        1,
                        product.sizes?.[0],
                        product.colors?.[0].id
                      )
                    : navigateTo("/signin", { state: page })
                }
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            )}
            {user.favorites?.includes(product.id) ? (
              <button
                onClick={() => handleRemoveFavProduct(product.id)}
                className="btn btn-dark text-primary btn-square mx-1 animate__animated animate__bounce"
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            ) : (
              <button
                onClick={() =>
                  user.username
                    ? handleAddFavProduct(product.id)
                    : navigateTo("/signin", { state: page })
                }
                className="btn btn-outline-dark btn-square mx-1"
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            )}
            <button
              className="btn btn-outline-dark btn-square mx-1"
              onClick={() =>
                handleSearch(isEnglish ? product.title : product.titleAR)
              }
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="text-center py-2">
          <NavLink
            to={`/product/${product.id}`}
            className="text-decoration-none"
          >
            <h6 className="text-truncate px-2">
              {isEnglish ? product.title : product.titleAR}
            </h6>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <h5>{`${product.price} ${t("common.currency")}`}</h5>
              {product.prevPrice && (
                <h6 className="text-muted ml-2 mt-1">
                  <del>{`${product.prevPrice} ${t("common.currency")}`}</del>
                </h6>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-center mb-1">
              <StarRatings
                rating={product.rating.rate}
                starRatedColor="rgb(255, 211, 51)"
                starDimension="20px"
                starSpacing="0px"
              />
              <sub className="mx-1">({product.rating.count})</sub>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Product;
