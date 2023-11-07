import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopProducts } from "../../stores/home/homeSlice";
import { useTranslation } from "react-i18next";
import PreLoader from "../../utils/PreLoader";
import Product from "../../components/Product";
import SectionHeader from "../../components/SectionHeader";

function TopProducts() {
  const dispatch = useDispatch();
  const { topProducts, isLoading } = useSelector((state) => state.home);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getTopProducts());
  }, []);

  return (
    <div className="container-fluid pt-2 pt-lg-5 pb-3">
      <SectionHeader title={t("headers.top_products")} />
      <div className="row px-xl-5">
        {isLoading ? (
          <PreLoader />
        ) : (
          topProducts.map((product) => (
            <Product key={product.id} product={product} page="/" size="sm" />
          ))
        )}
      </div>
    </div>
  );
}

export default TopProducts;
