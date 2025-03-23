import * as React from "react";
import * as Ci from "react-icons/ci";
import * as Ai from "react-icons/ai";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import Radio from "../../../components/form/input/Radio";
import Checkbox from "../../../components/form/input/Checkbox";
import DropzoneComponent from "../../../components/form/form-elements/DropZone";

import DatePicker from "../../../components/form/input/DatePicker";

export default function ItemSubmitForm({ type, field, fields, setFields }) {
  console.log(fields[type]);

  return (
    <div className="space-y-8">
      {/* Item */}
      {field?.type == "file" ? (
        <div>
          <Label htmlFor={field?.id}>{field?.label}</Label>
          <DropzoneComponent />
        </div>
      ) : field?.type == "divider" ? (
        <div className="px-4 py-2 ">
          <div className="border border-t-1 border-gray-300 dark:border-gray-700 "></div>
        </div>
      ) : field?.type == "radio" || field?.type == "checkbox" ? (
        field?.type === "radio" ? (
          <Radio
            id={field.id}
            name="group1"
            value={field.value}
            checked={field.value}
            onChange={() => {
              const tempFields = fields[type];
              const index = tempFields.indexOf(field);
              const copyField = tempFields[index];
              copyField.value = !field.value;
              tempFields[index] = copyField;
              setFields({
                ...fields,
                fieldSelectedList: tempFields,
              });
            }}
            label={field?.label}
          />
        ) : (
          <div className="flex items-center gap-3">
            <Checkbox
              value={field.value}
              checked={field.value}
              onChange={() => {
                const tempFields = fields[type];
                const index = tempFields.indexOf(field);
                const copyField = tempFields[index];
                copyField.value = !field.value;
                tempFields[index] = copyField;

                setFields({
                  ...fields,
                  fieldSelectedList: tempFields,
                });
              }}
            />
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              {field?.label}
            </span>
          </div>
        )
      ) : field?.type == "heading" ? (
        <div className="space-y-2">
          <div className="text-lg break-words whitespace-normal">
            {field.title}
          </div>
          <div className="text-sm break-words whitespace-normal">
            {field?.description}
          </div>
        </div>
      ) : field?.type == "date" ? (
        <div>
          <Label htmlFor={field?.id}>{field?.label}</Label>
          <DatePicker />
        </div>
      ) : field?.type == "dropdown" || field?.type == "contactList" ? (
        <div>
          <Label htmlFor={field?.id}>{field?.label}</Label>
          <Select
            options={
              field?.values?.length > 0
                ? field.values.map((option) => ({
                    label: option,
                    value: option,
                  }))
                : []
            }
            placeholder="Select an option"
            onChange={(e) => {
              const tempFields = fields[type];
              const index = tempFields.indexOf(field);
              const copyField = tempFields[index];
              copyField.value = e;
              tempFields[index] = copyField;
              setFields({
                ...fields,
                fieldSelectedList: tempFields,
              });
            }}
            className="dark:bg-dark-900"
          />
        </div>
      ) : (
        <div>
          <Label htmlFor={field?.id}>{field?.label}</Label>
          <Input
            type={field?.type}
            id={field?.id}
            value={field.value}
            onChange={(e) => {
              const tempFields = fields[type];
              const index = tempFields.indexOf(field);
              const copyField = tempFields[index];
              copyField.value = e.target.value;
              tempFields[index] = copyField;
              setFields({
                ...fields,
                fieldSelectedList: tempFields,
              });
            }}
          />
        </div>
      )}

      {/* Item */}
    </div>
  );
}
