import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFavorites } from "../../stores/user/userSilce";
import { NavLink } from "react-router-dom";
import PreLoader from "../../utils/PreLoader";
import { useTranslation } from "react-i18next";
import Product from "../../components/Product";
import LoadImage from "../../components/LoadImage";

function Favorites() {
  const dispatch = useDispatch();
  const { favorites, isLoading } = useSelector((state) => state.user);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getUserFavorites());
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
                {t("breadcrumb.favorites")}
              </span>
            </ul>
          </div>
        </div>
      </div>

      {isLoading ? (
        <PreLoader />
      ) : (
        <div className="container-fluid">
          <div className="row px-xl-5">
            {favorites.length > 0 ? (
              favorites.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  page={`/profile/favorites`}
                />
              ))
            ) : (
              <div className="col-12 text-center">
                <LoadImage
                  src={require("../../assets/imgs/looking.png")}
                  width={250}
                  height={250}
                />
                <h5 className="mt-3">{t("favorites.no_items")}</h5>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Favorites;
