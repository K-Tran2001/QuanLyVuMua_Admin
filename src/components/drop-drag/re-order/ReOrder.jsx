import React, { useEffect } from "react";
import { StrictModeDroppable } from "../StrictModeDroppable";
import { useState } from "react";
import { DragDropContext, Draggable } from "@hello-pangea/dnd";

const ReOrder = ({
  header = "",
  initValue = null,
  classNameForContainer = null,
  classNameForHeader = null,
  classNameForGroup = null,
  classNameForItem = null,
  renderItem,
  onDrag,
  direction = "vertical", //"horizontal"
}) => {
  const [fields, setFields] = useState();
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function handleDragEnd(result) {
    const src = result.source;
    const dest = result.destination;

    if (src.droppableId === dest.droppableId) {
      // --- SAME CONTAINER ---
      const items = reorder([...fields], src.index, dest.index).map(
        (item, index) => ({ ...item, displayOrder: index })
      );

      setFields([...items]);
      onDrag(items);
    }
  }
  useEffect(() => {
    if (initValue) {
      setFields(initValue);
      onDrag(initValue);
    }
  }, [initValue]);
  return (
    <div className={`${classNameForContainer ? classNameForContainer : ""}`}>
      <div className={`${classNameForHeader ? classNameForHeader : ""}`}>
        {header}
      </div>
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={(e) => {}}>
        <StrictModeDroppable droppableId={"dropId1"} direction={direction}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div
                className={`${direction == "horizontal" ? "flex" : ""} ${
                  classNameForGroup ? classNameForGroup : ""
                }`}
              >
                {fields?.length > 0 &&
                  fields.map((field, index) => {
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
                            className={` transition-all duration-300 ease-linear
                            ${
                              snapshot.isDragging ? "scale-[1.2] " : "shadow-md"
                            }
                            ${classNameForItem ?? ""}`}
                          >
                            <div
                              className={` ${
                                classNameForItem ? classNameForItem : ""
                              }`}
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
      </DragDropContext>
    </div>
  );
};

export default ReOrder;

//Call
{
  /* <ReOrder
  header="Re-Order"
  classNameForHeader={"text-lg font-bold"}
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
  onDrag={(e) => {
    console.log(e);
  }}
  classNameForGroup={"space-y-2"}
  renderItem={(item, index) => (
    <div className="w-full py-4 bg-red-500 text-white text-center">
      {index + 1}. {item.name}
    </div>
  )}
/>; */
}
