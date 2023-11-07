import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LoadImage from "../../components/LoadImage";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOffers, getTopCategories } from "../../stores/home/homeSlice";
import PreLoader from "../../utils/PreLoader";
import i18next from "i18next";

function TopAndOffers() {
  const isEnglish = i18next.language === "en" ? true : false;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { topCategories, offers, tcIsLoading, offersIsLoading } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    dispatch(getTopCategories());
    dispatch(getOffers());
  }, []);

  return (
    <div className="container-fluid mb-1 mb-lg-3">
      <div className="row px-xl-5">
        {tcIsLoading ? (
          <div className="col-lg-8">
            <PreLoader />
          </div>
        ) : (
          <div className="col-lg-8">
            <div
              id="header-carousel"
              className="carousel slide carousel-fade mb-30 mb-lg-0"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                {topCategories.map((_, index) => (
                  <li
                    key={index}
                    data-target="#header-carousel"
                    data-slide-to={index}
                    className={index === 0 ? "active" : ""}
                  ></li>
                ))}
              </ol>
              <div className="carousel-inner">
                {topCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className={`carousel-item position-relative${
                      index === 0 ? " active" : ""
                    }`}
                    style={{ height: "430px" }}
                  >
                    <LoadImage
                      style={{ objectFit: "cover" }}
                      src={category.cover}
                      alt="Product image"
                      width={"100%"}
                      height={"100%"}
                    />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{ maxWidth: "700px" }}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                          {isEnglish ? category.titleEN : category.titleAR}
                        </h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                          {isEnglish
                            ? category.descriptionEN
                            : category.descriptionAR}
                        </p>
                        <NavLink
                          to={category.path}
                          className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                        >
                          {t("common.shop_now")}
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Offers */}
        {offersIsLoading ? (
          <div className="col-lg-4">
            <PreLoader />
          </div>
        ) : (
          <div className="col-lg-4">
            {offers.slice(0, 2).map((offer) => (
              <div
                key={offer.id}
                className="product-offer mb-30"
                style={{ height: "200px" }}
              >
                <LoadImage
                  className="img-fluid"
                  style={{ objectFit: "cover" }}
                  src={offer.cover}
                  alt="Product image"
                  width={"100%"}
                  height={"100%"}
                />
                <div className="offer-text">
                  <h6 className="text-white text-uppercase">
                    {isEnglish ? offer.descriptionEN : offer.descriptionAR}
                  </h6>
                  <h3 className="text-white mb-3">
                    {isEnglish ? offer.titleEN : offer.titleAR}
                  </h3>
                  <NavLink to={offer.path} className="btn btn-primary">
                    {t("common.shop_now")}
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TopAndOffers;
