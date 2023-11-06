import React, { useState } from "react";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhoneAlt,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { customer_service_num, support_email } from "../utils/StaticData";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Footer() {
  const { user } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [email, setEmail] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const handleSubscribe = (data) => {
    toast.success(t("footer.subscribed"));
    setEmail("");
  };

  return (
    <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
      <div className="row pt-5">
        <div className="col-lg-4 col-md-12 mb-5">
          <h5 className="text-secondary text-uppercase mb-4">
            {t("footer.info.title")}
          </h5>
          <p className="mb-4">{t("footer.info.text")}</p>
          <p className="mb-2">
            <FontAwesomeIcon
              className="text-primary mx-2"
              icon={faMapMarkerAlt}
            />
            {t("footer.info.address")}
          </p>
          <p className="mb-2">
            <FontAwesomeIcon className="text-primary mx-2" icon={faEnvelope} />
            {support_email}
          </p>
          <p className="mb-0">
            <FontAwesomeIcon className="text-primary mx-2" icon={faPhoneAlt} />
            <label className="dir-ltr">{customer_service_num}</label>
          </p>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">
                {t("footer.quick_shop.title")}
              </h5>
              <div className="d-flex flex-column justify-content-start">
                <NavLink to="/" className="text-secondary mb-2">
                  {t("footer.quick_shop.home")}
                </NavLink>
                <NavLink
                  to="/category/smartphones"
                  className="text-secondary mb-2"
                >
                  {t("footer.quick_shop.smartphones")}
                </NavLink>
                <NavLink to="/category/laptops" className="text-secondary mb-2">
                  {t("footer.quick_shop.laptops")}
                </NavLink>
                <NavLink
                  to="/category/men_fashion"
                  className="text-secondary mb-2"
                >
                  {t("footer.quick_shop.men_fashion")}
                </NavLink>
                <NavLink
                  to="/category/women_fashion"
                  className="text-secondary mb-2"
                >
                  {t("footer.quick_shop.women_fashion")}
                </NavLink>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">
                {t("footer.account.title")}
              </h5>
              {user.username ? (
                <div className="d-flex flex-column justify-content-start">
                  <NavLink to="/profile" className="text-secondary mb-2">
                    {t("footer.account.profile")}
                  </NavLink>
                  <NavLink to="/profile/cart" className="text-secondary mb-2">
                    {t("footer.account.cart")}
                  </NavLink>
                  <NavLink
                    to="/profile/favorites"
                    className="text-secondary mb-2"
                  >
                    {t("footer.account.favorites")}
                  </NavLink>
                </div>
              ) : (
                <div className="d-flex flex-column justify-content-start">
                  <NavLink to="/signin" className="text-secondary mb-2">
                    {t("footer.account.signin")}
                  </NavLink>
                  <NavLink to="/signup" className="text-secondary mb-2">
                    {t("footer.account.signup")}
                  </NavLink>
                </div>
              )}
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">
                {t("footer.newsletter.title")}
              </h5>
              <p>{t("footer.newsletter.text")}</p>
              <form onSubmit={handleSubmit(handleSubscribe)}>
                <div className="input-group">
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder={t("footer.newsletter.email_placeholder")}
                    {...register("email", {
                      onChange: (e) => setEmail(e.target.value),
                      required: t("auth.email_required"),
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: t("auth.email_invalid"),
                      },
                    })}
                    onKeyDown={(e) => {
                      e.key === " " && e.preventDefault();
                    }}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary">
                      {t("footer.newsletter.subscribe")}
                    </button>
                  </div>
                </div>
                {errors.email && (
                  <small className="d-block mt-1 text-danger">
                    <FontAwesomeIcon
                      className="mx-1"
                      icon={faTriangleExclamation}
                    />
                    {errors.email.message}
                  </small>
                )}
              </form>
              <h6 className="text-secondary text-uppercase mt-4 mb-3">
                {t("footer.newsletter.follow")}
              </h6>
              <div className="d-flex">
                <a className="btn btn-primary btn-square" href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a className="btn btn-primary btn-square mx-2" href="#">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a className="btn btn-primary btn-square" href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row border-top py-4">
        <div className="col-md-6">
          <p className="mb-md-0 text-center text-md-left text-secondary">
            &copy;{" "}
            <span className="text-primary px-1">
              {t("footer.copywrites.brand")}{" "}
            </span>
            {t("footer.copywrites.title")}
          </p>
        </div>
        <div className="col-md-6 text-center text-md-right">
          <img
            className="img-fluid"
            src={require("../assets/imgs/payments.png")}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
