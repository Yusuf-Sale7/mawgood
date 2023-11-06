import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../../components/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faEnvelope,
  faMapMarkerAlt,
  faPhoneAlt,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  patchContactForm,
  sendMessage,
} from "../../stores/contact/contactSlice";
import { customer_service_num, support_email } from "../../utils/StaticData";
import { toast } from "react-toastify";
import i18next from "i18next";

function Conact() {
  const isEnglish = i18next.language === "en" ? true : false;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading, message, contactForm } = useSelector(
    (state) => state.contact
  );
  const isExistingUser = user.username ? true : false;

  const {
    control,
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onSubmit", defaultValues: contactForm });

  const onFieldChange = (field, value) => {
    dispatch(patchContactForm({ [field.name]: value }));
  };

  const handleSendMessage = (message) => {
    dispatch(sendMessage(message));
  };

  // Reset form on page load & after submit
  useEffect(() => {
    reset(contactForm);
  }, [contactForm]);

  // Set user name and email if he loggin in
  useEffect(() => {
    isExistingUser
      ? dispatch(
          patchContactForm({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
          })
        )
      : dispatch(
          patchContactForm({
            name: "",
            email: "",
          })
        );
  }, [isExistingUser]);

  useEffect(() => {
    message && toast.success(isEnglish ? message.messageEN : message.messageAR);

    message &&
      dispatch(
        patchContactForm({ name: "", email: "", subject: "", message: "" })
      );
  }, [message]);

  return (
    <div className="container-fluid">
      <SectionHeader title={t("contact.title")} />
      <div className="row px-xl-5">
        <div className="col-lg-7 mb-5">
          <div className="contact-form bg-light p-30">
            <form name="sentMessage" onSubmit={handleSubmit(handleSendMessage)}>
              <div className="control-group mb-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name={field.name}
                      value={field.value}
                      disabled={isExistingUser}
                      className="form-control"
                      placeholder={t("contact.name")}
                      {...register("name", {
                        required: t("contact.name_required"),
                        onChange: (e) => onFieldChange(field, e.target.value),
                      })}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                  )}
                />
                {errors.name && (
                  <small className="text-danger">
                    <FontAwesomeIcon
                      className="mx-1"
                      icon={faTriangleExclamation}
                    />
                    {errors.name.message}
                  </small>
                )}
              </div>
              <div className="control-group my-4">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      name={field.name}
                      value={field.value}
                      disabled={isExistingUser}
                      className="form-control"
                      placeholder={t("contact.email")}
                      {...register("email", {
                        required: t("contact.email_required"),
                        onChange: (e) => onFieldChange(field, e.target.value),
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: t("auth.email_invalid"),
                        },
                      })}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  )}
                />
                {errors.email && (
                  <small className="text-danger">
                    <FontAwesomeIcon
                      className="mx-1"
                      icon={faTriangleExclamation}
                    />
                    {errors.email.message}
                  </small>
                )}
              </div>
              <div className="control-group my-4">
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name={field.name}
                      className="form-control"
                      placeholder={t("contact.subject")}
                      {...register("subject", {
                        required: t("contact.subject_required"),
                        onChange: (e) => onFieldChange(field, e.target.value),
                      })}
                      aria-invalid={errors.subject ? "true" : "false"}
                    />
                  )}
                />
                {errors.subject && (
                  <small className="text-danger">
                    <FontAwesomeIcon
                      className="mx-1"
                      icon={faTriangleExclamation}
                    />
                    {errors.subject.message}
                  </small>
                )}
              </div>
              <div className="control-group my-4">
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      name={field.name}
                      className="form-control"
                      rows={3}
                      placeholder={t("contact.message")}
                      {...register("message", {
                        required: t("contact.message_required"),
                        onChange: (e) => onFieldChange(field, e.target.value),
                      })}
                      aria-invalid={errors.message ? "true" : "false"}
                    />
                  )}
                />
                {errors.message && (
                  <small className="text-danger">
                    <FontAwesomeIcon
                      className="mx-1"
                      icon={faTriangleExclamation}
                    />
                    {errors.message.message}
                  </small>
                )}
              </div>
              <div>
                <button
                  className="btn btn-primary px-5 w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                  ) : (
                    t("contact.send_message")
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-5 mb-5">
          <div className="bg-light p-30 mb-30">
            <iframe
              style={{ width: "100%", height: "250px", border: "0" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14610049.559018178!2d39.89701565401246!3d26.619439419762077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14368976c35c36e9%3A0x2c45a00925c4c444!2z2YXYtdix!5e0!3m2!1sar!2seg!4v1698578535235!5m2!1sar!2seg"
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          <div className="bg-light p-30 mb-3">
            <p className="mb-2">
              <FontAwesomeIcon
                className="text-primary mx-2"
                icon={faMapMarkerAlt}
              />
              {t("footer.info.address")}
            </p>
            <p className="mb-2">
              <FontAwesomeIcon
                className="text-primary mx-2"
                icon={faEnvelope}
              />
              {support_email}
            </p>
            <p className="mb-0">
              <FontAwesomeIcon
                className="text-primary mx-2"
                icon={faPhoneAlt}
              />
              <label className="dir-ltr">{customer_service_num}</label>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conact;
