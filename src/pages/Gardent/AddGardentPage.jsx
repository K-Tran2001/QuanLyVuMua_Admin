import React, { useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import InputNumber from "../../components/form/input/InputNumberField";

import MyCkEditor from "../../components/my-ckeditor/MyCkEditor";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import Tooltip from "../../components/tooltip/Tooltip";

const AddGardentPage = () => {
  const [request, setRequest] = React.useState({
    name: "",
    numOfPlants: "",
    landArea: "",
    description: "",
    images: [],
  });

  const LoadData = async () => {};
  const SaveData = async () => {};
  React.useEffect(() => {
    LoadData();
  }, []);
  useEffect(() => {
    const handleSaveShortcut = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Ngăn chặn trình duyệt mở hộp thoại lưu trang
        console.log("Call save data func");

        SaveData();
      }
    };

    document.addEventListener("keydown", handleSaveShortcut);

    return () => {
      document.removeEventListener("keydown", handleSaveShortcut);
    };
  }, []);

  return (
    <div>
      <PageBreadcrumb
        pageTitle="Add new"
        prePageTitle="Gardents"
        preLink="gardents"
      />
      <div className=" min-h-[calc(100vh-180px)] custom-scrollbar overflow-hidden  rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-6 col-span-1  md:col-span-2">
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
              <Label children={"Num Of plants (about)"} />
              <InputNumber
                value={request?.numOfPlants}
                onChange={(e) => {
                  setRequest({ ...request, numOfPlants: e });
                }}
              />
            </div>
            <div>
              <Label children={"Land area (m2)"} />
              <Input
                value={request?.landArea}
                onChange={(e) =>
                  setRequest({ ...request, landArea: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-span-1  md:col-span-2">
            <Label children={"Images"} />
            <DropzoneComponent
              onUpload={(base64String) => {
                setRequest({ ...request, iamges: [base64String] });
              }}
            />
          </div>
          <div className="col-span-1 md:col-span-4">
            <Label children={"Description"} />
            <MyCkEditor
              initData={request.description}
              onChange={(data) => setRequest({ ...request, description: data })}
            />
          </div>
        </div>
        <div className="flex justify-end py-2 ">
          <div>
            <Tooltip titleTooltip="Ctr + S to Save">
              <Button children={"Save"} onClick={SaveData} />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGardentPage;
