import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthService from "../../services/AuthService";
import { useTranslation } from "react-i18next";

function EditPassword() {
  const navigateTo = useNavigate();
  const auth = AuthService();
  const { user } = auth.getCurrentUser();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
  });

  const handleEditPassword = (data) => {
    const { currentPassword, newPassword } = data;
    const { username } = user;

    auth
      .editPassword(username, currentPassword, newPassword)
      .then((res) => res.token && navigateTo("/profile"));
  };

  return (
    <div className="container-fluid pt-5">
      <div className="row justify-content-center">
        <form
          className="col-10 col-sm-8 col-md-6 col-lg-5"
          onSubmit={handleSubmit(handleEditPassword)}
        >
          <h2 className="section-title position-relative text-uppercase mb-4">
            <span className="bg-secondary pr-3">
              {t("edit_password.title")}
            </span>
          </h2>
          <div className="form-group">
            <label>{t("edit_password.current")}</label>
            <input
              className="form-control"
              type="password"
              placeholder="******"
              {...register("currentPassword", {
                required: t("auth.current_password_required"),
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
              aria-invalid={errors.currentPassword ? "true" : "false"}
            />
            {errors.currentPassword && (
              <small className="text-danger">
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faTriangleExclamation}
                />
                {errors.currentPassword.message}
              </small>
            )}
          </div>
          <div className="form-group">
            <label>{t("edit_password.new")}</label>
            <input
              className="form-control"
              type="password"
              placeholder="******"
              {...register("newPassword", {
                required: t("auth.new_password_required"),
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
              aria-invalid={errors.newPassword ? "true" : "false"}
            />
            {errors.newPassword && (
              <small className="text-danger">
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faTriangleExclamation}
                />
                {errors.newPassword.message}
              </small>
            )}
          </div>
          <div className="form-group text-center">
            <button className="btn btn-primary px-5 w-100">
              {t("edit_password.update_btn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPassword;
