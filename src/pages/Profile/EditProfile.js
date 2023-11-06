import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthService from "../../services/AuthService";
import { useTranslation } from "react-i18next";
import SectionHeader from "../../components/SectionHeader";

function EditProfile() {
  const navigateTo = useNavigate();
  const auth = AuthService();
  const { user } = auth.getCurrentUser();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      city: user.city,
      state: user.state,
      street: user.street,
    },
  });

  const handleEditProfile = (data) => {
    const { firstName, lastName, email, mobile, city, state, street } = data;
    const { username } = user;

    isDirty &&
      auth
        .editProfile(
          firstName,
          lastName,
          username,
          email,
          mobile,
          city,
          state,
          street
        )
        .then((res) => res.token && navigateTo("/profile"));
  };

  return (
    <div className="container pt-5">
      <SectionHeader
        title={t("signup.edit_profile")}
        className="section-title position-relative text-uppercase mb-4"
      />
      <form onSubmit={handleSubmit(handleEditProfile)}>
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
          <div className="col-12">
            <button className="btn btn-primary px-5" disabled={!isDirty}>
              {t("signup.update_btn")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
