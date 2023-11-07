import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { useTranslation } from "react-i18next";
import SectionHeader from "../../components/SectionHeader";

function Signin() {
  const navigateTo = useNavigate();
  const auth = AuthService();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onSubmit" });

  const handleSignin = async (data) => {
    setIsLoading(true);
    const { email, password } = data;
    auth.signin(email, password).then((res) => {
      setIsLoading(false);
      if (res.token) {
        location.state !== null ? navigateTo(location.state) : navigateTo("/");
      }
    });
  };

  return (
    <div className="container-fluid pt-2 pt-lg-5">
      <div className="row justify-content-center">
        <form
          className="col-10 col-sm-8 col-md-6 col-lg-5"
          onSubmit={handleSubmit(handleSignin)}
        >
          <SectionHeader
            title={t("signin.title")}
            className="section-title position-relative text-uppercase mb-4"
          />
          <div className="form-group">
            <label>{t("signin.email")}</label>
            <input
              className="form-control"
              type="text"
              placeholder="example@email.com"
              {...register("email", {
                required: t("auth.email_or_username_required"),
                pattern: {
                  value:
                    /^(?:\w+|\w+([+\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-z]{2,4})+)$/,
                  message: t("auth.email_or_username_invalid"),
                },
              })}
              onKeyDown={(e) => {
                e.key === " " && e.preventDefault();
              }}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <small className="text-danger">
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faTriangleExclamation}
                />
                {errors.email.message}
              </small>
            )}
          </div>
          <div className="form-group">
            <label>{t("signin.password")}</label>
            <input
              className="form-control"
              type="password"
              placeholder="******"
              {...register("password", {
                required: t("auth.password_required"),
                minLength: {
                  value: 6,
                  message: t("auth.min_password"),
                },
                maxLength: {
                  value: 30,
                  message: t("auth.max_password"),
                },
              })}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <small className="text-danger">
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faTriangleExclamation}
                />
                {errors.password.message}
              </small>
            )}
          </div>
          <div className="form-group text-center">
            <button className="btn btn-primary px-5 w-100" disabled={isLoading}>
              {isLoading ? (
                <FontAwesomeIcon icon={faCircleNotch} spin />
              ) : (
                t("signin.signin_btn")
              )}
            </button>
            <p className="mt-3">
              {t("signin.new_account")}
              <NavLink to="/signup" className="text-body mx-1">
                {t("signin.signup_btn")}
              </NavLink>
            </p>
            <NavLink to="/reset-password" className="text-body d-block mt-3">
              {t("signin.forgot_password")}
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
