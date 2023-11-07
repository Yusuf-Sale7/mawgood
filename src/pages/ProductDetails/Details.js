import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../stores/product/productSlice";
import PreLoader from "../../utils/PreLoader";
import LoadImage from "../../components/LoadImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faMinus,
  faPlus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Stars from "../../components/Stars";
import { useTranslation } from "react-i18next";
import { updateCart } from "../../stores/user/userSilce";
import ReviewProduct from "./ReviewProduct";
import i18next from "i18next";

function Details() {
  const isEnglish = i18next.language === "en" ? true : false;
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const { details, isLoading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [quantity, setQuantity] = useState(1);
  const isReviewed = details.product?.rating?.comments?.some(
    (el) => el.username === user.username
  );
  const canAddToCart =
    (details.product?.sizes ? (size == null ? false : true) : true) &&
    (details.product?.colors ? (color == null ? false : true) : true);

  // Get rate by stars
  const ratings = details.product?.rating?.comments;
  const oneStar = ratings?.filter((el) => el.rate === 1).length;
  const twoStar = ratings?.filter((el) => el.rate === 2).length;
  const threeStar = ratings?.filter((el) => el.rate === 3).length;
  const fourStar = ratings?.filter((el) => el.rate === 4).length;
  const fiveStar = ratings?.filter((el) => el.rate === 5).length;

  const handleUpdateCart = () => {
    const id = details.product?.id;
    user.username
      ? dispatch(updateCart({ id, quantity, size, color }))
      : navigateTo("/signin", { state: `/product/${id}` });
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id]);

  return isLoading ? (
    <PreLoader />
  ) : details.error ? (
    <div className="p-4 text-center">
      <div className="col-12 text-center">
        <LoadImage src={require("../../assets/imgs/looking.png")} />
        <h5 className="mt-3">{t("common.no_product")}</h5>
      </div>
    </div>
  ) : (
    <div className="container-fluid pb-5">
      <div className="row px-xl-5">
        <div className="col-lg-5 mb-30">
          <div
            id="product-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner bg-light">
              {details.product?.images.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item text-center ${
                    index == 0 ? "active" : ""
                  }`}
                >
                  <LoadImage
                    width="500"
                    height="500"
                    src={img}
                    alt="Image"
                    className="product-details-img"
                  />
                </div>
              ))}
            </div>
            <a
              className="carousel-control-prev"
              href="#product-carousel"
              data-slide="prev"
            >
              <i className="fa fa-2x fa-angle-left text-dark"></i>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="text-dark"
                size="2x"
              />
            </a>
            <a
              className="carousel-control-next"
              href="#product-carousel"
              data-slide="next"
            >
              <FontAwesomeIcon
                icon={faAngleRight}
                className="text-dark"
                size="2x"
              />
            </a>
          </div>
        </div>

        <div className="col-lg-7 h-auto mb-30">
          <div className="h-100 bg-light p-30">
            <p className="mb-2">
              {isEnglish ? details.product?.brand : details.product?.brandAR}
            </p>
            <h3>
              {isEnglish ? details.product?.title : details.product?.titleAR}
            </h3>
            <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                <Stars rating={details.product?.rating?.rate} />
              </div>
              <small className="pt-1">
                ({details.product?.rating?.count} {t("common.rate_count")})
              </small>
            </div>
            <h3 className="font-weight-semi-bold mb-4">
              {`${details.product?.price} ${t("common.currency")}`}
              {details.product?.prevPrice && (
                <del className="small font-weight-bold text-muted mx-2">
                  {`${details.product?.prevPrice} ${t("common.currency")}`}
                </del>
              )}
            </h3>
            <p className="mb-4">
              {isEnglish
                ? details.product?.description
                : details.product?.descriptionAR}
            </p>
            {details.product?.sizes && (
              <div className="d-flex mb-3">
                <strong className="text-dark mr-3">
                  {t("product.sizes")}:
                </strong>
                <form>
                  {details.product?.sizes.map((size, index) => (
                    <div
                      key={index}
                      className="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        className="custom-control-input"
                        id={size}
                        name="product_size"
                        onChange={() => setSize(size)}
                      />
                      <label className="custom-control-label" htmlFor={size}>
                        {size}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
            )}
            {details.product?.colors && (
              <div className="d-flex mb-4">
                <strong className="text-dark mr-2">
                  {t("product.colors")}:
                </strong>
                <form>
                  {details.product?.colors.map((color) => (
                    <div
                      key={color.id}
                      className="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        className="custom-control-input"
                        id={"color" + color.id}
                        name="product_color"
                        onChange={() => setColor(color.id)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={"color" + color.id}
                      >
                        {isEnglish ? color.name : color.nameAR}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
            )}

            {/* Quantity & Add To Cart */}
            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3 w-auto">
                <div className="input-group-btn">
                  <button
                    disabled={quantity <= 1}
                    className="btn btn-primary btn-minus"
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
                <span className="bg-secondary border-0 d-flex align-items-center px-3">
                  {quantity}
                </span>
                <div className="input-group-btn">
                  <button
                    className="btn btn-primary btn-plus"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              <button
                className="btn btn-primary px-3"
                disabled={!canAddToCart}
                onClick={handleUpdateCart}
              >
                <FontAwesomeIcon icon={faShoppingCart} />{" "}
                {t("product.add_to_cart")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row px-xl-5">
        <div className="col">
          <div className="bg-light p-30">
            <div className="nav nav-tabs mb-4">
              <a
                className="nav-item nav-link text-dark active"
                data-toggle="tab"
                href="#tab-pane-1"
              >
                {t("product.description")}
              </a>
              <a
                className="nav-item nav-link text-dark"
                data-toggle="tab"
                href="#tab-pane-2"
              >
                {t("product.reviews")} ({details.product?.rating?.count})
              </a>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab-pane-1">
                <p>
                  {isEnglish
                    ? details.product?.fullDescription
                    : details.product?.fullDescriptionAR}
                </p>
                <div className="row">
                  <table className="table table-striped">
                    <tbody>
                      {details.product?.additionalInfo &&
                        details.product.additionalInfo.map((label, index) => (
                          <tr key={index}>
                            <td className="border-0">
                              {isEnglish ? label.title : label.titleAR}
                            </td>
                            <td className="border-0">
                              {isEnglish ? label.info : label.infoAR}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-pane-2">
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <Stars rating={5} />
                          <span
                            className="mx-1"
                            style={{ position: "relative", bottom: "-3px" }}
                          >
                            ({fiveStar})
                          </span>
                        </li>
                        <li className="my-2">
                          <Stars rating={4} />
                          <span
                            className="mx-1"
                            style={{ position: "relative", bottom: "-3px" }}
                          >
                            ({fourStar})
                          </span>
                        </li>
                        <li className="my-2">
                          <Stars rating={3} />
                          <span
                            className="mx-1"
                            style={{ position: "relative", bottom: "-3px" }}
                          >
                            ({threeStar})
                          </span>
                        </li>
                        <li className="my-2">
                          <Stars rating={2} />
                          <span
                            className="mx-1"
                            style={{ position: "relative", bottom: "-3px" }}
                          >
                            ({twoStar})
                          </span>
                        </li>
                        <li className="my-2">
                          <Stars rating={1} />
                          <span
                            className="mx-1"
                            style={{ position: "relative", bottom: "-3px" }}
                          >
                            ({oneStar})
                          </span>
                        </li>
                      </ul>
                    </div>

                    <h4 className="my-4">{t("product.comments")}</h4>
                    {details.product?.rating?.comments?.length > 0 ? (
                      details.product.rating.comments.map((user, index, list) =>
                        list.some((el) => el.comment) ? (
                          user.comment && (
                            <div
                              key={index}
                              className={
                                index + 1 == list.length
                                  ? "media mb-4"
                                  : "media mb-4 border-bottom"
                              }
                            >
                              <div className="media-body">
                                <h6>
                                  {user.name}
                                  <small>
                                    {" "}
                                    - <i>{user.date}</i>
                                  </small>
                                </h6>
                                <div className="text-primary mb-2">
                                  <Stars rating={user.rate} />
                                </div>
                                <p>{user.comment}</p>
                              </div>
                            </div>
                          )
                        ) : (
                          <div key={index}>No comments</div>
                        )
                      )
                    ) : (
                      <div>{t("product.no_comments")}</div>
                    )}
                  </div>
                  {!isReviewed && <ReviewProduct id={details.product?.id} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
