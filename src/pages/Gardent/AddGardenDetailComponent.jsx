import React from "react";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";

import Input from "../../components/form/input/InputField";
import { GetAllPlantFK } from "../../api/plantService";
import Select from "../../components/form/Select";
import Select_v2 from "../../components/form/Select_v2";

const AddGardenDetailComponent = ({ initData, onChange }) => {
  const INIT_REQUEST = {
    plantName: "",
    price: "",
    number: "",
    loss: "",
  };
  const [request, setRequest] = React.useState(INIT_REQUEST);
  const [detail, setDetail] = React.useState([]);
  const [errors, setErrors] = React.useState([]);
  const onValidate = () => {
    var listError = [];
    if (request == null || request?.plantName?.length === 0) {
      listError = [...listError, "plantName"];
    }
    if (request == null || request?.number == "" || request?.number == null) {
      listError = [...listError, "number"];
    }
    setErrors(listError);
    return listError.length == 0;
  };

  const converNumber = (num) => {
    const n1 = Number(num);
    return isNaN(n1) ? 0 : n1;
  };
  const handleAddDetail = () => {
    if (!onValidate()) {
      return;
    }

    const newDetail = [...detail, request];
    setDetail(newDetail);
    onChange(newDetail);
    setRequest(INIT_REQUEST);
    setErrors([]);
  };
  const handleDeleteItem = (itemDelete) => {
    var indexToRemove = detail.indexOf(itemDelete);

    if (indexToRemove != -1) {
      var copyDetail = [...detail];
      copyDetail = copyDetail.filter((_, index) => index !== indexToRemove);
      setDetail(copyDetail);
      onChange(copyDetail);
    }
  };
  const [plants, setPlants] = React.useState([]);
  const LoadDataFK = async () => {
    GetAllPlantFK()
      .then((res) => {
        if (res.success) {
          setPlants(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  React.useEffect(() => {
    LoadDataFK();
    if (initData) setDetail(initData);
  }, [initData]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 border border-gray-300 dark:border-gray-500 rounded-lg p-2">
        <div>
          <Label children={"Plant"} />
          <Select_v2
            {...{
              error: errors.includes("plantName"),
              hint: errors.includes("plantName") ? "Required field" : "",
            }}
            defaultValue={request?.plantId}
            options={
              plants?.length > 0
                ? plants.map((item) => ({
                    label: item.name,
                    value: item._id,
                  }))
                : []
            }
            placeholder="Select an option"
            onChange={(e) => {
              setRequest({
                ...request,
                plantId: e.value,
                plantName: e.label,
              });
            }}
            className="dark:bg-dark-900"
          />
        </div>

        <div>
          <Label children={"Number"} />
          <Input
            type="number"
            className="text-right"
            {...{
              error: errors.includes("number"),
              hint: errors.includes("number") ? "Required field" : "",
            }}
            value={request?.number}
            onChange={(e) => {
              setRequest({
                ...request,
                number: e.target.value,
              });
            }}
          />
        </div>

        <div className="text-end space-x-2">
          <Button
            children={"Reset"}
            className="mt-6"
            variant="outline"
            onClick={() => {
              setRequest(INIT_REQUEST);
              setErrors([]);
            }}
          />
          <Button children={"Add"} className="mt-6" onClick={handleAddDetail} />
        </div>

        {detail.length > 0 && (
          <>
            <div className="border border-top-1 border-gray-300 col-span-1 md:col-span-5"></div>
            <div className="col-span-1 md:col-span-5">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Plant
                      </th>

                      <th scope="col" className="px-6 py-3 text-end">
                        Number
                      </th>

                      <th scope="col" className="px-6 py-3 text-end">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail?.length > 0 &&
                      detail.map((itemDetail) => (
                        <tr
                          key={Math.random()}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {itemDetail.plantName}
                          </th>

                          <td className="px-6 py-4 text-end">
                            {itemDetail.number}
                          </td>

                          <td className="px-6 py-4 text-end ">
                            <Button
                              children={"x"}
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteItem(itemDetail)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddGardenDetailComponent;
