import React from "react";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const { t } = useTranslation();

  return (
    <div className="text-center px-2">
      <h1 className="mb-3">{t("reset_password.title")}</h1>
      <p>{t("reset_password.description")}</p>
    </div>
  );
}

export default ResetPassword;
