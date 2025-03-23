import * as React from "react";
import * as Ci from "react-icons/ci";
import * as Ai from "react-icons/ai";
import Label from "../../../components/form/Label";

import Radio from "../../../components/form/input/Radio";
import Checkbox from "../../../components/form/input/Checkbox";
import DropzoneComponent from "../../../components/form/form-elements/DropZone";
import { CalenderIcon } from "../../../../src/icons";
import { ChevronDownIcon } from "../../../../src/icons";

export default function ItemForm_2({
  field,
  handleDelete,
  handleEdit,
  setCurrentField,
  index,
  pageTranslate,
}) {
  return (
    <div
      className="mb-4 border-gray-200 border-dashed border border-light-blue-500 dark:text-white/90! dark:bg-black dark:border dark:border-gray-800 px-4 md:px-8 py-4  bg-gray-50 bg-gray-50 rounded-lg hover:shadow-md"
      key={Math.random()}
      onClick={() => setCurrentField({ ...field, index: index })}
    >
      <div className="relative flex-1 translate-y-[-0rem] translate-x-[0.5rem]">
        <div className="absolute flex justify-end space-x-2 right-0 -translate-y-3 translate-x-5">
          <button
            className=" w-6 h-6  flex justify-center items-center rounded-lg cursor-pointer bg-blue-400 text-black dark:bg-black dark:text-white"
            onClick={handleEdit}
          >
            <Ci.CiEdit className="w-4 h-4 " />
          </button>
          <button
            className=" w-6 h-6  flex justify-center items-center rounded-lg cursor-pointer bg-red-200 text-black dark:bg-black dark:text-white"
            onClick={handleDelete}
          >
            <Ai.AiOutlineDelete className="w-4 h-4 " />
          </button>
        </div>
      </div>
      {/* Item */}
      {field?.type == "file" ? (
        <div>
          <Label htmlFor={field?.id}>{field?.label}</Label>
          <DropzoneComponent readOnly={true} />
        </div>
      ) : field?.type == "heading" ? (
        <div className="">
          <div className="text-lg truncate">{field.title}</div>
          <div className="text-sm truncate">{field?.description}</div>
        </div>
      ) : field?.type == "divider" ? (
        <div className="p-4 ">
          <div className="border border-t-1 border-gray-300 dark:border-gray-700 "></div>
        </div>
      ) : field?.type == "radio" || field?.type == "checkbox" ? (
        field?.type === "radio" ? (
          <Radio
            id="radio1"
            name="group1"
            value="option1"
            checked={true}
            onChange={() => {}}
            label={field?.label}
          />
        ) : (
          <div className="flex items-center gap-3">
            <Checkbox checked={true} onChange={() => {}} />
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              {field?.label}
            </span>
          </div>
        )
      ) : field?.type == "dropdown" || field?.type == "contactList" ? (
        <div>
          <Label htmlFor={field?.id}>{field?.label}</Label>
          <div className=" h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800">
            <div className="flex justify-between items-center">
              <div className=" text-gray-500  pointer-events-none  dark:text-gray-400">
                Select an option
              </div>
              <div>
                <span className=" text-gray-500  pointer-events-none  dark:text-gray-400">
                  <ChevronDownIcon className="size-5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Label htmlFor={field?.id}>{field?.label}</Label>
          {/* <Input type={field?.type} id={field?.id} readOnly={true} /> */}
          <div className=" h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800">
            {field?.type === "date" && (
              <div className="flex justify-between items-center">
                <div>dd/mm/yyyy</div>
                <div>
                  <span className=" text-gray-500  pointer-events-none  dark:text-gray-400">
                    <CalenderIcon className="size-5" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Item */}
    </div>
  );
}
