import React, { createContext, useContext, useState, useEffect } from "react";
import { Translate } from "../api/translate";

export const MainContext = createContext(undefined);

export const MainProvider = ({ children }) => {
  //fields
  const [fields, setFields] = React.useState({
    fields: [
      {
        id: "item-1",
        placeholder: "Text",
        label: "Text",
        key: "text",
        type: "text",
        typeName: "Text",
        title: "",
        discription: "",
        value: "",
        isShow: true,
        required: false,
      },
      {
        id: "item-2",
        placeholder: "Number",
        label: "Number",
        key: "number",
        type: "number",
        typeName: "Number",
        title: "",
        discription: "",
        value: 0,
        isShow: true,
        required: false,
      },
      {
        id: "item-3",
        placeholder: "Date",
        label: "Date",
        key: "date_of_birth",
        type: "date",
        typeName: "Date",
        title: "",
        discription: "",
        value: null,
        isShow: true,
        required: false,
      },
      {
        id: "item-4",
        placeholder: "Checkbox",
        label: "Checkbox",
        key: "checkbox",
        type: "checkbox",
        typeName: "Checkbox",
        title: "",
        discription: "",
        value: null,
        isShow: true,
        required: false,
      },
      {
        id: "item-5",
        placeholder: "Radio",
        label: "Radio",
        key: "radio",
        type: "radio",
        typeName: "Radio",
        title: "",
        discription: "",
        value: null,
        isShow: true,
        required: false,
      },
      {
        id: "item-6",
        placeholder: "Dropdown",
        label: "Dropdown",
        key: "dropdown",
        type: "dropdown",
        typeName: "Dropdown",
        title: "",
        discription: "",
        value: null,
        isShow: true,
        required: false,
      },
      // {
      //   id: "item-7",
      //   placeholder: "AutoNumber",
      //   label: "AutoNumber",
      //   key: "autoNumber",
      //   type: "autoNumber",
      //   typeName: "AutoNumber",
      //   title: "",
      //   discription: "",
      //   value: null,
      //   isShow: true,
      //   required: false,
      // },
    ],
    fieldSelectedList: [],
    formElements: [
      {
        id: "item-11",
        placeholder: "Heading / Description",
        label: "Heading",
        key: "heading",
        type: "heading",
        typeName: "Heading",
        title: "Heading",
        discription: "",
        value: "",
        isShow: true,
        required: false,
      },
      {
        id: "item-12",
        placeholder: "Divider",
        label: "Divider",
        key: "divider",
        type: "divider",
        typeName: "Divider",
        title: "",
        discription: "",
        value: "",
        isShow: true,
        required: false,
      },
      {
        id: "item-13",
        placeholder: "File Upload",
        label: "File Upload",
        key: "file_upload",
        type: "file",
        typeName: "File",
        title: "",
        discription: "",
        value: "",
        isShow: true,
        required: false,
      },
    ],
  });
  const [headingForm, setHeadingForm] = React.useState({
    title: "New Form",
    discription: "",
  });
  const [isDragging, setIsDragging] = React.useState(false);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const remove = (list, index) => {
    const result = [...list];
    result.splice(index, 1);
    return result;
  };
  const appendAt = (list, index, data) => {
    const result = [...list];
    result.splice(index, 0, data);
    return result;
  };
  function handleDragEnd(result) {
    setIsDragging(false);
    const src = result.source;
    const dest = result.destination;
    const conditionStop_1 =
      src.droppableId === "fields" && dest.droppableId === "formElements";
    const conditionStop_2 =
      src.droppableId === "formElements" && dest.droppableId === "fields";

    if (!dest || conditionStop_1 || conditionStop_2) {
      return;
    }

    if (src.droppableId === dest.droppableId) {
      // --- SAME CONTAINER ---
      const items = reorder(
        [...fields[src.droppableId]],
        src.index,
        dest.index
      );
      const tempFeilds = { ...fields };
      tempFeilds[src.droppableId] = items;
      setFields({ ...tempFeilds });
      if (fields[src.droppableId][src.index].id === currentField?.id) {
        dataCopy = fields[src.droppableId][src.index];
        setCurrentField({
          ...dataCopy,
          index: dest.index,
        });
      }
    } else {
      // --- DIFFERENT CONTAINER ---
      const isFormElement = ["heading", "divider", "file"].includes(
        fields[src.droppableId][src.index].type
      );
      var dataCopy = fields[src.droppableId][src.index];
      const srcItems =
        true && src.droppableId != "fieldSelectedList"
          ? fields[src.droppableId]
          : remove(fields[src.droppableId], src.index);
      const destItems =
        true && src.droppableId == "fieldSelectedList"
          ? fields[dest.droppableId]
          : appendAt(
              fields[dest.droppableId],
              dest.index,
              true
                ? { ...dataCopy, id: Math.random() + "" }
                : fields[src.droppableId][src.index]
            );
      const tempFields = { ...fields };
      tempFields[src.droppableId] = srcItems;
      tempFields[dest.droppableId] = destItems;
      setFields({ ...tempFields });
    }
  }
  var options = [
    { disable: false, value: "text", label: "Text" },
    { disable: false, value: "number", label: "Number" },
    { disable: false, value: "date", label: "Datetime" },
    { disable: false, value: "checkbox", label: "Checkbox" },
    { disable: false, value: "radio", label: "Radio" },
    { disable: false, value: "dropdown", label: "Dropdown" },
    //{ disable: false, value: "autoNumber", label: "AutoNumber" },
    //{ disable: false, value: "contactList", label: "Contact list" },
    //   { disable: false, value: "createdDate", label: "Created date" },
    //   { disable: false, value: "createdBy", label: "Created by" },
    //   { disable: false, value: "updatedDate", label: "Updated date" },
    //   { disable: false, value: "updatedBy", label: "Updated by" },
  ];
  const lengthOptions = [
    { value: "1", label: "0" },
    { value: "2", label: "00" },
    { value: "3", label: "000" },
    { value: "4", label: "0000" },
    { value: "5", label: "00000" },
    { value: "6", label: "000000" },
  ];
  const hideFieldList = [
    "createdDate",
    "createdBy",
    "updatedDate",
    "updatedBy",
    "duration",
  ];
  const disableRequiredFieldList = [
    "createdDate",
    "createdBy",
    "updatedDate",
    "updatedBy",
    "checkbox",
    "radio",
    "heading",
    "headingForm",
    "divider",
    "file",
    "autoNumber",
  ];
  //modal
  const [isEdit, setIsEdit] = React.useState(false);
  //translate
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataTranslate, setDataTranslate] = React.useState({});
  async function getDataTranslate() {
    setIsLoading(true);
    const request = {
      source_lang: "en",
      target_lang: localStorage.getItem("prefered_local") || "en",
      click_here_to_open_form_editor: "Click here to open form editor !",
      back: "Back",
      new_survey: "New Survey",
      open_form: "Open Form",
      save_form: "Save Form",
      fields: "Fields",
      remove_all: "Remove All",
      add_all: "Add All",
      age: "Age",
      name: "Name",
      date_of_birth: "DateOfBirth",
      new_field: "New Field",
      form_elements: "Form Elements",
      heading: "Heading",
      divider: "Divider",
      file_upload: "File Upload",
      field: "Field",
      field_settings: "Field Settings",
      logic: "Logic",
      label: "Label",
      field_settings: "Field Settings",
      help_text: "Help Text",
      discription: "Discription",
      required: "Required",
      hidden: "Hidden",
      validation: "Validation",
      number_only: "Number Only",
      percentage: "Percentage",
      email: "Email",
      phone: "Phone",
      no_validation: "No Validation",
      display_as: "Display As",
      sigle_line_text_box: "Single-line text box",
      multi_line_text_box: "Multi-line text box",
      default_value: "Default Value",
      click_to_upload: "Click to upload",
      or_drag_and_drop: "or drag and drop",
      take_a_photo: "Take A Photo",
      get_file_from_your_device: "Get File From Your Device",
      drop_fields_here_to_remove: "Drop fields here to remove",
      drop_fields_here: "Drop fields here",
      primary_field: "Primary Field",
      submit: "Submit",
      edit_field: "Edit Field",
      field_name: "Field Name",
      field_type: "Field Type",
      add: "Add",
      edit: "Edit",
      exit: "Exit",
      enter_a_field_name: "Enter a field name",
      please_allow_the_camera_to_access_the_app: `Please "Allow" the camera to access the app!`,
      save_success: "Save Success!",
      form_title: "Form title",
      title: "Title",
      values: "Values",
      prefix: "Prefix",
      suffix: "Suffix",
      required: "Required",
      length: "Length",
      defaultValue: "Default Value",
      form_data_not_found: "Form data not found!",
      confirm: "Confirm",
      do_you_want_to_open_the_form: "Do you want to open the form?",
      yes: "Yes",
      no: "No",
      cancel: "Cancel",
      contact_us: "Contact Us",
      save: "Save",
      preview: "Preview",
      preview_form: "Preview Form",
      click_to_upload: "Click to upload",
      or_drag_and_drop: "or drag and drop",
      take_a_photo: "Take A Photo",
      get_file_from_your_device: "Get File From Your Device",
      click_to_take_a_photo: "Click to take a photo",
      take_a_photo_again: "Take a photo again",
      submit: "Submit",
      result_saved: "Result saved",
      form_data_not_found: "Form data not found!",
    };
    const formDatab = new FormData();

    for (const key in request) {
      formDatab.append(key, request[key]);
    }
    const response = await Translate(formDatab);
    if (response.success) {
      setDataTranslate(response.data);
    }
  }
  //drawer
  const [drawer, setDrawer] = React.useState({
    isOpen: false,
    position: "rightDrawer",
    onConfirm: () => {},
  });

  return (
    <MainContext.Provider
      value={{
        fields,
        setFields,
        isDragging,
        setIsDragging,
        headingForm,
        setHeadingForm,
        options,
        getDataTranslate,
        dataTranslate,
        setDataTranslate,
        drawer,
        setDrawer,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
