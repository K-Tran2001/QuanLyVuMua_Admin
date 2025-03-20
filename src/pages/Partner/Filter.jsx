import React, { useEffect } from "react";
import Drawer from "../../components/ui/drawer/Drawer";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { MainContext } from "../../context/MainContext";
import { GetAllCategoryFK } from "../../api/categoryService";

const Filter = ({ initValue, onChange }) => {
  const context = React.useContext(MainContext);
  const { drawer, setDrawer } = context;

  const [tpmFilterPage, setTmpFilterPage] = React.useState({});

  useEffect(() => {
    if (initValue) {
      setTmpFilterPage(initValue);
    }
  }, [initValue]);

  return (
    <Drawer>
      <div>
        <div className="py-4 overflow-y-auto space-y-4">
          <div>
            <Label>{"Sort theo"}</Label>
            <Select
              defaultValue={tpmFilterPage?.sortOptions?.sortField}
              options={[
                {
                  label: "Name",
                  value: "name",
                },
                {
                  label: "CreatedAt",
                  value: "createdAt",
                },
              ]}
              placeholder="Select an option"
              onChange={(e) => {
                //setTmpSort({ ...tmpSort, sortField: e });
                setTmpFilterPage({
                  ...tpmFilterPage,
                  sortOptions: {
                    ...tpmFilterPage?.sortOptions,
                    sortField: e,
                  },
                });
              }}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <Label>{"Chiều"}</Label>
            <Select
              defaultValue={tpmFilterPage?.sortOptions?.sortOrder}
              options={[
                {
                  label: "desc",
                  value: "desc",
                },
                {
                  label: "asc",
                  value: "asc",
                },
              ]}
              placeholder="Select an option"
              onChange={(e) => {
                //setTmpSort({ ...tmpSort, sortOrder: e });
                setTmpFilterPage({
                  ...tpmFilterPage,
                  sortOptions: {
                    ...tpmFilterPage.sortOptions,
                    sortOrder: e,
                  },
                });
              }}
              className="dark:bg-dark-900"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            children={"Clear Filter"}
            onClick={() => {
              setTmpFilterPage({
                ...tpmFilterPage,
                categoryId: null,
                sortOptions: null,
              });

              //setDrawer({ ...drawer, isOpen: false });
            }}
          ></Button>
          <Button
            children={"Apply"}
            onClick={() => {
              onChange(tpmFilterPage);
              setDrawer({ ...drawer, isOpen: false });
            }}
          ></Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Filter;
