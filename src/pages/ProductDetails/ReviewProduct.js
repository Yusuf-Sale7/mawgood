import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  patchUserReview,
  reviewProduct,
} from "../../stores/product/productSlice";
import { Controller, useForm } from "react-hook-form";
import Stars from "../../components/Stars";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function ReviewProduct({ id }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { userReview, sendReviewPending } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.user);
  const { control, reset, handleSubmit } = useForm({
    defaultValues: userReview,
  });

  const onFieldChange = (value, field) => {
    dispatch(patchUserReview({ [field.name]: value }));
  };

  const sendReview = (data) => {
    dispatch(
      patchUserReview({
        id,
        username: user.username,
        name: `${user.firstName} ${user.lastName}`,
        date: new Date().toLocaleDateString("en-GB"),
      })
    );

    data.rate === 0
      ? toast.warning("Please select rate!")
      : !user.username
      ? navigateTo("/signin", { state: `/product/${id}` })
      : dispatch(reviewProduct());
  };

  useEffect(() => {
    reset(userReview);
  }, [userReview]);

  return (
    <div className="col-md-6">
      <div>
        <h4 className="mb-4">{t("product.leave_review")}</h4>
        <div className="d-flex my-3">
          <p className="mb-0 mr-2">
            {t("product.your_rating")} <span className="text-danger">*</span> :
          </p>
          <Controller
            name="rate"
            control={control}
            render={({ field }) => (
              <Stars
                rating={field.value}
                changeRating={(e) => onFieldChange(e, field)}
              />
            )}
          />
        </div>
        <form onSubmit={handleSubmit(sendReview)}>
          <div className="form-group">
            <label htmlFor="message">{t("product.your_comment")}</label>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <textarea
                  id="message"
                  cols="30"
                  rows="5"
                  value={field.value}
                  className="form-control"
                  onChange={(e) => onFieldChange(e.target.value, field)}
                ></textarea>
              )}
            />
          </div>
          <div className="form-group mb-0">
            <button
              className="btn btn-primary w-100"
              disabled={sendReviewPending || userReview.rate == 0}
            >
              {sendReviewPending ? (
                <FontAwesomeIcon icon={faCircleNotch} spin />
              ) : (
                t("product.send_review")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewProduct;
