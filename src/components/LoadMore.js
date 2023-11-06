import React from "react";
import { useTranslation } from "react-i18next";

function LoadMore({ event }) {
  const { t } = useTranslation();

  return (
    <div className="col-12 mt-4">
      <div className="text-center">
        <button className="btn btn-primary" onClick={() => event()}>
          {t("common.load_more")}
        </button>
      </div>
    </div>
  );
}

export default LoadMore;
