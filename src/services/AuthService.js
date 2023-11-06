import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { patchUserInfo } from "../stores/user/userSilce";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../utils/StaticData";

function AuthService() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { t } = useTranslation();

  const signin = async (email, password) => {
    const response = await axios
      .post(`${BASE_URL}/signin`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.error) {
          res.data.errorType === "incorrectPassword"
            ? toast.error(t("auth.icorrect_password"))
            : res.data.errorType === "userNotFound"
            ? toast.error(t("auth.user_not_found"))
            : toast.error(t("auth.missing_credentials"));
        } else {
          localStorage.setItem("token", res.data.token);
          dispatch(patchUserInfo(res.data.user));
        }

        return res.data;
      })
      .catch((err) => toast.error(t("common.api_error")));

    return response;
  };

  const signup = async (
    firstName,
    lastName,
    username,
    email,
    mobile,
    city,
    state,
    street,
    password
  ) => {
    const response = await axios
      .post(`${BASE_URL}/signup`, {
        firstName,
        lastName,
        username,
        email,
        mobile,
        city,
        state,
        street,
        password,
      })
      .then((res) => {
        if (res.data.error) {
          res.data.errorType === "emailExists"
            ? toast.error(t("auth.email_exists"))
            : res.data.errorType === "usernameExists"
            ? toast.error(t("auth.username_exists"))
            : toast.error(t("common.api_error"));
        } else {
          localStorage.setItem("token", res.data.token);
          dispatch(patchUserInfo(res.data.user));
        }

        return res.data;
      })
      .catch((err) => toast.error(t("common.api_error")));

    return response;
  };

  const editProfile = async (
    firstName,
    lastName,
    username,
    email,
    mobile,
    city,
    state,
    street,
    password
  ) => {
    const response = await axios
      .patch(`${BASE_URL}/profile/edit`, {
        firstName,
        lastName,
        username,
        email,
        mobile,
        city,
        state,
        street,
        password,
      })
      .then((res) => {
        if (res.data.error) {
          res.data.error === "usernameNotExists"
            ? toast.error(t("auth.username_not_exists"))
            : toast.error(t("common.api_error"));
        } else {
          localStorage.setItem("token", res.data.token);
          toast.success(t("auth.profile_updated"));
          dispatch(patchUserInfo(res.data.user));
        }

        return res.data;
      })
      .catch((err) => toast.error(t("common.api_error")));

    return response;
  };

  const editPassword = async (username, currentPassword, newPassword) => {
    const response = await axios
      .patch(`${BASE_URL}/profile/edit-password`, {
        username,
        currentPassword,
        newPassword,
      })
      .then((res) => {
        if (res.data.error) {
          res.data.errorType === "usernameNotExists"
            ? toast.error(t("auth.username_not_exists"))
            : res.data.errorType === "currentPassWrong"
            ? toast.error(t("auth.current_pass_wrong"))
            : toast.error(t("common.api_error"));
        } else {
          localStorage.setItem("token", res.data.access_token);
          toast.success(t("auth.password_updated"));
        }

        return res.data;
      })
      .catch((err) => toast.error(t("common.api_error")));

    return response;
  };

  const signout = () => {
    localStorage.removeItem("token");
    dispatch(patchUserInfo({}));
  };

  const getCurrentUser = () => {
    let isLoading = true;
    if (user.username) {
      isLoading = false;
      return { isLoading, user };
    } else if (token) {
      // Check access token
      axios
        .post(`${BASE_URL}/token`, {
          token,
        })
        .then((res) => {
          if (res.data.error) {
            signout();
            toast.error(t("auth.end_session"), { toastId: "endSession" });
            isLoading = false;
          } else {
            dispatch(patchUserInfo(res.data));
            isLoading = false;
          }
        })
        .catch((error) => {
          isLoading = false;
          toast.error(t("common.api_error"));
        });
      return { isLoading, user };
    } else {
      isLoading = false;
      return { isLoading, user };
    }
  };

  return {
    signin,
    signup,
    editProfile,
    editPassword,
    signout,
    getCurrentUser,
  };
}

export default AuthService;
