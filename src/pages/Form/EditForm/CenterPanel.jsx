import * as React from "react";
import * as Bs from "react-icons/bs";
import { Draggable } from "@hello-pangea/dnd";

import ItemForm from "./ItemForm_2";
import Modal from "./Modal";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Switch from "../../../components/form/switch/Switch";
import CheckboxList from "../../../components/form/form-elements/CheckboxList";
import { MainContext, MainProvider } from "../../../context/MainContext";
import TextArea from "../../../components/form/input/TextArea";
import Button from "../../../components/ui/button/Button";
import {
  addDataGoogleSheet,
  createGoogleSheet,
  testRequest,
} from "../../../api/ggSheet";
import ItemSubmitForm from "./ItemSubmitForm";
import { SaveForm, SeachForm, UpdateForm } from "../../../api/formService";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { StrictModeDroppable } from "./StrictModeDroppable";

export default function CenterPanel({ type }) {
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
  const pageTranslate = dataTranslate;
  const [isEdit, setIsEdit] = React.useState(false);
  const [currentField, setCurrentField] = React.useState({});
  const [error, setError] = React.useState(false);
  const [mode, setMode] = React.useState("edit");
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [visibleModalEditHeading, setVisibleModalEditHeading] =
    React.useState(false);
  const [visibleModalPreview, setVisibleModalPreview] = React.useState(false);
  const typeFormElements = ["heading", "divider", "file"];
  const appendAt = (list, index, data) => {
    const result = [...list];
    result.splice(index, 0, data);
    return result;
  };
  const remove = (list, index) => {
    const result = [...list];
    result.splice(index, 1);
    return result;
  };
  const handleRemoveField = (id, index) => {
    const srcItems = remove(fields[type], index);
    const destItems = true
      ? fields[
          typeFormElements.indexOf(fields[type][index].type) != -1
            ? "formElements"
            : "fields"
        ]
      : appendAt(
          fields[
            typeFormElements.indexOf(fields[type][index].type) != -1
              ? "formElements"
              : "fields"
          ],
          0,
          fields[type][index]
        );

    const tempFields = { ...fields };
    tempFields[type] = srcItems;
    tempFields[
      typeFormElements.indexOf(fields[type][index].type) != -1
        ? "formElements"
        : "fields"
    ] = destItems;
    setFields({ ...tempFields });
  };
  const handleAddField = () => {
    var copyData = {
      ...currentField,
    };
    if (currentField.label != "") {
      const tempFields = { ...fields };
      const oldFields = tempFields[type];
      const newFields = [...oldFields, copyData];
      tempFields[type] = newFields;
      setFields({ ...tempFields });
      setVisibleModal(false);

      setError(false);
    } else {
      setError(true);
    }
  };
  console.log("type", type);
  const handleUpdateField = () => {
    var copyData = {
      ...currentField,
    };
    if (currentField.label != "") {
      const tempFields = { ...fields };
      const oldFields = tempFields["fieldSelectedList"];
      oldFields[copyData.index] = copyData;
      setFields({ ...fields, fieldSelectedList: oldFields });
      setVisibleModal(false);
      setCurrentField(!hideFieldList.includes(copyData.type) ? copyData : {});
      setError(false);
    } else {
      setError(true);
    }
  };

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
  const handleSaveForm = async () => {
    try {
      const formDatab = new FormData();
      const request = {
        targetAPI: "createSheet",
        sheetName: headingForm.title,
      };
      for (const key in request) {
        formDatab.append(key, request[key]);
      }
      const response = await createGoogleSheet(formDatab);
      if (response.success === true) {
        const sheetId = response.data.sheetId;

        var newDataToSave = {
          ...dataToSave,
          title: headingForm.title,
          discription: headingForm.discription,
          sheetId,
          linkSubmitForm: "",
          linkToGGSheet: `https://docs.google.com/spreadsheets/d/${sheetId}/edit?gid=0#gid=0`, //Link = https://docs.google.com/spreadsheets/d/<sheetId>/edit?gid=0#gid=0
          formDetail: JSON.stringify(fields[type]),
          count: 0,
          userId: "khoatranvan",
        };
        console.log("newDataToSave", newDataToSave);

        setDataToSave(newDataToSave);
        var dataReturn = await SaveForm(newDataToSave);
        if (dataReturn.success) {
          navigation("/forms");
          toast.success("Save Success!");
        }
      }
    } catch (error) {
      console.error("Error creating sheet:", error);
      alert("Failed to create sheet!");
    }
  };

  const handleUpdateForm = async () => {
    var newDataToSave = {
      ...dataToSave,
      title: headingForm.title,
      discription: headingForm.discription,
      formDetail: JSON.stringify(fields[type]),
      count: 0,
      userId: "khoatranvan",
    };

    setDataToSave(newDataToSave);
    var dataReturn = await UpdateForm(id, newDataToSave);

    if (dataReturn.success) {
      navigation("/forms");
      toast.success("Update Success!");
    }
  };

  const handleAddDataToSheet = async () => {
    const formDatab = new FormData();
    const request = {
      sheetId: dataToSave.sheetId,
      targetAPI: "addDataToSheet",
      data: JSON.stringify(dataToSave.formDetail),
    };
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
    <div className="border border-gray-200 dark:bg-black dark:border-gray-800 dark:bg-white/[0.03] rounded-2xl bg-white h-[calc(100vh-50px)] overflow-x-auto  custom-scrollbar relative">
      {/*  */}

      <div className="space-y-1 z-100  dark:bg-black dark:border-gray-800 dark:text-white absolute  rounded-lg border border-gray-300 gap-2 p-1 m-2">
        <div>
          <Button
            className={`w-full `}
            variant={mode === "edit" ? "primary" : "outline"}
            children="Edit"
            size="sm"
            onClick={() => setMode("edit")}
          />
        </div>
        <div>
          <Button
            className={`w-full `}
            variant={mode === "edit" ? "outline" : "primary"}
            children="Preview"
            size="sm"
            onClick={() => {
              setMode("preview");
              setVisibleModalPreview(true);
            }}
          />
        </div>
      </div>
      <div className=" z-100  dark:bg-black dark:border-gray-800 dark:text-white absolute   gap-2  m-2 right-0">
        {id != "undefined" && id != null ? (
          <Button children="Update" size="sm" onClick={handleUpdateForm} />
        ) : (
          <Button children="Save" size="sm" onClick={handleSaveForm} />
        )}
      </div>

      {/*  */}
      <div className="p-8 space-2">
        {fields[type].length > 0 && (
          <div
            className="mt-8 px-32"
            onClick={() => {
              setCurrentField(headingForm);
              setVisibleModalEditHeading(true);
            }}
          >
            <div className="hover:shadow-lg rounded-lg px-8 py-2">
              <h1 className="text-titleForm font-medium text-gray_800 text-center truncate">
                {headingForm?.title}
              </h1>
              <h3 className="text-discriptionForm font-medium text-gray_800 truncate">
                {headingForm?.discription}
              </h3>
            </div>
          </div>
        )}
        <StrictModeDroppable droppableId={type}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className=" rounded-lg px-0 md:px-32 py-4  min-h-[60vh]">
                {fields[type]?.map((field, index) => {
                  if (field.isShow)
                    return (
                      <Draggable
                        key={field?.id}
                        draggableId={field?.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ItemForm
                              field={field}
                              index={index}
                              setCurrentField={setCurrentField}
                              handleDelete={() =>
                                handleRemoveField(field?.id, index)
                              }
                              handleEdit={() => {
                                setCurrentField(field);
                                setIsEdit(true);
                                setVisibleModal(true);
                              }}
                              pageTranslate={pageTranslate}
                              fields={fields}
                              currentField={currentField}
                              setFields={setFields}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                })}
                {provided.placeholder}
                {fields[type].length > 0 ? (
                  <div className="flex justify-center">
                    <button
                      className="w-6 h-6 bg-blue-100 flex justify-center items-center rounded-lg"
                      onClick={() => {
                        setIsEdit(false);
                        setCurrentField({
                          id: Math.random().toString(),
                          label: "Text",
                          type: "text",
                          isShow: true,
                          required: false,
                        });
                        setVisibleModal(true);
                      }}
                    >
                      <Bs.BsPlusSquare className="w-4 h-4 text-blue-500" />
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 p-6  border-dashed border border-gray-500 rounded-lg">
                    <h1 className="text-center text-gray-400 text-sm font-medium">
                      {pageTranslate?.drop_fields_here}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          )}
        </StrictModeDroppable>
      </div>
      <Modal
        isOpen={visibleModal}
        setIsOpen={setVisibleModal}
        title={isEdit ? "Edit field" : "Add field"}
        onConfirm={() => {
          isEdit ? handleUpdateField() : handleAddField();
          setVisibleModal(false);
        }}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-4">
            <div>
              <Label children={"Field name"} />
              <Input
                readOnly={currentField?.type === "heading"}
                value={currentField.label}
                onChange={(e) =>
                  setCurrentField({ ...currentField, label: e.target.value })
                }
              />
            </div>
            {currentField?.type !== "heading" && (
              <div>
                <Label children={"Field type"} />
                <CheckboxList
                  currentField={currentField}
                  setCurrentField={setCurrentField}
                />
              </div>
            )}
          </div>
          <div>
            {currentField?.type === "heading" && (
              <div>
                <Label children={"Title"} />
                <TextArea
                  value={currentField?.title}
                  onChange={(e) =>
                    setCurrentField({ ...currentField, title: e })
                  }
                />
              </div>
            )}
            {(currentField.type === "dropdown" ||
              currentField.type === "contactList") && (
              <div>
                <Label children={"Values (,)"} />
                <TextArea
                  onChange={(e) => {
                    var options = e?.split(",");
                    console.log(e);

                    setCurrentField({
                      ...currentField,
                      values: options,
                    });
                  }}
                  value={
                    currentField?.values?.length > 0
                      ? currentField?.values?.join(",")
                      : ""
                  }
                />
              </div>
            )}
            {currentField?.type !== "heading" && (
              <div>
                <Label children={"Required"} />
                <div className="py-4">
                  <Switch
                    label=""
                    defaultChecked={currentField.required}
                    onChange={(e) =>
                      setCurrentField({
                        ...currentField,
                        required: e,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
          {currentField?.type === "heading" && (
            <div className="col-span-2">
              <Label children={"Description"} />
              <TextArea
                value={currentField?.description}
                onChange={(e) =>
                  setCurrentField({ ...currentField, description: e })
                }
              />
            </div>
          )}
        </div>
      </Modal>
      <Modal
        isOpen={visibleModalEditHeading}
        setIsOpen={setVisibleModalEditHeading}
        title={"Edit heading"}
        onConfirm={() => setVisibleModalEditHeading(false)}
      >
        <div className="grid grid-cols-1 gap-2">
          <div>
            <Label children={"Title"} />
            <TextArea
              value={headingForm?.title}
              onChange={(e) => {
                setHeadingForm({ ...headingForm, title: e });
                setDataToSave({
                  ...dataToSave,
                  headingForm: { ...headingForm, title: e },
                });
              }}
            />
          </div>
          <div>
            <Label children={"Discription"} />
            <TextArea
              value={headingForm.discription}
              onChange={(e) => {
                setHeadingForm({ ...headingForm, discription: e });
                setDataToSave({
                  ...dataToSave,
                  headingForm: { ...headingForm, discription: e },
                });
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={visibleModalPreview}
        setIsOpen={() => {
          setVisibleModalPreview(false);
          setMode("edit");
        }}
        title={"View form"}
        onConfirm={() => {
          setVisibleModalPreview(false);
          handleAddDataToSheet();
          setMode("edit");
        }}
        textButtomConfirm="Demo save data to sheet"
        //hiddenButtomConfirm={true}
      >
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
      </Modal>
    </div>
  );
}
