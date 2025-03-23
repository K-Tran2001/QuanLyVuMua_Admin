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

const PartnerPage = () => {
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeRowId, setActiveRowId] = React.useState(null);
  const [activeRow, setActiveRow] = React.useState(null);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [filterPage, setFilterPage] = React.useState({
    keySearch: "",
    sort: {},
    page: 1,
    pageSize: 10,
  });

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
    setActiveRowId(null);
  }
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
    GetAllForm(filterPage)
      .then((res) => {
        console.log("res", res);

        if (res.success) {
          setData(res.data);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setIsBusy(true);
      });
  };
  React.useEffect(() => {
    LoadData();
  }, [filterPage]);
  return (
    <div>
      <PageBreadcrumb pageTitle="Partners" preLink="" />
      <div className="min-h-[calc(100vh-180px)] max-h-[calc(100vh + 300px)] overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {/* <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              List
            </h3> */}
            <div className="relative">
              <button className="absolute -translate-y-1/2 left-4 top-1/2">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    fill=""
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search ..."
                value={filterPage.keySearch}
                onChange={(e) =>
                  setFilterPage({ ...filterPage, keySearch: e.target.value })
                }
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[230px]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              children={"Add new"}
              onClick={() => navigate("/partners/add")}
            />
            {/* <Button
              variant="outline"
              size="sm"
              children={
                <>
                  <BoxIcon className="size-5" />
                  Filter
                </>
              }
            />
            <Button variant="outline" size="sm" children={"See all"} />

            <div className="relative inline-block">
              <button
                className="dropdown-toggle"
                onClick={() => {
                  toggleDropdown();
                  setActiveRowId("more");
                }}
              >
                <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
              </button>
              <Dropdown
                isOpen={isOpen && activeRowId === "more"}
                onClose={closeDropdown}
                className="w-40 p-2"
              >
                <DropdownItem
                  onItemClick={closeDropdown}
                  className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  View More
                </DropdownItem>
                <DropdownItem
                  onItemClick={closeDropdown}
                  className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  ...
                </DropdownItem>
              </Dropdown>
            </div> */}
          </div>
        </div>
        <div className="max-w-full overflow-x-auto ">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Title/discription
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Fields length
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Sheet Id
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[100px] text-center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {data?.length > 0 &&
                data.map((item) => (
                  <TableRow
                    onClick={() => setActiveRow(item)}
                    onDoubleClick={() => {
                      setVisibleModal(true);
                    }}
                    key={item._id}
                    className="hover:shadow-sm hover:bg-gray-100"
                  >
                    <TableCell className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                          <img
                            src={"images/orther/empty.png"}
                            className="h-[50px] w-[50px]"
                            alt={item.name}
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="w-[300px] truncate">
                          <p className=" font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {item.title}
                          </p>
                          <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            {item.discription || "Customer feedback survey"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {item?.formDetail?.length > 0
                        ? JSON.parse(item?.formDetail)?.length
                        : 0}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="w-[200px] truncate">{item.sheetId}</div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          item.status === "Publish"
                            ? "success"
                            : item.status === "Save"
                            ? "warning"
                            : "error"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex item-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          children={"Edit"}
                          onClick={() => {
                            navigate(`/forms/edit/${item._id}`);
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          children={"Delete"}
                          onClick={() => {
                            alert("Confirm delete");
                          }}
                        />
                        <div className="relative inline-block  ">
                          <button
                            className="dropdown-toggle my-2"
                            onClick={() => {
                              toggleDropdown();
                              setActiveRowId(item._id);
                            }}
                          >
                            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                          </button>
                          <Dropdown
                            isOpen={isOpen && item._id == activeRowId}
                            onClose={closeDropdown}
                            className="w-40 p-2"
                          >
                            <DropdownItem
                              onItemClick={() => {
                                closeDropdown();
                                setActiveRow(item);
                                setVisibleModal(true);
                              }}
                              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                              View more
                            </DropdownItem>
                            <DropdownItem
                              onItemClick={closeDropdown}
                              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                              Publish form
                            </DropdownItem>
                            <DropdownItem
                              onItemClick={closeDropdown}
                              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                              View Sheet data
                            </DropdownItem>
                            <DropdownItem
                              onItemClick={closeDropdown}
                              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                              Visit form
                            </DropdownItem>
                            <DropdownItem
                              onItemClick={closeDropdown}
                              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                              ...
                            </DropdownItem>
                          </Dropdown>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        {data?.length > 0 ? <Pagination pageFilter={{}} /> : <EmptyData />}
        <Modal
          isOpen={visibleModal}
          setIsOpen={setVisibleModal}
          title={"Form detail"}
          onConfirm={() => setVisibleModal(false)}
          hiddenButtomConfirm={true}
        >
          <div className="grid grid-cols-1 gap-2">
            <div>
              <Label children={"Title"} />
              <TextArea value={activeRow?.title} readOnly={true} />
            </div>
            <div>
              <Label children={"Discription"} />
              <TextArea value={activeRow?.discription} readOnly={true} />
            </div>
            <div>
              <Label children={"Sheet ID"} />
              <Input value={activeRow?.sheetId} readOnly={true} />
            </div>
            <div className="flex justify-center gap-3">
              <Button
                size="sm"
                onClick={() => handleHref(activeRow?.linkSubmitForm)}
                children={
                  <>
                    <BoxIcon className="size-5" />
                    Visit Form
                  </>
                }
              />
              <Button
                size="sm"
                onClick={() => handleHref(activeRow?.linkToGGSheet)}
                children={
                  <>
                    <BoxIcon className="size-5" />
                    Visit GG Sheet
                  </>
                }
              />
              <Button
                size="sm"
                onClick={() => navigate(`/forms-edit/${activeRow._id}`)}
                children={
                  <>
                    <BoxIcon className="size-5" />
                    Edit form
                  </>
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label children={"Number Of Record"} />
                <Input value={activeRow?.count} readOnly={true} />
              </div>
              <div>
                <Label children={"Number Of fields"} />
                <Input
                  value={
                    activeRow?.formDetail?.length > 0
                      ? JSON.parse(activeRow.formDetail)?.length
                      : 0
                  }
                  readOnly={true}
                />
              </div>
            </div>
            <div>
              <Label
                className={"text-end"}
                children={`Created by userId ${activeRow?.userId}`}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PartnerPage;
