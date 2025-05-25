import React, { useEffect, useMemo, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { useNavigate, useParams } from "react-router";
import MyCkEditor from "../../components/my-ckeditor/MyCkEditor";
import Select from "../../components/form/Select";
import Tooltip from "../../components/tooltip/Tooltip";
import {
  SaveBill_UploadMutli,
  SeachBill,
  UpdateBill_UploadMutli,
} from "../../api/billService";
import DropzoneComponentV2 from "../../components/form/form-elements/DropZoneV2";
import { CloseIcon } from "../../icons";
import { GetAllGardenFK } from "../../api/gardenService";

import { toast } from "react-toastify";
import AddBillDetailComponent from "./AddBillDetailComponent";

const TYPE_OF_DATA_IMG_RETURN = "file"; //file or base64String

const AddBillPage = () => {
  const type = "sales-invoices";
  const { id } = useParams();
  const navigation = useNavigate();
  const INIT_REQUEST = {
    name: "",
    gardenId: "",
    description: "",
    images: [],
    billDetail: [],
    type,
  };

  const [isBusy, setIsBusy] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [deleteImages, setDeleteImages] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [request, setRequest] = React.useState(INIT_REQUEST);
  const [categories, setCategories] = React.useState([]);
  const [billDetail, setBillDetail] = useState([]);

  const SaveData = async (request) => {
    if (isBusy) {
      return;
    }
    if (!onValidate()) {
      return;
    }
    setIsBusy(true);

    var request_v2 = null;
    if (TYPE_OF_DATA_IMG_RETURN === "file") {
      const formData = jsonToFormData({
        ...request,
        totalActual: sumTotal,
        billDetail: JSON.stringify(request.billDetail),
      });
      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i].imageFile);
      }
      request_v2 = formData;
    } else {
      request_v2 = {
        ...request,
        totalActual: sumTotal,
        files: images.map((img) => img.imageBase64String),
      };
    }

    SaveBill_UploadMutli(request_v2)
      .then((response) => {
        if (response.success) {
          toast.success("Create Success!");
          navigation(`/${type}`);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsBusy(false);
      });
  };
  const UpdateData = async (request) => {
    if (isBusy) {
      return;
    }
    if (!onValidate()) {
      return;
    }

    setIsBusy(true);
    var request_v2 = null;
    if (TYPE_OF_DATA_IMG_RETURN === "file") {
      const formData = jsonToFormData({
        ...request,
        totalActual: sumTotal,
        billDetail: JSON.stringify(request.billDetail),
      });
      for (let i = 0; i < images.length; i++) {
        if (images[i].isNewUpload) {
          formData.append("files", images[i].imageFile);
        }
      }
      formData.append(
        "oldImages",
        JSON.stringify(
          images.map((img) => {
            if (!img.isNewUpload) return img;
          })
        )
      );
      formData.append("deleteImages", JSON.stringify(deleteImages));
      request_v2 = formData;
    } else {
      request_v2 = {
        ...request,
        totalActual: sumTotal,
        files: images.map((img) => {
          if (img.isNewUpload) return img.imageBase64String;
        }),
        oldImages: images.map((img) => {
          if (!img.isNewUpload) return img;
        }),
        deleteImages: deleteImages,
      };
    }

    UpdateBill_UploadMutli(id, request_v2)
      .then((response) => {
        if (response.success) {
          navigation(`/${type}`);
          toast.success("Update Success!");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsBusy(false);
      });
  };
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

  const LoadData = async () => {
    SeachBill(id).then((response) => {
      if (response.success) {
        setRequest(response.data[0]);
        setBillDetail(response.data[0].billDetail);
        setImages(response.data[0].images);
      }
    });
  };

  const LoadDataFK = async () => {
    GetAllGardenFK()
      .then((res) => {
        if (res.success) {
          setCategories(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const onValidate = () => {
    var listError = [];
    if (request.name?.length === 0) {
      listError = [...listError, "name"];
    }
    if (
      request == null ||
      request?.gardenId == null ||
      request?.gardenId?.length === 0
    ) {
      listError = [...listError, "gardenId"];
    }
    setErrors(listError);
    return listError.length == 0;
  };
  const handleDeleteImage = (img) => {
    var indexToRemove = images.indexOf(img);
    console.log("indexToRemove", indexToRemove);

    if (indexToRemove != -1) {
      var copyImages = [...images];
      setDeleteImages([...deleteImages, copyImages[indexToRemove]]);
      copyImages = copyImages.filter((_, index) => index !== indexToRemove);
      setImages(copyImages);
    }
  };

  const sumTotal = useMemo(() => {
    return billDetail.reduce((sum, item) => sum + item.total, 0);
  }, [billDetail]);

  React.useEffect(() => {
    LoadDataFK();
    if (id !== undefined) {
      setIsEdit(true);
      LoadData();
    }
  }, [id]);

  useEffect(() => {
    const handleSaveShortcut = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Ngăn chặn trình duyệt mở hộp thoại lưu trang
        console.log("Call save data func");

        isEdit ? UpdateData() : SaveData();
      }
    };

    document.addEventListener("keydown", handleSaveShortcut);

    return () => {
      document.removeEventListener("keydown", handleSaveShortcut);
    };
  }, []);
  console.log(errors);

  return (
    <div>
      <PageBreadcrumb
        pageTitle={isEdit ? "Edit" : "Add new"}
        prePageTitle="Sales Invoices"
        preLink="sales-invoices"
      />
      <div className=" min-h-[calc(100vh-180px)] custom-scrollbar overflow-hidden  rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-3">
            <Label children={"Name"} />
            <Input
              {...{
                error: errors.includes("name"),
                hint: errors.includes("name") ? "Required field" : "",
              }}
              value={request?.name}
              onChange={(e) => setRequest({ ...request, name: e.target.value })}
            />
          </div>
          <div>
            <Label children={"Garden"} />
            <Select
              {...{
                error: errors.includes("gardenId"),
                hint: errors.includes("gardenId") ? "Required field" : "",
              }}
              defaultValue={request?.gardenId}
              options={
                categories?.length > 0
                  ? categories.map((item) => ({
                      label: item.name,
                      value: item._id,
                    }))
                  : []
              }
              placeholder="Select an option"
              onChange={(e) => {
                setRequest({
                  ...request,
                  gardenId: e,
                });
              }}
              className="dark:bg-dark-900"
            />
          </div>
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center gap-20">
              <Label children={`Detail`} />
              <Label
                children={
                  <h2 className="text-red-500">{`Total : ${sumTotal?.toLocaleString()}`}</h2>
                }
              />
            </div>

            <AddBillDetailComponent
              isConfirm={request?.isConfirm}
              isEdit={isEdit}
              initData={request?.billDetail}
              onChange={(e) => {
                setRequest({
                  ...request,
                  billDetail: e,
                });
                setBillDetail(e);
              }}
            />
          </div>

          <div className="col-span-1  md:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 order-1">
                <Label children={"Images"} />
                <DropzoneComponentV2
                  multiple={true}
                  typeDataReturn={TYPE_OF_DATA_IMG_RETURN}
                  imagesInit={images}
                  onUpload={(dataReturn) => {
                    setImages(dataReturn);
                  }}
                />
                {images?.length > 0 &&
                  images.map((itemImg) => (
                    <div key={Math.random()}>
                      {(itemImg.imageBase64String != "" ||
                        itemImg.imageAbsolutePath != "") && (
                        <div className="flex items-center space-x-4 border border-gray-300 dark:border-gray-700 rounded-lg relative my-4 p-2">
                          <div className=" w-[100px] h-[100px]  ">
                            <img
                              src={
                                itemImg.isNewUpload
                                  ? itemImg.imageBase64String
                                  : itemImg.imageAbsolutePath
                              }
                              className="w-full h-full"
                              style={{ objectFit: "contain" }}
                            />
                            <div
                              className="hover:bg-red-500 absolute top-0 right-0  translate-x-2 -translate-y-2 p-2 bg-gray-800 text-white rounded-lg dark:bg-white dark:text-black"
                              onClick={() => {
                                handleDeleteImage(itemImg);
                                console.log("delete", itemImg);
                              }}
                            >
                              <CloseIcon className="size-5 " />
                            </div>
                          </div>
                          <h3 className="text-lg  flex-1 truncate ">
                            {itemImg.fileName}
                          </h3>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="col-span-1 order-0">
                <Label children={"Description"} />
                <MyCkEditor
                  initData={request?.description}
                  onChange={(data) =>
                    setRequest({ ...request, description: data })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end py-2 ">
          <div>
            {!request?.isConfirm ? (
              <div className="flex gap-2">
                <Tooltip titleTooltip="Ctr + S to Save">
                  <Button
                    children={"Save and Confirm"}
                    onClick={() => {
                      isEdit
                        ? UpdateData({ ...request, isConfirm: true })
                        : SaveData({ ...request, isConfirm: true });
                    }}
                  />
                </Tooltip>
                <Tooltip titleTooltip="Ctr + S to Save">
                  <Button
                    children={"Save"}
                    onClick={() => {
                      isEdit ? UpdateData(request) : SaveData(request);
                    }}
                  />
                </Tooltip>
              </div>
            ) : (
              <Button
                variant="outline"
                children={"Close"}
                onClick={() => navigation(`/${type}`)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBillPage;
