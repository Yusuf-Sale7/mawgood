import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../stores/home/homeSlice";
import PreLoader from "../../utils/PreLoader";
import i18next from "i18next";
import LoadImage from "../../components/LoadImage";
import SectionHeader from "../../components/SectionHeader";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

function Categories() {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.home);
  const { t } = useTranslation();
  const isEnglish = i18next.language === "en" ? true : false;

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="container-fluid pt-2 pt-lg-5">
      <SectionHeader title={t("headers.categories")} />
      <div className="row px-xl-5 pb-3">
        {isLoading ? (
          <PreLoader />
        ) : (
          categories.map((category) => (
            <div key={category.id} className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <NavLink className="text-decoration-none" to={category.path}>
                <div className="cat-item d-flex align-items-center mb-4">
                  <div
                    className="overflow-hidden"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <LoadImage
                      src={category.cover}
                      alt="Category cover image"
                      width={"100%"}
                      height={"100%"}
                    />
                  </div>
                  <div className="flex-fill pl-3">
                    <h6>{isEnglish ? category.name : category.nameAR}</h6>
                    <small className="text-body">
                      {category.quantity} {t("common.products_count")}
                    </small>
                  </div>
                </div>
              </NavLink>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;
