import React, { useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { useNavigate, useParams } from "react-router";
import MyCkEditor from "../../components/my-ckeditor/MyCkEditor";
import Select from "../../components/form/Select";
import Tooltip from "../../components/tooltip/Tooltip";
import {
  SavePlant,
  SavePlant_UploadMutli,
  SeachPlant,
  UpdatePlant_UploadMutli,
} from "../../api/plantService";
import DropzoneComponentV2 from "../../components/form/form-elements/DropZoneV2";
import { CloseIcon } from "../../icons";
import { GetAllCategory, GetAllCategoryFK } from "../../api/categoryService";

const TYPE_OF_DATA_IMG_RETURN = "file"; //file or base64String
const AddPlantPage = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  const [isBusy, setIsBusy] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [deleteImages, setDeleteImages] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(false);

  const [request, setRequest] = React.useState({
    categoryId: "",
  });
  const [categories, setCategories] = React.useState([]);

  const SaveData = async () => {
    if (isBusy) {
      return;
    }
    setIsBusy(true);
    var request_v2 = null;
    if (TYPE_OF_DATA_IMG_RETURN === "file") {
      const formData = jsonToFormData(request);
      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i].imageFile);
      }
      request_v2 = formData;
    } else {
      request_v2 = {
        ...request,
        files: images.map((img) => img.imageBase64String),
      };
    }

    SavePlant_UploadMutli(request_v2)
      .then((response) => {
        if (response.success) {
          navigation("/plants");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsBusy(false);
      });
  };
  const UpdateData = async () => {
    if (isBusy) {
      return;
    }
    setIsBusy(true);
    var request_v2 = null;
    if (TYPE_OF_DATA_IMG_RETURN === "file") {
      const formData = jsonToFormData(request);
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
        files: images.map((img) => {
          if (img.isNewUpload) return img.imageBase64String;
        }),
        oldImages: images.map((img) => {
          if (!img.isNewUpload) return img;
        }),
        deleteImages: deleteImages,
      };
    }

    UpdatePlant_UploadMutli(id, request_v2)
      .then((response) => {
        if (response.success) {
          navigation("/plants");
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
    SeachPlant(id).then((response) => {
      if (response.success) {
        setRequest(response.data[0]);
        setImages(response.data[0].images);
      }
    });
  };
  const LoadDataFK = async () => {
    GetAllCategoryFK()
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
  console.log(images);

  return (
    <div>
      <PageBreadcrumb
        pageTitle={isEdit ? "Edit" : "Add new"}
        prePageTitle="Plants"
        preLink="plants"
      />
      <div className=" min-h-[calc(100vh-180px)] custom-scrollbar overflow-hidden  rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6">
          <div className="space-y-6">
            <div>
              <Label children={"Name"} />
              <Input
                value={request?.name}
                onChange={(e) =>
                  setRequest({ ...request, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>{"Category"}</Label>
              <Select
                options={
                  categories?.length > 0
                    ? categories.map((item) => ({
                        label: item.name,
                        value: item._id,
                      }))
                    : []
                }
                defaultValue={request.categoryId}
                placeholder="Select an option"
                onChange={(e) => {
                  setRequest({
                    ...request,
                    categoryId: e,
                  });
                }}
                className="dark:bg-dark-900"
              />
            </div>

            <div>
              <Label children={"Images"} />
              <DropzoneComponentV2
                multiple={true}
                typeDataReturn={TYPE_OF_DATA_IMG_RETURN}
                imagesInit={images}
                onUpload={(dataReturn) => {
                  // setRequest({
                  //   ...request,
                  //   files: [dataReturn],
                  // });
                  setImages(dataReturn);
                }}
              />
              {/* <input
                multiple
                type="file"
                onChange={(e) =>
                  setRequest({ ...request, files: e.target.files })
                }
              /> */}
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
          </div>
          <div className="col-span-2">
            <Label children={"Description"} />
            <MyCkEditor
              initData={""}
              onChange={(data) => setRequest({ ...request, description: data })}
            />
          </div>
        </div>
        <div className="flex justify-end py-2 ">
          <div>
            <Tooltip titleTooltip="Ctr + S to Save">
              <Button
                children={"Save"}
                onClick={isEdit ? UpdateData : SaveData}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlantPage;
