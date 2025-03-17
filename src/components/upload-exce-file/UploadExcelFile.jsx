import React from "react";
import * as XLSX from "xlsx";
import { ImportPlant } from "../../api/plantService";
import { toast } from "react-toastify";
import Modal from "../modal/Modal";
import Label from "../form/Label";
import FileInput from "../form/input/FileInput";
import Select from "../form/Select";
import InputNumber from "../form/input/InputNumberField";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

const UploadExcelFile = ({
  isOpen,
  setIsOpen,
  initData,
  onChange,
  ImportData,
  DowloadTemplate,
}) => {
  const DEFAULT_CONTENT_FILE = {
    fileName: "",
    sheetName: "",
    fromRow: 0,
    toRow: 0,
    maxRow: 0,
  };
  const startRow = 1;
  //  const [requestImport, setRequestImport] = React.useState();
  const [contentFile, setContentFile] = React.useState(DEFAULT_CONTENT_FILE);
  const [dataWorkBook, setDataWorkBook] = React.useState({});
  const [sheetNameArray, setSheetNameArray] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState();
  function onDownloadTemplate(hrefFile) {
    if (hrefFile?.length > 0) {
      // eslint-disable-next-line no-undef
      const currentUrl = process.env.REACT_APP_PUBLIC_URL;
      const fileUrl = currentUrl + "/" + hrefFile; // Replace with your file URL

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = hrefFile.substring(hrefFile.lastIndexOf("/") + 1); // Replace with the excel filename
      link.click();
    } else
      toast({
        title: "Thất bại.",
        description: "Không tìm thấy template!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
  }
  const handleFileUpload = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          // Get the name of the first sheet
          const firstSheetName = workbook.SheetNames[0];

          // List all sheets
          const allSheetNames = workbook.SheetNames;

          // Continue with your other logic
          const sheetName = firstSheetName;
          const worksheet = workbook.Sheets[sheetName];
          const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setDataWorkBook(workbook);
          setSheetNameArray(
            allSheetNames.length > 0
              ? allSheetNames.map((item, index) => ({
                  value: item,
                  label: item,
                }))
              : []
          );
          var dataComtentFile = {
            sheetName: sheetName,
            fileName: file.name,
            fromRow: startRow,
            toRow: sheetData.length - 1,
            maxRow: sheetData.length - 1,
          };
          setContentFile(dataComtentFile);

          setSelectedFile(file);
          onChange({
            files: file,
            ...dataComtentFile,
          });
        };
      }
    }
  };

  function onChangeSheetName(sheetName) {
    const worksheet = dataWorkBook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // Handle the sheet data as desired
    var dataContentFile = {
      ...contentFile,
      sheetName: sheetName,
      fromRow: startRow,
      toRow: sheetData.length,
      maxRow: sheetData.length,
    };
    setContentFile(dataContentFile);
    onChange({
      ...initData,
      ...dataContentFile,
    });
  }

  // const ImportData = async () => {
  //   if (selectedFile == null) {
  //     return;
  //   }
  //   //var formData = jsonToFormData(requestImport);
  //   var formData = new FormData();
  //   formData.append("files", selectedFile);
  //   // formData.append("sheetName", contentFile.sheetName);
  //   // formData.append("fromRow", contentFile.fromRow);
  //   // formData.append("toRow", contentFile.toRow);

  //   ImportPlant(formData)
  //     .then((response) => {
  //       if (response.success) {
  //         if (response.data.failed === 0) {
  //           toast.success("Import successful !");
  //         } else {
  //           window.location.href = response.data.URL_dowloadFailed;
  //           toast.success(
  //             `Import is successful but your import file has ${response.data.failed} wrong lines!`
  //           );
  //         }
  //       } else {
  //         window.location.href = response.data.URL_dowloadFailed;
  //         toast.error("Import failed !");
  //       }
  //       setIsOpen(false);
  //     })
  //     .catch((err) => {})
  //     .finally(() => {});
  // };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        setContentFile(DEFAULT_CONTENT_FILE);
      }}
      title={"Import data from Excel file"}
      onConfirm={() => {
        onChange({
          files: selectedFile,
          ...contentFile,
        });
        ImportData();
        //setIsOpen(false);
      }}
      hiddenButtomConfirm={false}
      textButtomConfirm="Import"
    >
      <div className="grid grid-cols-1 gap-4 text-lg">
        <div>
          <Label children={"Name"} />
          <FileInput accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-2">
          <div className="col-span-2 md:col-span-3">
            <Label children={"Sheet Name"} />
            <Select
              defaultValue={contentFile.sheetName}
              options={
                sheetNameArray?.length > 0
                  ? sheetNameArray.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))
                  : []
              }
              placeholder="Select an option"
              onChange={(e) => {
                const selectedValue = e.target.value;
                // Find the selected option based on the value
                const selectedOption = sheetNameArray.find(
                  (option) => option.value === selectedValue
                );
                if (selectedOption) {
                  const selectedLabel = selectedOption.label;
                  onChangeSheetName(selectedLabel);
                }
              }}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <Label children={"From Row"} />
            <Input
              type="number"
              value={contentFile?.fromRow > 0 ? contentFile?.fromRow : ""}
              onChange={(e) => {
                var value = e.target.value;
                if (value !== undefined) {
                  if (value !== contentFile.fromRow) {
                    if (contentFile.fileName.length > 0) {
                      setContentFile({
                        ...contentFile,
                        fromRow: value,
                      });
                      onChange({
                        ...initData,
                        fromRow: value,
                      });
                    } else toast.error("Vui lòng chọn file");
                  }
                } else {
                  setContentFile({
                    ...contentFile,
                    fromRow: 0,
                  });
                  onChange({
                    ...initData,
                    fromRow: 0,
                  });
                }
              }}
            />
          </div>
          <div>
            <Label children={"To Row"} />
            <Input
              type="number"
              value={contentFile?.toRow > 0 ? contentFile?.toRow : ""}
              onChange={(e) => {
                var value = e.target.value;

                if (value !== undefined) {
                  if (value !== contentFile.toRow) {
                    if (contentFile.fileName.length > 0) {
                      setContentFile({
                        ...contentFile,
                        toRow: value,
                      });
                      onChange({
                        ...initData,
                        toRow: value,
                      });
                    } else toast.error("Vui lòng chọn file");
                  }
                } else {
                  setContentFile({
                    ...contentFile,
                    toRow: 0,
                  });
                  onChange({
                    ...initData,
                    toRow: 0,
                  });
                }
              }}
            />
          </div>
        </div>
        <div>
          <Button
            variant="excel"
            children={"Dowload template"}
            onClick={onDownloadTemplate}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UploadExcelFile;
