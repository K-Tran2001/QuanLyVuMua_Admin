import React from "react";
import { SeachForm } from "../../../api/formService";
import { useNavigate, useParams } from "react-router";
import { MainContext } from "../../../context/MainContext";
import { addDataGoogleSheet } from "../../../api/ggSheet";
import ItemSubmitForm from "../EditForm/ItemSubmitForm";
import Button from "../../../components/ui/button/Button";

const FormSubmit = () => {
  const context = React.useContext(MainContext);
  const {
    headingForm,
    setHeadingForm,
    fields,
    setFields,
    getDataTranslate,
    dataTranslate,
  } = context;
  const { id } = useParams();
  const navigation = useNavigate();
  const type = "fieldSelectedList";
  const [dataToSave, setDataToSave] = React.useState({
    title: "",
    description: "",
    staus: "save",
    sheetId: "",
    linkSubmitForm: "",
    linkToGGSheet: "", //Link = https://docs.google.com/spreadsheets/d/<sheetId>/edit?gid=0#gid=0
    formDetail: [],
    headingForm,
    count: 0,
    userId: "",
  });
  console.log("dataToSave", dataToSave);

  const handleAddDataToSheet = async () => {
    const formDatab = new FormData();
    const request = {
      sheetId: dataToSave.sheetId,
      targetAPI: "addDataToSheet",
      //data: JSON.stringify(dataToSave.formDetail),
      data: JSON.stringify(fields[type]),
    };
    console.log("request", request);
    for (const key in request) {
      formDatab.append(key, request[key]);
    }
    const response = await addDataGoogleSheet(formDatab);
  };

  const LoadData = async () => {
    const dataReturn = await SeachForm(id, { formId: id });
    if (dataReturn.success) {
      setDataToSave(dataReturn.data);
      const allField = dataReturn.data.formDetail;
      setFields({
        ...fields,
        [type]: JSON.parse(allField),
      });
      setHeadingForm({
        ...headingForm,
        title: dataReturn.data.title,
      });
    }
  };
  React.useEffect(() => {
    getDataTranslate();
    console.log("id", id);

    if (id != "undefined" && id != null) LoadData();
  }, []);
  return (
    <div className="py-8 px-24 md:px-100">
      <div className="grid grid-cols-1 gap-4">
        <div className="mb-8 space-y-2">
          <h1 className="text-center text-2xl break-words whitespace-normal">
            {headingForm?.title}
          </h1>
          <h3 className="text-sm break-words whitespace-normal">
            {headingForm?.discription}
          </h3>
        </div>
        {fields[type].length > 0 &&
          fields[type].map((item) => (
            <ItemSubmitForm
              key={item.id}
              type={type}
              field={item}
              fields={fields}
              setFields={setFields}
            />
          ))}
      </div>

      <div className="flex justify-end py-4">
        <Button children={"Submit"} onClick={() => handleAddDataToSheet()} />
      </div>
    </div>
  );
};

export default FormSubmit;
