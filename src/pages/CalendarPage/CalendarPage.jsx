import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import {
  DeleteCategory,
  GetAllCategory,
  SaveCategory,
  UpdateCategory,
} from "../../api/categoryService";
import Calendar from "../Calendar";

const CalendarPage = () => {
  const [isBusy, setIsBusy] = React.useState(false);

  const [data, setData] = React.useState([{ _id: 123, name: "item1" }]);

  const [request, setRequest] = React.useState(null);
  const [filterPage, setFilterPage] = React.useState({
    keySearch: "",
    sort: {},
    page: 1,
    pageSize: 10,
  });

  const LoadData = async () => {
    //const response = await GetAllForm(filterPage);
    if (isBusy) {
      return;
    }
    setIsBusy(true);
    GetAllCategory(filterPage)
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };
  console.log(request);

  const SaveData = async () => {
    //const response = await GetAllForm(filterPage);
    if (isBusy) {
      return;
    }
    setIsBusy(true);
    SaveCategory(request)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const UpdateData = async () => {
    //const response = await GetAllForm(filterPage);
    if (isBusy) {
      return;
    }
    setIsBusy(true);
    UpdateCategory(request._id, request)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const DeleteData = async (id) => {
    //const response = await GetAllForm(filterPage);
    if (isBusy) {
      return;
    }
    setIsBusy(true);
    DeleteCategory(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  React.useEffect(() => {
    LoadData();
  }, [filterPage]);

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
