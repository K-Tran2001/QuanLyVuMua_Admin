import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { BoxIcon, MoreDotIcon } from "../../icons";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import Button from "../../components/ui/button/Button";
import Modal from "../../components/modal/Modal";
import { useNavigate } from "react-router";
import EmptyData from "../../components/no-data/EmptyData";
import {
  DeleteGarden,
  ExportAllGarden,
  ExportGarden,
  GetAllGarden,
  ImportGarden,
} from "../../api/gardenService";
import LottieComponent from "../../components/lotties/lottie";
import { debounce } from "lodash";
import { MainContext } from "../../context/MainContext";
import Filter from "./Filter";
import MyPagination from "../../components/ui/pagination/MyPagination";
import { toast } from "react-toastify";
import {
  getItemLocalStore,
  setItemLocalStore,
} from "../../hooks/useLocalStore";
import Label from "../../components/form/Label";
import FileInput from "../../components/form/input/FileInput";
import UploadExcelFile from "../../components/upload-exce-file/UploadExcelFile";

const GardenPage = () => {
  const navigate = useNavigate();
  const context = React.useContext(MainContext);
  const { drawer, setDrawer } = context;

  const [isBusy, setIsBusy] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeRowId, setActiveRowId] = React.useState(null);
  const [activeRow, setActiveRow] = React.useState(null);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [keySearch, setKeySearch] = React.useState("");
  const FILTERPAGE_INIT = {
    keySearch: "",
    categoryId: null,
    sort: {},
    page: 1,
    pageSize: 10,
    sortOptions: { sortField: "createdAt", sortOrder: "desc" },
  };
  const [filterPage, setFilterPage] = React.useState(() => {
    const dataFilter = getItemLocalStore("gardenPageFilter");
    return dataFilter ? dataFilter : FILTERPAGE_INIT;
  });

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
    setActiveRowId(null);
  }

  const LoadData = async () => {
    if (isBusy) {
      return;
    }
    setIsBusy(true);
    setItemLocalStore("gardenPageFilter", filterPage);
    var filterPage_v2 = { ...filterPage };
    if (filterPage_v2.sortOptions !== null) {
      const sortDirection =
        filterPage_v2.sortOptions.sortOrder.toLowerCase() === "asc" ? 1 : -1;
      filterPage_v2.sortOptions = {
        [filterPage_v2.sortOptions.sortField]: sortDirection,
      };
    }

    GetAllGarden(filterPage_v2)
      .then((res) => {
        console.log("res", res);

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

  const DeleteData = async (id) => {
    if (isBusy) {
      return;
    }
    setIsBusy(true);
    DeleteGarden(id)
      .then((res) => {
        console.log("res", res);

        if (res.success) {
          toast.success("Delete Success!");
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

  const [visibleModalImport, setVisibleModalImport] = React.useState(false);
  const [requestImport, setRequestImport] = React.useState({
    files: null,
    fromRow: 1,
    toRow: 1,
  });
  const jsonToFormData = (json) => {
    const formData = new FormData();
    Object.entries(json).forEach(([key, value]) => {
      formData.append(
        key,
        value instanceof Object && !(value instanceof File)
          ? JSON.stringify(value)
          : value
      );
    });
    return formData;
  };
  const ImportData = async () => {
    if (requestImport.files == null) {
      return;
    }
    if (
      requestImport.fromRow == requestImport.toRow ||
      requestImport.fromRow > requestImport.toRow ||
      requestImport.toRow > requestImport.maxRow
    ) {
      toast("Recheck from row and to row!");
      return;
    }
    var formData = jsonToFormData(requestImport);

    ImportGarden(formData)
      .then((response) => {
        if (response.success) {
          setVisibleModalImport(false);
          if (response.data.failed === 0) {
            toast.success("Import successful !");
          } else {
            window.location.href = response.data.URL_dowloadFailed;
            toast.success(
              `Import is successful but your import file has ${response.data.failed} wrong lines!`
            );
          }
        } else {
          window.location.href = response.data.URL_dowloadFailed;
          toast.error("Import failed !");
        }
        setIsOpen(false);
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const DowloadTemplate = () => {};
  const ExportData = async () => {
    var filterPage_v2 = { ...filterPage };

    const sortDirection =
      filterPage_v2.sortOptions.sortOrder.toLowerCase() === "asc" ? 1 : -1;
    filterPage_v2.sortOptions = {
      [filterPage_v2.sortOptions.sortField]: sortDirection,
    };
    ExportGarden(filterPage_v2)
      .then((response) => {
        if (response.success) {
          toast.success("Export Success!");
          window.location.href = response.data;
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const ExportDataNoFilter = async () => {
    ExportAllGarden()
      .then((response) => {
        if (response.success) {
          toast.success("Export Success!");
          window.location.href = response.data;
        }
      })
      .catch((err) => {})
      .finally(() => {});
    //res.data = url
    //window.location.href = `http://localhost:5000${data.url}`;
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
  console.log(filterPage);

  return (
    <div>
      <PageBreadcrumb pageTitle="Gardens" preLink="" />

      <Filter
        initValue={filterPage}
        onChange={(e) => {
          setFilterPage(e);
        }}
      />
      <div className="min-h-[calc(100vh-180px)] max-h-[calc(100vh + 300px)] overflow-y-hidden custom-scrolbar  rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
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
              onClick={() => navigate("/gardens/add")}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setDrawer({ ...drawer, isOpen: true, position: "rightDrawer" })
              }
              children={
                <>
                  <BoxIcon className="size-5" />
                  Filter
                </>
              }
            />

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
                  onItemClick={() => {
                    closeDropdown();
                    setVisibleModalImport(true);
                  }}
                  className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  Import Data
                </DropdownItem>
                <DropdownItem
                  onItemClick={() => {
                    closeDropdown();
                    ExportData();
                  }}
                  className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  Export With Filter
                </DropdownItem>
                <DropdownItem
                  onItemClick={() => {
                    closeDropdown();
                    ExportDataNoFilter();
                  }}
                  className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  Export All Data
                </DropdownItem>
              </Dropdown>
            </div>
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
                  Name / images
                </TableCell>
                <TableCell
                  isHeader
                  className="px-2 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
                >
                  Num Of Plants
                </TableCell>
                <TableCell
                  isHeader
                  className=" px-2 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
                >
                  Land Area
                </TableCell>

                <TableCell
                  isHeader
                  className="px-2 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 w-[100px] text-center"
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
                        onClick={() => setActiveRow(item)}
                        onDoubleClick={() => {
                          navigate(`edit/${item._id}`);
                        }}
                        key={item._id}
                        className="hover:shadow-sm hover:bg-gray-100"
                      >
                        <TableCell className="py-3 px-2">
                          <div className="flex items-center gap-3">
                            <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                              <img
                                src={
                                  item.images.length > 0
                                    ? item.images[0].imageAbsolutePath
                                    : "images/orther/empty.png"
                                }
                                className="h-[50px] w-[50px]"
                                alt={item.name}
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div className="w-[300px] truncate">
                              <p className=" font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                {item.name}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-2">
                          <p className="text-right font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {item?.numberOfPlants?.toLocaleString()}
                          </p>
                        </TableCell>
                        <TableCell className="py-3 px-2">
                          <p className="text-right font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {item.landArea?.toLocaleString()}
                          </p>
                        </TableCell>

                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <div className="flex item-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              children={"Edit"}
                              onClick={() => {
                                navigate(`edit/${item._id}`);
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              children={"Delete"}
                              onClick={() => {
                                setVisibleModal(true);
                                setActiveRow(item);
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
                                  }}
                                  className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                >
                                  View more
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

        <Modal
          isOpen={visibleModal}
          setIsOpen={setVisibleModal}
          title={"Confirm"}
          onConfirm={() => {
            DeleteData(activeRow._id);
            setVisibleModal(false);
          }}
          hiddenButtomConfirm={false}
          textButtomConfirm="Confirm"
        >
          <div className="grid grid-cols-1 gap-2 text-lg">
            Are you sure you want to delete?
          </div>
        </Modal>

        <UploadExcelFile
          ImportData={ImportData}
          DowloadTemplate={DowloadTemplate}
          initData={requestImport}
          onChange={(e) => setRequestImport(e)}
          isOpen={visibleModalImport}
          setIsOpen={setVisibleModalImport}
        />
      </div>
    </div>
  );
};

export default GardenPage;
