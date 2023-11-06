import React from "react";
import LoadImage from "../../components/LoadImage";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="text-center px-2">
      <LoadImage
        src={require("../../assets/imgs/looking.png")}
        width={250}
        height={250}
      />
      <h5 className="my-2">{t("not_found.title")}</h5>
      <NavLink to="/">
        {t("not_found.referral_link")} {t("navbar.home")}
      </NavLink>
    </div>
  );
}

export default NotFound;
