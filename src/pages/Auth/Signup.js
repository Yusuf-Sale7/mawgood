import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  faCircleNotch,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthService from "../../services/AuthService";
import { useTranslation } from "react-i18next";
import SectionHeader from "../../components/SectionHeader";

function Signup() {
  const navigateTo = useNavigate();
  const auth = AuthService();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onSubmit" });

  const handleSignup = (data) => {
    setIsLoading(true);
    const {
      firstName,
      lastName,
      username,
      email,
      mobile,
      city,
      state,
      street,
      password,
    } = data;

    auth
      .signup(
        firstName,
        lastName,
        username,
        email,
        mobile,
        city,
        state,
        street,
        password
      )
      .then((res) => {
        setIsLoading(false);
        res.token && navigateTo("/profile");
      });
  };

  return (
    <div className="container pt-5">
      <SectionHeader
        title={t("signup.title")}
        className="section-title position-relative text-uppercase mb-4"
      />
      <form onSubmit={handleSubmit(handleSignup)}>
        <div className="row">
          <div className="col-md-6 form-group">
            <label>
              <span className="text-danger">*</span>
              {t("signup.first_name")}
            </label>
            <input
              className="form-control"
              type="text"
              placeholder={t("signup.first_name_placeholder")}
              {...register("firstName", {
                required: t("auth.first_name_required"),
                maxLength: {
                  value: 20,
                  message: t("auth.first_name_max"),
                },
              })}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            {errors.firstName && (
              <small className="text-danger">
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faTriangleExclamation}
                />
                {errors.firstName.message}
              </small>
            )}
          </div>
          <div className="col-md-6 form-group">
            <label>
              <span className="text-danger">*</span>
              {t("signup.last_name")}
            </label>
            <input
              className="form-control"
              type="text"
              placeholder={t("signup.last_name_placeholder")}
              {...register("lastName", {
                required: t("auth.last_name_required"),
                maxLength: {
                  value: 20,
                  message: t("auth.last_name_max"),
                },
              })}
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            {errors.lastName && (
              <small className="text-danger">
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faTriangleExclamation}
                />
                {errors.lastName.message}
              </small>
            )}
          </div>
          <div className="col-md-6 form-group">
            <label>
              <span className="text-danger">*</span>
              {t("signup.email")}
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="example@email.com"
              {...register("email", {
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
          <div className="col-md-6 form-group">
            <label>
              <span className="text-danger">*</span>
              {t("signup.username")}
            </label>
            <input
              className="form-control"
              type="text"
              placeholder={t("signup.username_placeholder")}
              {...register("username", {
                required: t("auth.username_required"),
                minLength: {
                  value: 3,
                  message: t("auth.username_min"),
                },
                maxLength: {
                  value: 20,
                  message: t("auth.username_max"),
                },
                pattern: {
                  value: /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                  message: t("auth.username_invalid"),
                },
              })}
              onKeyDown={(e) => {
                e.key === " " && e.preventDefault();
              }}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && (
              <small className="text-danger">
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faTriangleExclamation}
                />
                {errors.username.message}
              </small>
            )}
          </div>
          <div className="col-md-6 form-group">
            <label>
              <span className="text-danger">*</span>
              {t("signup.mobile")}
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="0123456789"
              {...register("mobile", {
                required: t("auth.mobile_required"),
                pattern: {
                  value: /^01[0125][0-9]{8}$/,
                  message: t("auth.mobile_invalid"),
                },
              })}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              aria-invalid={errors.mobile ? "true" : "false"}
            />
            {errors.mobile && (
              <small className="text-danger">
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faTriangleExclamation}
                />
                {errors.mobile.message}
              </small>
            )}
          </div>
          <div className="col-md-6 form-group">
            <label>
              <span className="text-danger">*</span>
              {t("signup.city")}
            </label>
            <select
              className="form-control"
              {...register("city", {
                required: t("auth.city_required"),
              })}
              aria-invalid={errors.city ? "true" : "false"}
            >
              <option value="">{t("signup.cities.select_city")}</option>
              <option value="Cairo">{t("signup.cities.cairo")}</option>
              <option value="Menoufia">{t("signup.cities.menoufia")}</option>
            </select>
            {errors.city && (
              <small className="text-danger">
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faTriangleExclamation}
                />
                {errors.city.message}
              </small>
            )}
          </div>
          <div className="col-md-6 form-group">
            <label>
              <span className="text-danger">*</span>
              {t("signup.state")}
            </label>
            <input
              className="form-control"
              type="text"
              placeholder={t("signup.state_placeholder")}
              {...register("state", {
                required: t("auth.state_required"),
                maxLength: {
                  value: 20,
                  message: t("auth.state_max"),
                },
              })}
              aria-invalid={errors.state ? "true" : "false"}
            />
            {errors.state && (
              <small className="text-danger">
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faTriangleExclamation}
                />
                {errors.state.message}
              </small>
            )}
          </div>
          <div className="col-md-6 form-group">
            <label>
              <span className="text-danger">*</span>
              {t("signup.street")}
            </label>
            <input
              className="form-control"
              type="text"
              placeholder={t("signup.street_placeholder")}
              {...register("street", {
                required: t("auth.street_required"),
                maxLength: {
                  value: 20,
                  message: t("auth.street_max"),
                },
              })}
              aria-invalid={errors.street ? "true" : "false"}
            />
            {errors.street && (
              <small className="text-danger">
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faTriangleExclamation}
                />
                {errors.street.message}
              </small>
            )}
          </div>
          <div className="col-md-6 form-group">
            <label>
              <span className="text-danger">*</span>
              {t("signup.password")}
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="******"
              {...register("password", {
                required: t("auth.password_required"),
                minLength: {
                  value: 6,
                  message: t("auth.password_min"),
                },
                maxLength: {
                  value: 30,
                  message: t("auth.password_max"),
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
          <div className="col-12">
            <button className="btn btn-primary px-5" disabled={isLoading}>
              {isLoading ? (
                <FontAwesomeIcon icon={faCircleNotch} spin />
              ) : (
                t("signup.signup_btn")
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
