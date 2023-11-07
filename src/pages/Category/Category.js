import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategory } from "../../stores/search/searchSlice";
import PreLoader from "../../utils/PreLoader";
import { useTranslation } from "react-i18next";
import Product from "../../components/Product";
import LoadMore from "../../components/LoadMore";
import LoadImage from "../../components/LoadImage";
import SortAndLimit from "../../components/SortAndLimit";

function Category() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { t } = useTranslation();
  const { categoryProducts, isLoading } = useSelector((state) => state.search);
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState("random");
  const canLoadMore = categoryProducts.productsCount > limit;

  useEffect(() => {
    dispatch(getCategory({ category, limit, sort }));
  }, [category, sort, limit]);

  return isLoading ? (
    <PreLoader />
  ) : (
    <div className="container-fluid">
      {categoryProducts.error ? (
        <div className="p-4 text-center">
          <LoadImage
            src={require("../../assets/imgs/search.png")}
            alt="Loading"
            width={250}
            height={250}
          />
          <h5 className="mt-4">
            {t("common.no_category_match")} <b>{category}</b>
          </h5>
        </div>
      ) : (
        <div className="row px-xl-5">
          <div className="col-12 pb-1">
            <SortAndLimit
              sortEvent={(e) => setSort(e)}
              limitEvent={(e) => setLimit(e)}
            />
          </div>
          {categoryProducts.products?.length > 0 ? (
            categoryProducts.products.map((product) => (
              <Product
                key={product.id}
                product={product}
                page={`/category/${category}`}
                size={"sm"}
              />
            ))
          ) : (
            <div className="col-12 text-center">
              <LoadImage
                src={require("../../assets/imgs/looking.png")}
                width={250}
                height={250}
              />
              <h5 className="mt-3">{t("common.no_category_products")}</h5>
            </div>
          )}
          {canLoadMore && <LoadMore event={() => setLimit(limit + 12)} />}
        </div>
      )}
    </div>
  );
}

export default Category;
