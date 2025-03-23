"use client";
import * as React from "react";

import { Draggable } from "@hello-pangea/dnd";

import { StrictModeDroppable } from "./strictmode";
import { MainContext } from "../../../context/MainContext";
import FieldItem from "./fieldItem";

export default function LeftPanel({ type }) {
  const context = React.useContext(MainContext);
  const { fields, setFields, isDragging, dataTranslate } = context;
  const pageTranslate = dataTranslate;
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
  const addFieldForm = (id, index, field) => {
    const dataCopy = field;
    const srcItems = true
      ? fields[
          typeFormElements.indexOf(field.type) != -1 ? "formElements" : type
        ]
      : remove(
          fields[
            typeFormElements.indexOf(field.type) != -1 ? "formElements" : type
          ],
          index
        );
    const destItems = appendAt(
      fields["fieldSelectedList"],
      0,
      true
        ? { ...dataCopy, id: Math.random() + "" }
        : fields[
            typeFormElements.indexOf(field.type) != -1 ? "formElements" : type
          ][index]
    );
    const tempFields = { ...fields };
    tempFields[
      typeFormElements.indexOf(field.type) != -1 ? "formElements" : type
    ] = srcItems;
    tempFields["fieldSelectedList"] = destItems;
    setFields({ ...tempFields });
  };
  return (
    <div className="p-2 h-[calc(100vh-50px)] relative border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] rounded-2xl">
      <div className={`p-0`}>
        <div className="px-2 dark:text-white/90!">Fields</div>
        <div
          className={`${
            isDragging ? "border-dashed border border-indigo-400 m-0" : ""
          }`}
        >
          <div className="p-2">
            <StrictModeDroppable droppableId={type}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div
                    className={`overflow-x-auto  min-h-[calc(10vh)] h-[355px] custom-scrollbar`}
                    //className={`overflow-x-auto  min-h-[calc(10vh)]`}
                  >
                    {fields["fields"].length > 0
                      ? fields["fields"].map((field, index) => {
                          if (field.isShow)
                            return (
                              <Draggable
                                key={field.id}
                                draggableId={field.id}
                                draggableProps={field}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <FieldItem
                                      field={field}
                                      key={Math.random()}
                                      id={field.id}
                                      index={index}
                                      addFieldForm={addFieldForm}
                                      pageTranslate={pageTranslate}
                                    />
                                    {/* <HoverDivWithIcon/> */}
                                  </div>
                                )}
                              </Draggable>
                            );
                        })
                      : !isDragging && (
                          <div className="flex-1 p-4 border-dashed border border-light-blue-500 mb-2 rounded-lg">
                            <h1 className="text-center text-gray-400 text-sm font-medium">
                              {pageTranslate.drop_fields_here_to_remove}
                            </h1>
                          </div>
                        )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </StrictModeDroppable>
          </div>
        </div>

        <div className=" w-full p-0 ">
          <div className="px-2 dark:text-white/90!">Form Elements</div>
          <div className="p-2">
            <StrictModeDroppable droppableId={"formElements"}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="map">
                    {fields["formElements"].map((element, index) => {
                      if (element.isShow)
                        return (
                          <Draggable
                            key={element.id}
                            draggableId={element.id}
                            draggableProps={element}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <FieldItem
                                  field={element}
                                  key={Math.random()}
                                  id={element.id}
                                  index={index}
                                  addFieldForm={addFieldForm}
                                  pageTranslate={pageTranslate}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                    })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </StrictModeDroppable>
          </div>
        </div>
      </div>
    </div>
  );
}
