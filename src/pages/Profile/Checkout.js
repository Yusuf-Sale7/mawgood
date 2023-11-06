import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthService from "../../services/AuthService";
import PreLoader from "../../utils/PreLoader";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../stores/user/userSilce";
import { useTranslation } from "react-i18next";
import SectionHeader from "../../components/SectionHeader";
import i18next from "i18next";

function Checkout() {
  const isEnglish = i18next.language === "en" ? true : false;
  const dispatch = useDispatch();
  const auth = AuthService();
  const { user } = auth.getCurrentUser();
  const { isLoading, cart } = useSelector((state) => state.user);
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      mobile: user.mobile,
      city: user.city,
      state: user.state,
      street: user.street,
    },
  });

  const handleCheckout = (data) => {
    // console.log("Checkout", data);
    // This feature is under development
  };

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <ul className="breadcrumb bg-light mb-30">
              <li className="breadcrumb-item text-dark">
                <NavLink to="/">{t("breadcrumb.home")}</NavLink>
              </li>
              <li className="breadcrumb-item text-dark">
                <NavLink to="/profile">{t("breadcrumb.profile")}</NavLink>
              </li>
              <li className="breadcrumb-item text-dark">
                <NavLink to="/profile/cart">{t("breadcrumb.cart")}</NavLink>
              </li>
              <span className="breadcrumb-item active">
                {t("breadcrumb.checkout")}
              </span>
            </ul>
          </div>
        </div>
      </div>

      {isLoading ? (
        <PreLoader />
      ) : (
        <div className="container-fluid">
          <form onSubmit={handleSubmit(handleCheckout)}>
            <div className="row px-xl-5">
              <div className="col-lg-8">
                <SectionHeader title={t("checkout.address")} tag="h5" />
                <div className="bg-light p-30 mb-5">
                  <div className="row">
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
                        <option value="">
                          {t("signup.cities.select_city")}
                        </option>
                        <option value="Cairo">
                          {t("signup.cities.cairo")}
                        </option>
                        <option value="Menoufia">
                          {t("signup.cities.menoufia")}
                        </option>
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
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <SectionHeader title={t("checkout.order_total")} tag="h5" />
                <div className="bg-light p-30 mb-5">
                  <div className="border-bottom">
                    <h6 className="mb-3">{t("checkout.products")}</h6>
                    {cart.cartProducts?.map((item) => (
                      <div
                        key={item.product.id}
                        className="d-flex justify-content-between"
                      >
                        <p>
                          {isEnglish
                            ? item.product.title
                            : item.product.titleAR}
                          <span className="mx-1 text-primary">
                            x{item.quantity}
                          </span>
                        </p>
                        <p>{`${item.quantity * item.price} ${t(
                          "common.currency"
                        )}`}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-bottom pt-3 pb-2">
                    <div className="d-flex justify-content-between">
                      <h6 className="font-weight-medium">
                        {t("checkout.shipping")}
                      </h6>
                      <h6 className="font-weight-medium">{`${cart.shipping} ${t(
                        "common.currency"
                      )}`}</h6>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="d-flex justify-content-between mt-2">
                      <h5>{t("checkout.total")}</h5>
                      <h5>{`${cart.totalPrice} ${t("common.currency")}`}</h5>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="btn btn-block btn-primary font-weight-bold py-3">
                      {t("checkout.place_order")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Checkout;
