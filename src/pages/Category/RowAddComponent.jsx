import React from "react";
import { TableCell, TableRow } from "../../components/ui/table";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";

const RowAddComponent = ({ setIsAddNew }) => {
  const [request, setRequest] = React.useState({});
  return (
    <TableRow key={Math.random()} className="hover:shadow-sm ">
      <TableCell className="py-3 px-2">
        <Input
          value={request?.name}
          onChange={(e) => {
            setRequest((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
      </TableCell>

      {/* Button */}
      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        <div className="flex item-center gap-3">
          <Button
            variant="outline"
            size="sm"
            children={"Save "}
            onClick={() => {
              setIsAddNew(false);
              setData([...data, { ...request, _id: Math.random() }]);
            }}
          />
          <Button
            variant="outline"
            size="sm"
            children={"Cancel "}
            onClick={() => {
              setIsAddNew(false);
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RowAddComponent;
