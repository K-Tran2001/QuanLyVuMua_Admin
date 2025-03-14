import React, { useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import Pagination from "../../components/ui/pagination";
import { BoxIcon, MoreDotIcon } from "../../icons";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import Button from "../../components/ui/button/Button";
import Modal from "../../components/modal/Modal";
import Label from "../../components/form/Label";
import TextArea from "../../components/form/input/TextArea";
import Input from "../../components/form/input/InputField";
import { useNavigate } from "react-router";
import { GetAllForm, SeachForm } from "../../api/formService";
import EmptyData from "../../components/no-data/EmptyData";

import {
  DeleteCategory,
  GetAllCategory,
  SaveCategory,
  UpdateCategory,
} from "../../api/categoryService";

const ChatBotPage = () => {
  const [isBusy, setIsBusy] = React.useState(false);
  const [activeRow, setActiveRow] = React.useState(null);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [isAddNew, setIsAddNew] = React.useState(false);
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
      <PageBreadcrumb pageTitle="Chat Bot" preLink="" />
      <div className="min-h-[calc(100vh-180px)] max-h-[calc(100vh + 300px)] overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        Chat Bot
      </div>
    </div>
  );
};

export default ChatBotPage;
