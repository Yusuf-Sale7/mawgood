import React from "react";
import { useTranslation } from "react-i18next";

function SortAndLimit({ sortEvent, limitEvent }) {
  const { t } = useTranslation();

  return (
    <div className="d-flex align-items-center mb-3 flex-nowrap">
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-sm btn-light dropdown-toggle"
          data-toggle="dropdown"
        >
          {t("common.sorting.title")}
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          <button className="dropdown-item" onClick={() => sortEvent("low")}>
            {t("common.sorting.low_to_high")}
          </button>
          <button className="dropdown-item" onClick={() => sortEvent("high")}>
            {t("common.sorting.high_to_low")}
          </button>
        </div>
      </div>
      <div className="btn-group mx-2">
        <button
          type="button"
          className="btn btn-sm btn-light dropdown-toggle"
          data-toggle="dropdown"
        >
          {t("common.showing.title")}
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          <button className="dropdown-item" onClick={() => limitEvent(10)}>
            10
          </button>
          <button className="dropdown-item" onClick={() => limitEvent(20)}>
            20
          </button>
          <button className="dropdown-item" onClick={() => limitEvent(30)}>
            30
          </button>
          <button className="dropdown-item" onClick={() => limitEvent(40)}>
            40
          </button>
          <button className="dropdown-item" onClick={() => limitEvent(50)}>
            50
          </button>
        </div>
      </div>
    </div>
  );
}

export default SortAndLimit;
