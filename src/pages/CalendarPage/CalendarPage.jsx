import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import Calendar from "./Calendar";

const CalendarPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Calendar" preLink="" />
      <div className="min-h-[calc(100vh-180px)] max-h-[calc(100vh + 300px)] overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <Calendar />
      </div>
    </div>
  );
};

export default CalendarPage;
