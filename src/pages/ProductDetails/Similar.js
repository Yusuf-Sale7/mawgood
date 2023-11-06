import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product";
import PreLoader from "../../utils/PreLoader";
import { useTranslation } from "react-i18next";
import SectionHeader from "../../components/SectionHeader";
import { getSimilarProducts } from "../../stores/product/productSlice";
import Slider from "react-slick";

function Similar({ productId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { similar, isLoadingSimiar } = useSelector((state) => state.product);
  const settings = {
    dots: false,
    arrows: false,
    lazyLoad: true,
    centerMode: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(getSimilarProducts(productId));
  }, [productId]);

  return (
    similar.length > 0 && (
      <div className="container-fluid">
        <SectionHeader title={t("product.similar")} />
        {isLoadingSimiar ? (
          <PreLoader />
        ) : (
          <div className="row px-xl-5">
            <div className="col">
              <Slider {...settings}>
                {similar.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    size={"auto"}
                    page={`/product/${productId}`}
                  />
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default Similar;
