import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import SectionHeader from "../../components/SectionHeader";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const { t } = useTranslation();

  return (
    <div className="container-fluid pt-5">
      <SectionHeader title={t("profile.title")} />
      <div className="row px-xl-5">
        <div className="col-md-4 col-sm-6 pb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{t("profile.name")}</h5>
              <p className="card-text">{`${user.firstName} ${user.lastName}`}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 pb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{t("profile.email")}</h5>
              <p className="card-text">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 pb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{t("profile.username")}</h5>
              <p className="card-text">{user.username}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 pb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{t("profile.mobile")}</h5>
              <p className="card-text">{user.mobile}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 pb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{t("profile.city")}</h5>
              <p className="card-text">{user.city}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 pb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{t("profile.state")}</h5>
              <p className="card-text">{user.state}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 pb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{t("profile.street")}</h5>
              <p className="card-text">{user.street}</p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <NavLink to="/profile/edit" className="btn btn-primary px-5 my-1">
            {t("profile.edit_profile")}
          </NavLink>
          <NavLink
            to="/profile/edit-password"
            className="btn btn-dark px-5 my-1"
          >
            {t("profile.edit_password")}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Profile;
