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
import Calendar from "../Calendar";

const CalendarPage = () => {
  const navigate = useNavigate();
  const tableData = [
    {
      id: 1,
      name: "MacBook Pro 13”",
      variants: "2 Variants",
      category: "Laptop",
      price: "$2399.00",
      status: "Publish",
      image: "/images/product/product-01.jpg", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Apple Watch Ultra",
      variants: "1 Variant",
      category: "Watch",
      price: "$879.00",
      status: "Save",
      image: "/images/product/product-02.jpg", // Replace with actual image URL
    },
    {
      id: 3,
      name: "iPhone 15 Pro Max",
      variants: "2 Variants",
      category: "SmartPhone",
      price: "$1869.00",
      status: "Publish",
      image: "/images/product/product-03.jpg", // Replace with actual image URL
    },
    {
      id: 4,
      name: "iPad Pro 3rd Gen",
      variants: "2 Variants",
      category: "Electronics",
      price: "$1699.00",
      status: "Conflic",
      image: "/images/product/product-04.jpg", // Replace with actual image URL
    },
    {
      id: 5,
      name: "AirPods Pro 2nd Gen",
      variants: "1 Variant",
      category: "Accessories",
      price: "$240.00",
      status: "Publish",
      image: "/images/product/product-05.jpg", // Replace with actual image URL
    },
  ];
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

  const handleHref = (path) => {
    if (path) {
      window.open(path, "_blank");
    }
  };
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

  const handleAddData = () => {
    setData([...data, { ...request, _id: Math.random() }]);
  };

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
