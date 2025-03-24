import React, { useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { MainContext } from "../../context/MainContext";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";

const TranslatePage = () => {
  const context = React.useContext(MainContext);
  const { dataTranslate, getDataTranslate } = context;
  useEffect(() => {
    getDataTranslate();
  }, []);

  console.log(context);

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
      </div>
    </div>
  );
};

export default TranslatePage;
