import React from "react";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";

import Input from "../../components/form/input/InputField";

const AddBillDetailComponent = ({ isEdit, isConfirm, initData, onChange }) => {
  const INIT_REQUEST = {
    id: null,
    productName: "",
    price: "",
    number: "",
    loss: "",
  };
  const [request, setRequest] = React.useState(INIT_REQUEST);
  const [detail, setDetail] = React.useState([]);
  const [errors, setErrors] = React.useState([]);
  const onValidate = () => {
    var listError = [];
    if (request == null || request?.productName?.length === 0) {
      listError = [...listError, "productName"];
    }
    if (request == null || request?.price == "" || request?.price == null) {
      listError = [...listError, "price"];
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
  const handleChangeDetail = () => {
    if (!onValidate()) {
      return;
    }
    //Tính toán
    var total = 0;
    total =
      converNumber(request.price) * converNumber(request.number) -
      converNumber(request.loss);
    var newDetail = [];
    if (request.id == null) {
      newDetail = [
        ...detail,
        {
          ...request,
          id: Math.random(),
          price: converNumber(request.price),
          number: converNumber(request.number),
          loss: converNumber(request.loss),
          total,
        },
      ];
    } else {
      const indexToUpdate = detail.findIndex((item) => item?.id == request?.id);
      if (indexToUpdate != -1) {
        newDetail = [...detail];
        newDetail[newDetail] = request;
      }
    }

    setDetail(newDetail);
    onChange(newDetail);
    setRequest(INIT_REQUEST);
    setErrors([]);
  };
  const handleDeleteItem = (itemDelete) => {
    var indexToRemove = detail.indexOf(itemDelete);

    if (indexToRemove != -1) {
      if (itemDelete.id == request.id) {
        setRequest({ ...request, id: null });
      }
      var copyDetail = [...detail];
      copyDetail = copyDetail.filter((_, index) => index !== indexToRemove);
      setDetail(copyDetail);
      onChange(copyDetail);
    }
  };

  React.useEffect(() => {
    if (initData) setDetail(initData);
  }, [initData]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 border border-gray-300 dark:border-gray-500 rounded-lg p-2">
        {(!isEdit || (isEdit && !isConfirm)) && (
          <>
            <div>
              <Label children={"Detail name"} />
              <Input
                {...{
                  error: errors.includes("productName"),
                  hint: errors.includes("productName") ? "Required field" : "",
                }}
                value={request.productName}
                onChange={(e) =>
                  setRequest({ ...request, productName: e.target.value })
                }
              />
            </div>
            <div>
              <Label children={"Price"} />
              <Input
                type="number"
                className="text-right"
                {...{
                  error: errors.includes("price"),
                  hint: errors.includes("price") ? "Required field" : "",
                }}
                value={request?.price}
                onChange={(e) => {
                  setRequest({
                    ...request,
                    price: e.target.value,
                  });
                }}
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
            <div>
              <Label children={"Loss"} />
              <Input
                type="number"
                className="text-right"
                value={request?.loss}
                onChange={(e) => {
                  setRequest({
                    ...request,
                    loss: e.target.value,
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
              <Button
                children={request.id ? "Update" : "Add"}
                className="mt-6"
                onClick={handleChangeDetail}
              />
            </div>
          </>
        )}
        {detail.length > 0 && (
          <>
            <div className="border border-top-1 border-gray-300 col-span-1 md:col-span-5"></div>
            <div className="col-span-1 md:col-span-5">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Detail name
                      </th>
                      <th scope="col" className="px-6 py-3 text-end">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-end">
                        Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-end">
                        Loss
                      </th>
                      <th scope="col" className="px-6 py-3 text-end">
                        Total Actual
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
                          onClick={() => setRequest(itemDetail)}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {itemDetail.productName}
                          </th>
                          <td className="px-6 py-4 text-end">
                            {itemDetail.price}
                          </td>
                          <td className="px-6 py-4 text-end">
                            {itemDetail.number}
                          </td>
                          <td className="px-6 py-4 text-end">
                            {itemDetail.loss}
                          </td>
                          <td className="px-6 py-4 text-end">
                            {itemDetail.total}
                          </td>
                          <td className="px-6 py-4 text-end ">
                            <Button
                              disabled={isEdit && isConfirm}
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

export default AddBillDetailComponent;
