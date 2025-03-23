import React from "react";

import { DragDropContext } from "@hello-pangea/dnd";
import { MainContext } from "../../../context/MainContext";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import CenterPanel from "./CenterPanel";
import LeftPanel from "./LeftPanel";

const EditForm = () => {
  const context = React.useContext(MainContext);
  const { fields, setFields, isDragging, setIsDragging, dataTranslate } =
    context;

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

  return (
    <div>
      <PageBreadcrumb pageTitle="Edit form" />
      <div
        className="grid gap-4 grid-cols-1 lg:grid-cols-8 min-h-[calc(100vh-130px)]  
  grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-flow-col"
      >
        <DragDropContext
          onDragEnd={handleDragEnd}
          onDragStart={(e) => {
            if (e.source.droppableId == "fieldSelectedList") {
              setIsDragging(true);
            }
          }}
        >
          <div className="col-span-1 lg:col-span-6  order-2 lg:order-none">
            <CenterPanel type={"fieldSelectedList"} />
          </div>

          <div className="col-span-1 lg:col-span-2   order-1 lg:order-none">
            <LeftPanel type={"fields"} />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default EditForm;
