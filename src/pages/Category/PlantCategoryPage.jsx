import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Button from "../../components/ui/button/Button";
import Modal from "../../components/modal/Modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import EmptyData from "../../components/no-data/EmptyData";
import {
  DeleteCategory,
  GetAllCategory,
  SaveCategory,
  UpdateCategory,
} from "../../api/categoryService";
import { debounce } from "lodash";
import MyPagination from "../../components/ui/pagination/MyPagination";
import LottieComponent from "../../components/lotties/lottie";
import { toast } from "react-toastify";
import VariantModal from "../../components/modal/VariantModal";

const PlantCategoryPage = () => {
  const type = "plant-categories";
  const REQUEST_INIT = { name: "", type: type };
  const [isBusy, setIsBusy] = React.useState(false);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [isAddNew, setIsAddNew] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [errors, setErrors] = React.useState([]);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [keySearch, setKeySearch] = React.useState("");
  const [request, setRequest] = React.useState(REQUEST_INIT);
  const [filterPage, setFilterPage] = React.useState({
    type: type,
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
          setTotalRecords(res.metaData.totalRecords);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const onValidate = () => {
    if (request?.name?.length === 0) {
      setErrors([...errors, "name"]);
      return false;
    }
    return true;
  };

  const SaveData = async () => {
    if (isBusy) {
      return;
    }
    if (!onValidate()) {
      return;
    }

    SaveCategory(request)
      .then((res) => {
        if (res.success) {
          toast.success("Create Success!");
          setVisibleModal(false);
          LoadData();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const UpdateData = async () => {
    if (isBusy) {
      return;
    }
    if (!onValidate()) {
      return;
    }
    setIsBusy(true);
    UpdateCategory(request._id, request)
      .then((res) => {
        if (res.success) {
          toast.success("Update Success!");
          setVisibleModal(false);
          LoadData();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsAddNew(true);
        setIsBusy(false);
      });
  };

  const DeleteData = async (id) => {
    if (isBusy) {
      return;
    }

    setIsBusy(true);
    DeleteCategory(id)
      .then((res) => {
        if (res.success) {
          toast.success("Delete Success!");
          LoadData();
        }
      })
      .catch(() => {
        toast.error("Delete Failed!");
      })
      .finally(() => {
        setIsBusy(false);
      });
  };
  const onDebounce = React.useCallback(
    debounce((term) => {
      setFilterPage({
        ...filterPage,
        keySearch: term.trim(),
        page: 1,
      });
    }, 700),
    []
  );

  React.useEffect(() => {
    LoadData();
  }, [filterPage]);

  return (
    <div>
      <PageBreadcrumb pageTitle="Plant Categories" preLink="" />
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
                value={keySearch}
                onChange={(e) => {
                  setKeySearch(e.target.value);
                  onDebounce(e.target.value);
                }}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[230px]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              children={"Add new"}
              onClick={() => {
                setIsAddNew(true);
                setRequest(REQUEST_INIT);
                setVisibleModal(true);
              }}
            />
          </div>
        </div>
        <div className=" max-w-full overflow-x-auto ">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
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
              {isBusy ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <LottieComponent />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {data?.length > 0 &&
                    data.map((item) => (
                      <TableRow
                        onClick={() => setRequest(item)}
                        onDoubleClick={() => {
                          setIsAddNew(false);
                          setVisibleModal(true);
                          setRequest(item);
                        }}
                        key={item._id}
                        className=""
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
                                {item?.name}
                              </p>
                              <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                {item?.discription}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <div className="flex item-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              children={"Edit"}
                              onClick={() => {
                                setIsAddNew(false);
                                setVisibleModal(true);
                                setRequest(item);
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              children={"Delete"}
                              onClick={() => {
                                DeleteData(item._id);
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>

        {!isBusy ? (
          data?.length > 0 ? (
            <MyPagination
              filterPage={filterPage}
              setFilterPage={setFilterPage}
              totalRecords={totalRecords}
            />
          ) : (
            <EmptyData />
          )
        ) : (
          <></>
        )}
        <VariantModal
          isOpen={visibleModal}
          setIsOpen={setVisibleModal}
          onClose={() => {
            setErrors([]);
            setRequest(REQUEST_INIT);
          }}
          title={isAddNew ? "Add new" : "Update"}
          onConfirm={() => {
            isAddNew ? SaveData() : UpdateData();
          }}
        >
          <div className="grid grid-cols-1 gap-2">
            <div>
              <Label children={"Name"} />
              <Input
                {...{
                  error: errors.includes("name"),
                  hint: errors.includes("name") ? "Required field" : "",
                }}
                value={request?.name}
                onChange={(e) =>
                  setRequest({ ...request, name: e.target.value })
                }
              />
            </div>
          </div>
        </VariantModal>
      </div>
    </div>
  );
};

export default PlantCategoryPage;
