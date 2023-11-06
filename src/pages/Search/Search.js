import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { searchProducts } from "../../stores/search/searchSlice";
import PreLoader from "../../utils/PreLoader";
import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
import Product from "../../components/Product";
import LoadMore from "../../components/LoadMore";
import LoadImage from "../../components/LoadImage";
import SortAndLimit from "../../components/SortAndLimit";
import SectionHeader from "../../components/SectionHeader";
import { getCategories } from "../../stores/home/homeSlice";
import i18next from "i18next";

function Search() {
  const isEnglish = i18next.language === "en" ? true : false;
  const dispatch = useDispatch();
  const { searchResult, isLoading } = useSelector((state) => state.search);
  const { categories, isLoading: CTSisLoading } = useSelector(
    (state) => state.home
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const query = searchParams.get("query");
  const [category, setCategory] = useState(searchParams.get("category"));
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice"));
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice"));
  const [rate, setRate] = useState(searchParams.get("rate"));
  const [limit, setLimit] = useState(searchParams.get("limit") ?? 20);
  const [sort, setSort] = useState(searchParams.get("sort") ?? "random");
  const canLoadMore = searchResult.productsCount > limit;
  const location = useLocation();

  const handleUpdateSort = (sort) => {
    setSort(sort);
    searchParams.set("sort", sort);
    setSearchParams(searchParams);
  };

  const handleUpdateLimit = (limit) => {
    setLimit(limit);
    searchParams.set("limit", limit);
    setSearchParams(searchParams);
  };

  const handleFilterByCategory = (category) => {
    setCategory(category);
    searchParams.set("category", category);
    setSearchParams(searchParams);
  };

  const handleFilterByPrice = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    searchParams.set("minPrice", min);
    searchParams.set("maxPrice", max);
    setSearchParams(searchParams);
  };

  const handleFilterByRate = (rate) => {
    setRate(rate);
    searchParams.set("rate", rate);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    dispatch(
      searchProducts({ query, category, minPrice, maxPrice, rate, sort, limit })
    );
  }, [query, category, minPrice, maxPrice, rate, sort, limit]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-lg-3 col-md-4">
          <SectionHeader title={t("search.category_filter")} tag="h5" />
          <div className="bg-light p-4 mb-30">
            <form>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={category == "all" || category == null}
                  name="category"
                  id="category-all"
                  onChange={() => handleFilterByCategory("all")}
                />
                <label className="custom-control-label" htmlFor="category-all">
                  {t("search.all_categories")}
                </label>
              </div>
              {CTSisLoading ? (
                <PreLoader />
              ) : (
                categories.map((item, index) => (
                  <div
                    key={item.id}
                    className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3"
                  >
                    <input
                      type="radio"
                      className="custom-control-input"
                      checked={category == item.category}
                      name="category"
                      id={`category-${item.id}`}
                      onChange={() => handleFilterByCategory(item.category)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={`category-${item.id}`}
                    >
                      {isEnglish ? item.name : item.nameAR}
                    </label>
                  </div>
                ))
              )}
            </form>
          </div>

          <SectionHeader title={t("search.price_filter")} tag="h5" />
          <div className="bg-light p-4 mb-30">
            <form>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={
                    (minPrice == "all" && maxPrice == "all") ||
                    (minPrice == null && maxPrice == null)
                  }
                  name="price"
                  id="price-all"
                  onChange={() => handleFilterByPrice("all", "all")}
                />
                <label className="custom-control-label" htmlFor="price-all">
                  {t("search.all_prices")}
                </label>
              </div>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={minPrice == 1 && maxPrice == 1000}
                  name="price"
                  id="price-1"
                  onChange={() => handleFilterByPrice(1, 1000)}
                />
                <label className="custom-control-label" htmlFor="price-1">
                  1 {t("common.currency")} - 1000 {t("common.currency")}
                </label>
              </div>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={minPrice == 1000 && maxPrice == 3000}
                  name="price"
                  id="price-2"
                  onChange={() => handleFilterByPrice(1000, 3000)}
                />
                <label className="custom-control-label" htmlFor="price-2">
                  1000 {t("common.currency")} - 3000 {t("common.currency")}
                </label>
              </div>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={minPrice == 3000 && maxPrice == 7000}
                  name="price"
                  id="price-3"
                  onChange={() => handleFilterByPrice(3000, 7000)}
                />
                <label className="custom-control-label" htmlFor="price-3">
                  3000 {t("common.currency")} - 7000 {t("common.currency")}
                </label>
              </div>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={minPrice == 7000 && maxPrice == 10000}
                  name="price"
                  id="price-4"
                  onChange={() => handleFilterByPrice(7000, 10000)}
                />
                <label className="custom-control-label" htmlFor="price-4">
                  7000 {t("common.currency")} - 10000 {t("common.currency")}
                </label>
              </div>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={minPrice == 10000}
                  name="price"
                  id="price-5"
                  onChange={() => handleFilterByPrice(10000)}
                />
                <label className="custom-control-label" htmlFor="price-5">
                  {t("search.more_than")} 10000 {t("common.currency")}
                </label>
              </div>
            </form>
          </div>

          <SectionHeader title={t("search.rate_filter")} tag="h5" />
          <div className="bg-light p-4 mb-30 stars-filter">
            <form>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={rate == "all" || rate == null}
                  name="rate"
                  id="rate-all"
                  onChange={() => handleFilterByRate("all")}
                />
                <label className="custom-control-label" htmlFor="rate-all">
                  {t("search.all_rates")}
                </label>
              </div>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={rate == 1}
                  name="rate"
                  id="rate-1"
                  onChange={() => handleFilterByRate(1)}
                />
                <label className="custom-control-label" htmlFor="rate-1">
                  <StarRatings
                    rating={1}
                    starRatedColor="rgb(255, 211, 51)"
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </label>
              </div>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={rate == 2}
                  name="rate"
                  id="rate-2"
                  onChange={() => handleFilterByRate(2)}
                />
                <label className="custom-control-label" htmlFor="rate-2">
                  <StarRatings
                    rating={2}
                    starRatedColor="rgb(255, 211, 51)"
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </label>
              </div>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={rate == 3}
                  name="rate"
                  id="rate-3"
                  onChange={() => handleFilterByRate(3)}
                />
                <label className="custom-control-label" htmlFor="rate-3">
                  <StarRatings
                    rating={3}
                    style={{ top: "-2px!important" }}
                    starRatedColor="rgb(255, 211, 51)"
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </label>
              </div>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={rate == 4}
                  name="rate"
                  id="rate-4"
                  onChange={() => handleFilterByRate(4)}
                />
                <label className="custom-control-label" htmlFor="rate-4">
                  <StarRatings
                    rating={4}
                    starRatedColor="rgb(255, 211, 51)"
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </label>
              </div>
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between">
                <input
                  type="radio"
                  className="custom-control-input"
                  checked={rate == 5}
                  name="rate"
                  id="rate-5"
                  onChange={() => handleFilterByRate(5)}
                />
                <label className="custom-control-label" htmlFor="rate-5">
                  <StarRatings
                    rating={5}
                    starRatedColor="rgb(255, 211, 51)"
                    starDimension="20px"
                    starSpacing="0px"
                  />
                </label>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-9 col-md-8">
          <div className="row pb-3">
            <div className="col-12 d-flex justify-content-between">
              <div className="mb-3 text-truncate">
                {!isLoading && query && (
                  <div>
                    {searchResult.products?.length} {t("search.results_for")} "
                    <strong>{query}</strong>"
                  </div>
                )}
              </div>
              <SortAndLimit
                sortEvent={(e) => handleUpdateSort(e)}
                limitEvent={(e) => handleUpdateLimit(e)}
              />
            </div>

            {isLoading ? (
              <PreLoader />
            ) : searchResult.products?.length < 1 ? (
              <div className="col-12 p-4 text-center">
                <LoadImage
                  className="img-fluid w-100"
                  src={require("../../assets/imgs/search.png")}
                  alt="Loading"
                  width={250}
                  height={250}
                />
                <h5 className="mt-4">{t("common.no_search_results")}</h5>
              </div>
            ) : (
              searchResult.products?.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  size={"lg"}
                  page={`${location.pathname}${location.search}`}
                />
              ))
            )}
            {canLoadMore && <LoadMore event={() => setLimit(limit + 12)} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
