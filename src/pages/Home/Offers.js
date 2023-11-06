import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LoadImage from "../../components/LoadImage";
import { getOffers } from "../../stores/home/homeSlice";
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";
import PreLoader from "../../utils/PreLoader";
import { NavLink } from "react-router-dom";

function Offers() {
  const isEnglish = i18next.language === "en" ? true : false;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { offers, offersIsLoading } = useSelector((state) => state.home);
  useEffect(() => {
    dispatch(getOffers());
  }, []);

  return (
    <div className="container-fluid pt-5 pb-3">
      {offersIsLoading ? (
        <div className="row px-xl-5">
          <PreLoader />
        </div>
      ) : (
        <div className="row px-xl-5">
          {offers.slice(0, 2).map((offer) => (
            <div key={offer.id} className="col-md-6">
              <div className="product-offer mb-30" style={{ height: "300px" }}>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Offers;
