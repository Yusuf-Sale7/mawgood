import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExchangeAlt,
  faPhoneVolume,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function Featured() {
  const { t } = useTranslation();

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 pb-3">
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}
          >
            <h1 className="text-primary m-0 mr-3">
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
            </h1>
            <h5 className="font-weight-semi-bold m-0">{t("featured.first")}</h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}
          >
            <h1 className="text-primary m-0 mr-2">
              <FontAwesomeIcon icon={faShippingFast}></FontAwesomeIcon>
            </h1>
            <h5 className="font-weight-semi-bold m-0">
              {t("featured.second")}
            </h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}
          >
            <h1 className="text-primary m-0 mr-3">
              <FontAwesomeIcon icon={faExchangeAlt}></FontAwesomeIcon>
            </h1>
            <h5 className="font-weight-semi-bold m-0">{t("featured.third")}</h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}
          >
            <h1 className="text-primary m-0 mr-3">
              <FontAwesomeIcon icon={faPhoneVolume}></FontAwesomeIcon>
            </h1>
            <h5 className="font-weight-semi-bold m-0">
              {t("featured.fourth")}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
