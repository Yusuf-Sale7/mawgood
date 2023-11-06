import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  faAngleDown,
  faBars,
  faCircleNotch,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../stores/home/homeSlice";

function Navbar() {
  const isEnglish = i18next.language === "en" ? true : false;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { categories, isLoading } = useSelector((state) => state.home);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <header className="container-fluid bg-dark mb-30">
      <div className="row px-xl-5">
        <div className="col-md-4 col-lg-3 d-none d-md-block">
          <a
            className="btn d-flex align-items-center justify-content-between bg-primary w-100 h-100"
            data-toggle="collapse"
            href="#navbar-vertical"
            style={{ height: "65px", padding: "0 30px" }}
          >
            <h6 className="text-dark m-0">
              <FontAwesomeIcon className="mx-2" icon={faBars} />
              {t("categories.title")}
            </h6>
            <FontAwesomeIcon className="mx-1 text-dark" icon={faAngleDown} />
          </a>
          <nav
            className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
            id="navbar-vertical"
            data-toggle="collapse"
            href="#navbar-vertical"
            style={{ width: "calc(100% - 30px)", zIndex: 999 }}
          >
            <div className="navbar-nav w-100">
              {isLoading ? (
                <FontAwesomeIcon icon={faCircleNotch} spin />
              ) : (
                categories.map((category) => (
                  <NavLink
                    key={category.id}
                    to={category.path}
                    className="nav-item nav-link"
                  >
                    {isEnglish ? category.name : category.nameAR}
                  </NavLink>
                ))
              )}
            </div>
          </nav>
        </div>
        <div className="col-md-8 col-lg-9">
          <nav className="navbar navbar-expand-md bg-dark navbar-dark py-3 py-lg-0 px-0">
            <NavLink to="/" className="text-decoration-none d-block d-md-none">
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
                  <span className="h1 text-uppercase text-primary bg-dark px-2">
                    مو
                  </span>
                  <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                    جود
                  </span>
                </>
              )}
            </NavLink>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto pt-3 pt-md-0">
                <NavLink to="/" className="nav-item nav-link">
                  {t("navbar.home")}
                </NavLink>
                <NavLink to="/contact" className="nav-item nav-link">
                  {t("navbar.contact")}
                </NavLink>
              </div>
              <div className="navbar-nav ml-auto py-0 d-none d-md-block">
                <NavLink to="/profile/favorites" className="btn px-0">
                  <FontAwesomeIcon
                    className="text-primary mx-1"
                    icon={faHeart}
                  />
                  <span
                    className="badge text-secondary border border-secondary rounded-badge-sm"
                    style={{ paddingBottom: "2px" }}
                  >
                    {user?.favorites?.length}
                  </span>
                </NavLink>
                <NavLink to="/profile/cart" className="btn px-0 ml-3">
                  <FontAwesomeIcon
                    className="text-primary mx-1"
                    icon={faShoppingCart}
                  />
                  <span
                    className="badge text-secondary border border-secondary rounded-badge-sm"
                    style={{ paddingBottom: "2px" }}
                  >
                    {user?.inCart?.length}
                  </span>
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
