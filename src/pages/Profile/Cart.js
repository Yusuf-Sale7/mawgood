import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateCart } from "../../stores/user/userSilce";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import PreLoader from "../../utils/PreLoader";
import { useTranslation } from "react-i18next";
import LoadImage from "../../components/LoadImage";
import SectionHeader from "../../components/SectionHeader";
import i18next from "i18next";

function Cart() {
  const isEnglish = i18next.language === "en" ? true : false;
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const handleUpdate = (id, quantity, size, color) => {
    dispatch(updateCart({ id, quantity, size, color }));
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
              <span className="breadcrumb-item active">
                {t("breadcrumb.cart")}
              </span>
            </ul>
          </div>
        </div>
      </div>

      {isLoading ? (
        <PreLoader />
      ) : (
        <div className="container-fluid">
          {cart.cartProducts?.length > 0 ? (
            <div className="row px-xl-5">
              <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-light table-borderless table-hover mb-0">
                  <thead className="thead-dark">
                    <tr>
                      <th>{t("cart.products")}</th>
                      <th>{t("cart.size")}</th>
                      <th>{t("cart.color")}</th>
                      <th>{t("cart.price")}</th>
                      <th>{t("cart.quantity")}</th>
                      <th>{t("cart.total")}</th>
                      <th>{t("cart.remove")}</th>
                    </tr>
                  </thead>
                  <tbody className="align-middle">
                    {cart.cartProducts?.map((item, index) => (
                      <tr key={index}>
                        <td className="align-middle">
                          <NavLink
                            to={`/product/${item.product.id}`}
                            className="text-decoration-none d-flex align-middle align-items-center"
                          >
                            <LoadImage
                              src={item.product.thumbnail}
                              alt="Product image"
                              width={50}
                              height={50}
                            />
                            <span className="mx-2">
                              {isEnglish
                                ? item.product.title
                                : item.product.titleAR}
                            </span>
                          </NavLink>
                        </td>
                        <td className="align-middle">{item.size ?? "-"}</td>
                        <td className="align-middle">
                          {(isEnglish
                            ? item.color?.name
                            : item.color?.nameAR) ?? "-"}
                        </td>
                        <td className="align-middle">{item.product.price}</td>
                        <td className="align-middle">
                          <div
                            className="input-group quantity"
                            style={{ width: "100px" }}
                          >
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-primary btn-minus"
                                onClick={() =>
                                  handleUpdate(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.size,
                                    item.color.id
                                  )
                                }
                              >
                                <FontAwesomeIcon
                                  icon={
                                    item.quantity > 1 ? faMinus : faTrashAlt
                                  }
                                />
                              </button>
                            </div>
                            <span className="bg-secondary border-0 d-flex align-items-center px-2">
                              {item.quantity}
                            </span>
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-primary btn-plus"
                                onClick={() =>
                                  handleUpdate(
                                    item.product.id,
                                    item.quantity + 1,
                                    item.size,
                                    item.color.id
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          {item.quantity * item.price}
                        </td>
                        <td className="align-middle text-center">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleUpdate(
                                item.product.id,
                                0,
                                item.size,
                                item.color.id
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4">
                <SectionHeader title={t("cart.cart_summary")} tag="h5" />
                <div className="bg-light p-30 mb-2 mb-lg-5">
                  <div className="border-bottom pb-2">
                    <div className="d-flex justify-content-between">
                      <h6 className="font-weight-medium">
                        {t("cart.shipping")}
                      </h6>
                      <h6 className="font-weight-medium">
                        {`${cart.shipping} ${t("common.currency")}`}
                      </h6>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="d-flex justify-content-between mt-2">
                      <h5>{t("cart.total")}</h5>
                      <h5>{`${cart.totalPrice} ${t("common.currency")}`}</h5>
                    </div>
                    <NavLink
                      to="/profile/cart/checkout"
                      className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                    >
                      {t("cart.proceed_to_checkout")}
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row px-xl-5">
              <div className="col-12 text-center">
                <LoadImage
                  src={require("../../assets/imgs/looking.png")}
                  width={250}
                  height={250}
                />
                <h5 className="mt-3">{t("cart.no_items")}</h5>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
