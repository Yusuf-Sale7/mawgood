import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useSelector } from "react-redux";

function TopBar() {
  const navigateTo = useNavigate();
  const auth = AuthService();
  const { user } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const body = document.querySelector("body");
  const [query, setQuery] = useState("");
  const lang = i18next.language;
  const isEnglish = lang === "en" ? true : false;

  const handleSearch = (e) => {
    e.preventDefault();
    navigateTo(`/search?query=${query}`);
    setQuery("");
  };

  // Switch style
  lang === "ar" ? body.classList.add("rtl") : body.classList.remove("rtl");

  const changeLang = (lang) => {
    i18next.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const handleSignout = (e) => {
    e.preventDefault();
    auth.signout();
    navigateTo("/signin");
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center bg-light py-3 px-xl-5">
        <div className="col-lg-4 d-lg-flex d-none order-lg-1">
          <NavLink to="/" className="text-decoration-none">
            {isEnglish ? (
              <>
                <span className="h1 text-uppercase text-primary bg-dark px-2">
                  Maw
                </span>
                <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                  good
                </span>
              </>
            ) : (
              <>
                <span className="h1 text-uppercase text-primary bg-dark px-4">
                  مو
                </span>
                <span className="h1 text-uppercase text-dark bg-primary px-4 ml-n1">
                  جود
                </span>
              </>
            )}
          </NavLink>
        </div>
        <div className="col-lg-4 col-12 text-left order-2 py-2">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("topbar.search_placeholder")}
              />
              <div className="input-group-append mx-1">
                <button
                  className="btn btn-outline-dark animate__animated animate__fadeInUp px-4"
                  href="#"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4 text-center text-lg-right order-1 order-lg-3">
          <div className="d-inline-flex align-items-center">
            <div className="btn-group mx-2">
              <button
                type="button"
                className="btn btn-md btn-light dropdown-toggle"
                data-toggle="dropdown"
              >
                {t("topbar.my_account.account")}
              </button>
              {user.username ? (
                <div className="dropdown-menu dropdown-menu-right">
                  <NavLink className="dropdown-item" to="/profile">
                    {t("topbar.my_account.profile")}
                  </NavLink>
                  <a
                    className="dropdown-item text-danger"
                    type="button"
                    onClick={handleSignout}
                  >
                    {t("topbar.my_account.signout")}
                  </a>
                </div>
              ) : (
                <div className="dropdown-menu dropdown-menu-right">
                  <NavLink className="dropdown-item" to="/signin">
                    {t("topbar.my_account.signin")}
                  </NavLink>
                  <NavLink className="dropdown-item" to="/signup">
                    {t("topbar.my_account.signup")}
                  </NavLink>
                </div>
              )}
            </div>
            <div className="btn-group">
              {i18next.language === "en" ? (
                <button
                  className="btn btn-md font-ar"
                  type="button"
                  onClick={() => changeLang("ar")}
                >
                  {t("topbar.ar")}
                </button>
              ) : (
                <button
                  className="btn btn-md font-en"
                  type="button"
                  onClick={() => changeLang("en")}
                >
                  {t("topbar.en")}
                </button>
              )}
            </div>
          </div>
          <div className="d-inline-flex align-items-center d-block d-lg-none">
            <NavLink to="/profile/favorites" className="btn px-0 ml-2">
              <FontAwesomeIcon className="mx-1 text-dark" icon={faHeart} />
              <span
                className="badge text-dark border border-dark rounded-badge-sm"
                style={{ paddingBottom: "2px" }}
              >
                {user?.favorites?.length}
              </span>
            </NavLink>
            <NavLink to="/profile/cart" className="btn px-0 ml-2">
              <FontAwesomeIcon
                className="mx-1 text-dark"
                icon={faShoppingCart}
              />
              <span
                className="badge text-dark border border-dark rounded-badge-sm"
                style={{ paddingBottom: "2px" }}
              >
                {user?.inCart?.length}
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
