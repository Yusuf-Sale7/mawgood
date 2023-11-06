import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartners } from "../../stores/home/homeSlice";
import PreLoader from "../../utils/PreLoader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadImage from "../../components/LoadImage";
import SectionHeader from "../../components/SectionHeader";
import { useTranslation } from "react-i18next";

function Partners() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { partners, isLoading } = useSelector((state) => state.home);
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    lazyLoad: true,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(getPartners());
  }, []);

  return (
    <div className="container-fluid py-5">
      <SectionHeader title={t("headers.partners")} />
      {isLoading ? (
        <PreLoader />
      ) : (
        <div className="row px-xl-5">
          <div className="col">
            <Slider
              {...settings}
              className="owl-theme owl-carousel vendor-carousel"
            >
              {partners.map((partner) => (
                <div key={partner.id} className="bg-light p-4">
                  <LoadImage
                    style={{ objectFit: "cover" }}
                    src={partner.cover}
                    alt="Partner image"
                    width={"100%"}
                    height={"156"}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}

export default Partners;
