import React, { useEffect } from "react";
import Drawer from "../../components/ui/drawer/Drawer";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { MainContext } from "../../context/MainContext";
import { GetAllGardenFK } from "../../api/gardenService";
import DatePicker from "../../components/form/input/DatePicker";

const Filter = ({ initValue, onChange }) => {
  const context = React.useContext(MainContext);
  const { drawer, setDrawer } = context;

  const [tpmFilterPage, setTmpFilterPage] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const LoadDataFK = async () => {
    GetAllGardenFK()
      .then((res) => {
        if (res.success) {
          setCategories([{ name: "Tất cả", _id: null }, ...res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    LoadDataFK();
    if (initValue) {
      setTmpFilterPage(initValue);
    }
  }, [initValue]);

  return (
    <Drawer>
      <div>
        <div className="py-4 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <Label>{"From"}</Label>
              <DatePicker />
            </div>
            <div>
              <Label>{"To"}</Label>
              <DatePicker />
            </div>
          </div>

          <div>
            <Label>{"Garden"}</Label>
            <Select
              defaultValue={tpmFilterPage?.gardenId}
              options={
                categories?.length > 0
                  ? categories.map((item) => ({
                      label: item.name,
                      value: item._id,
                    }))
                  : []
              }
              placeholder="Select an option"
              onChange={(e) => {
                setTmpFilterPage({
                  ...tpmFilterPage,
                  gardenId: e,
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
                gardenId: null,
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
