import React, { useEffect, useState } from "react";
import { StrictModeDroppable } from "../StrictModeDroppable";
import { DragDropContext, Draggable } from "@hello-pangea/dnd";
import VariantModal from "../../modal/VariantModal";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import { drop } from "lodash";
import { PlusIcon } from "../../../icons";

const DropDrag = ({
  initValue = null,
  listHeader = [],
  classNameForContainer = null,
  classNameForBlock = null,
  classNameForHeader = null,
  classNameForGroup = null,
  classNameForItem = null,
  renderItem,
  onDrag,
  hasDeleteButton = false,
  hasAddNewButton = false,
  direction = "vertical",
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [droppableId, setDroppableId] = useState({});
  const REQUEST_INIT = { name: "" };
  const [errors, setErrors] = useState([]);
  const [request, setRequest] = useState(REQUEST_INIT);
  const onValidate = () => {
    if (request?.name?.length === 0) {
      setErrors([...errors, "name"]);
      return false;
    }
    return true;
  };

  const [fields, setFields] = useState([]);
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
    const src = result.source;
    const dest = result.destination;

    if (!dest) return; // xử lý nếu kéo ra ngoài drop area

    if (src.droppableId === dest.droppableId) {
      // --- SAME CONTAINER ---
      const items = reorder(
        [...fields[src.droppableId]],
        src.index,
        dest.index
      );
      const tempFields = { ...fields };
      tempFields[src.droppableId] = items;
      onDrag(tempFields);
      setFields(tempFields);
    } else {
      // --- DIFFERENT CONTAINER ---
      const dataCopy = fields[src.droppableId][src.index];

      const srcItems = remove(fields[src.droppableId], src.index);

      const destItems = appendAt(
        fields[dest.droppableId],
        dest.index,
        dataCopy
      );

      const tempFields = { ...fields };
      tempFields[src.droppableId] = srcItems;
      tempFields[dest.droppableId] = destItems;
      onDrag(tempFields);
      setFields(tempFields);
    }
  }

  function handleDeleteItem(droppableId, list, index) {
    var updateList = remove(list, index);
    const tempFields = {
      ...fields,
      [droppableId]: updateList,
    };
    setFields(tempFields);
    onDrag(tempFields);
  }
  function handleAddItem(droppableId, data) {
    if (!onValidate()) {
      return;
    }

    var updateList = appendAt(fields[droppableId], 0, data);
    const tempFields = {
      ...fields,
      [droppableId]: updateList,
    };
    setFields(tempFields);
    onDrag(tempFields);
    setVisibleModal(false);
    setErrors([]);
  }
  function handleUpdateItem(droppableId, index, data) {
    if (!onValidate()) {
      return;
    }
    var copyList = fields[droppableId];
    copyList[index] = data;
    const tempFields = {
      ...fields,
      [droppableId]: copyList,
    };
    setFields(tempFields);
    onDrag(tempFields);
    setVisibleModal(false);
    setErrors([]);
  }

  useEffect(() => {
    if (Array.isArray(initValue) && listHeader?.length > 0) {
      var newFields = Object.fromEntries(listHeader.map((name) => [name, []]));
      if (initValue) {
        newFields[listHeader[0].toString()] = initValue;
      }
      onDrag(newFields);
      setFields(newFields);
    } else {
      //typeof initValue === 'object' && initValue !== null
      onDrag(initValue);
      setFields(initValue);
    }
  }, [initValue]);

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={(e) => {}}>
        <div
          className={`flex w-full ${
            classNameForContainer ? classNameForContainer : ""
          }`}
        >
          {Object.keys(fields).length > 0 &&
            Object.keys(fields).map((key) => {
              const items = fields[key];

              return (
                <div
                  key={key}
                  className={`w-full ${
                    classNameForBlock ? classNameForBlock : ""
                  }`}
                >
                  <div
                    className={` ${
                      classNameForHeader ? classNameForHeader : ""
                    }`}
                  >
                    {key}
                    {hasAddNewButton && (
                      <div
                        className="cursor-pointer   text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8   inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          setDroppableId({ index: 0, droppableId: key });
                          setIsAddNew(true);
                          setRequest(REQUEST_INIT);
                          setVisibleModal(true);
                        }}
                      >
                        <PlusIcon />
                      </div>
                    )}
                  </div>
                  <StrictModeDroppable droppableId={key} direction={direction}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div
                          className={`min-h-[60vh] ${
                            direction == "horizontal" ? "flex" : ""
                          } ${classNameForGroup ? classNameForGroup : ""}`}
                        >
                          {items?.length > 0 &&
                            items.map((field, index) => {
                              return (
                                <Draggable
                                  key={field?.id}
                                  draggableId={field?.id.toString()}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`relative transition-all duration-300 ease-linear
                              ${
                                snapshot.isDragging
                                  ? "scale-[1.2] "
                                  : "shadow-md"
                              }
                              `}
                                    >
                                      {hasDeleteButton && (
                                        <div
                                          className="absolute   right-0 "
                                          onClick={() => {
                                            handleDeleteItem(key, items, index);
                                          }}
                                        >
                                          <div className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8   inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                                            <svg
                                              className="w-3 h-3"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 14 14"
                                            >
                                              <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                              />
                                            </svg>
                                            <span className="sr-only">
                                              Close menu
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                      <div
                                        className={` ${
                                          classNameForItem
                                            ? classNameForItem
                                            : ""
                                        }`}
                                        onDoubleClick={() => {
                                          setRequest(field);
                                          setIsAddNew(false);
                                          setDroppableId({
                                            index: index,
                                            droppableId: key,
                                          });
                                          setVisibleModal(true);
                                        }}
                                      >
                                        {renderItem(field, index)}
                                      </div>
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
              );
            })}
        </div>
      </DragDropContext>
      <VariantModal
        isOpen={visibleModal}
        setIsOpen={setVisibleModal}
        onClose={() => {
          setVisibleModal(false);
          setErrors([]);
          setRequest(REQUEST_INIT);
        }}
        title={isAddNew ? "New Item" : "Update Item"}
        onConfirm={() => {
          isAddNew
            ? handleAddItem(droppableId.droppableId, {
                ...request,
                id: Math.random(),
              })
            : handleUpdateItem(
                droppableId.droppableId,
                droppableId.index,
                request
              );
        }}
      >
        <div className="grid grid-cols-1 gap-2">
          <div>
            <Label children={"Name"} />
            <Input
              {...{
                error: errors.includes("name"),
                hint: errors.includes("name") ? "Required field" : "",
              }}
              value={request?.name}
              onChange={(e) => setRequest({ ...request, name: e.target.value })}
            />
          </div>
        </div>
      </VariantModal>
    </div>
  );
};

export default DropDrag;

//Call
{
  /* <DropDrag
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
  classNameForHeader={"bg-gray-500 p-2"}
  classNameForBlock={"bg-gray-100 hover:shadow-lg"}
  classNameForGroup={"space-y-2 p-4"}
  //classNameForItem={"w-full py-4 bg-red-500 text-white "}
  renderItem={(item, index) => (
    <div className="flex text-center w-full py-4 bg-red-500 text-white ">
      <div className="flex-1">
        {index + 1}. {item.name}
      </div>
    </div>
  )}
/>; */
}
