import React, { useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { MainContext } from "../../context/MainContext";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import ReOrder from "../../components/drop-drag/re-order/ReOrder";
import DropDrag from "../../components/drop-drag/drop-drag/DropDrag";

const TranslatePage = () => {
  const context = React.useContext(MainContext);
  const { dataTranslate, getDataTranslate } = context;
  useEffect(() => {
    getDataTranslate();
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Page translate" preLink="" />

      <div className="min-h-[calc(100vh-180px)] max-h-[calc(100vh + 300px)] overflow-y-hidden custom-scrolbar  rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="mb-2">
          <Label children={dataTranslate["label"]} />
          <Input />
        </div>
        <div className="mb-2">
          <Label children={dataTranslate["file_upload"]} />
          <FileInput />
        </div>
        <Button children={dataTranslate["save_form"]} />
        <ReOrder
          header="Re-Order"
          initValue={[
            {
              id: 1,
              name: "item1",
            },
            {
              id: 2,
              name: "item2",
            },
            {
              id: 3,
              name: "item3",
            },
            {
              id: 4,
              name: "item4",
            },
            {
              id: 5,
              name: "item5",
            },
            {
              id: 6,
              name: "item6",
            },
            {
              id: 7,
              name: "item7",
            },
            {
              id: 8,
              name: "item8",
            },
            {
              id: 9,
              name: "item9",
            },
          ]}
          onDrag={(e) => {
            console.log(e);
          }}
          direction="vertical"
          classNameForContainer={""}
          classNameForHeader={"text-lg font-bold"}
          classNameForGroup={"space-y-2 "}
          renderItem={(item, index) => (
            <div className="w-full py-4 bg-red-500 text-white text-center">
              {index + 1}. {item.name}
            </div>
          )}
        />
        <h2 className="font-bold text-lg mt-4">DropDrag</h2>
        <DropDrag
          initValue={[
            {
              id: 1,
              name: "item1",
            },
            {
              id: 2,
              name: "item2",
            },
            {
              id: 3,
              name: "item3",
            },
          ]}
          listHeader={["Nhóm 1", "Nhóm 2", "Nhóm 3"]}
          onDrag={(e) => {
            console.log(e);
          }}
          classNameForContainer={" text-center"}
          classNameForHeader={
            "bg-gray-500 p-4 flex items-center justify-between"
          }
          classNameForBlock={"bg-gray-100 hover:shadow-lg"}
          classNameForGroup={"space-y-2 p-4"}
          //classNameForItem={"w-full py-4 bg-red-500 text-white "}
          renderItem={(item, index) => (
            <div className="flex text-center  w-full py-4  bg-yellow-200 ">
              <div className="flex-1 text-black ">
                {index + 1}. {item.name}
              </div>
            </div>
          )}
          hasDeleteButton={true}
          hasAddNewButton={true}
        />
      </div>
    </div>
  );
};

export default TranslatePage;
