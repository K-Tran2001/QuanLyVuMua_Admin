import * as React from "react";
import * as Ci from "react-icons/ci";
import * as Ai from "react-icons/ai";

export default function ItemForm({
  field,
  handleDelete,
  handleEdit,
  setCurrentField,
  index,
  pageTranslate,
}) {
  const [isHover, setIsHover] = React.useState(false);
  return (
    <div>
      {field?.type == "file" ? (
        <div
          className="mb-4 border-gray-200 border-dashed border border-light-blue-500 dark:dark:text-white/90! dark:bg-black dark:border dark:border-gray-800 px-4 md:px-8 py-4  bg-gray-50 bg-gray-50 rounded-lg hover:shadow-md"
          key={Math.random()}
          onClick={() => setCurrentField({ ...field, index: index })}
        >
          <div className="relative flex-1 translate-y-[-0rem] translate-x-[0.5rem]">
            <div className="absolute flex justify-end space-x-2 right-0 -translate-y-3 translate-x-5">
              <button
                className=" w-6 h-6 bg-indigo-100 flex justify-center items-center rounded-lg cursor-pointer"
                onClick={handleEdit}
              >
                <Ci.CiEdit className="w-4 h-4 text-indigo-500" />
              </button>
              <button
                className=" w-6 h-6 bg-red-100 flex justify-center items-center rounded-lg"
                onClick={handleDelete}
              >
                <Ai.AiOutlineDelete className="w-4 h-4 text-danger" />
              </button>
            </div>
          </div>
          <div
            className="flex items-center justify-center w-full"
            key={Math.random()}
          >
            <h1 className="flex flex-col items-center justify-center w-full h-64 cursor-pointer   ">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-4 text-gray_500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-large text-gray_500 ">
                  <span className="font-semibold">
                    {pageTranslate.click_to_upload}
                  </span>{" "}
                  {pageTranslate.or_drag_and_drop}
                </p>
                <p className="text-xs text-gray_500 ">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input readOnly type="file" className="hidden" />
            </h1>
          </div>
        </div>
      ) : field?.type == "heading" ? (
        <div
          className="mb-4  hover:border-gray-200 hover:border dark:dark:text-white/90! dark:bg-black dark:border dark:border-gray-800 px-4 md:px-8 py-4   bg-gray-50 rounded-lg hover:shadow-md"
          key={Math.random()}
          onClick={() => setCurrentField({ ...field, index: index })}
        >
          <div className="relative flex-1  translate-y-[-0rem] translate-x-[0.5rem]">
            <div className="absolute flex justify-end space-x-2 right-0 -translate-y-3 translate-x-5">
              <button
                className=" w-6 h-6 bg-indigo-100 flex justify-center items-center rounded-lg cursor-pointer"
                onClick={handleEdit}
              >
                <Ci.CiEdit className="w-4 h-4 text-indigo-500" />
              </button>
              <button
                className=" w-6 h-6 bg-red-100 flex justify-center items-center rounded-lg"
                onClick={handleDelete}
              >
                <Ai.AiOutlineDelete className="w-4 h-4 text-danger" />
              </button>
            </div>
          </div>

          <h1
            id="titleForm"
            className="text-center  text-gray-900 text-3xl  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 truncate"
          >
            {/* {pageTranslate.heading} */}
            {field.title}
          </h1>
          <h3
            id="discriptionForm"
            className="text-gray-900 text-xl  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 truncate"
          >
            {/* {pageTranslate.heading} */}
            {field.discription}
          </h3>
        </div>
      ) : field?.type == "divider" ? (
        <div
          className="mb-4  hover:border-gray-200 hover:border dark:dark:text-white/90! dark:bg-black dark:border dark:border-gray-800 px-4 md:px-8 py-4   bg-gray-50 rounded-lg hover:shadow-md"
          key={Math.random()}
          onClick={() => setCurrentField({ ...field, index: index })}
        >
          <div className="relative flex-1  translate-y-[-0rem] translate-x-[0.5rem]">
            <div className="absolute flex justify-end space-x-2 right-0 -translate-y-3 translate-x-5">
              <button
                className=" w-6 h-6 bg-indigo-100 flex justify-center items-center rounded-lg cursor-pointer"
                onClick={handleEdit}
              >
                <Ci.CiEdit className="w-4 h-4 text-indigo-500" />
              </button>
              <button
                className=" w-6 h-6 bg-red-100 flex justify-center items-center rounded-lg"
                onClick={handleDelete}
              >
                <Ai.AiOutlineDelete className="w-4 h-4 text-danger" />
              </button>
            </div>
          </div>
          <hr className="border-2 px-4 w-[90%] m-[auto]"></hr>
        </div>
      ) : field?.type == "radio" || field?.type == "checkbox" ? (
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="mb-4  hover:border-gray-200 hover:border dark:dark:text-white/90! dark:bg-black dark:border dark:border-gray-800 px-4 md:px-8 py-4   bg-gray-50 rounded-lg hover:shadow-md"
          key={Math.random()}
          onClick={() => setCurrentField({ ...field, index: index })}
        >
          {/* <div className="relative flex-1 translate-y-[-0rem] translate-x-[0.5rem]">
            <div
              className={`absolute flex justify-end space-x-2 right-0 -translate-y-3 translate-x-5 block `}
            >
              <button
                className=" w-6 h-6 bg-indigo-100 flex justify-center items-center rounded-lg cursor-pointer"
                onClick={handleEdit}
              >
                <Ci.CiEdit className="w-4 h-4 text-indigo-500" />
              </button>
              <button
                className=" w-6 h-6 bg-red-100 flex justify-center items-center rounded-lg"
                onClick={handleDelete}
              >
                <Ai.AiOutlineDelete className="w-4 h-4 text-danger" />
              </button>
            </div>
          </div> */}
          <div className="relative flex-1 translate-y-[-0rem] translate-x-[0.5rem] z-10">
            <div className="absolute flex justify-end space-x-2 right-0 -translate-y-3 translate-x-5">
              <button
                className=" w-6 h-6 bg-indigo-100 flex justify-center items-center rounded-lg cursor-pointer"
                onClick={handleEdit}
              >
                <Ci.CiEdit className="w-4 h-4 text-indigo-500" />
              </button>
              <button
                className=" w-6 h-6 bg-red-100 flex justify-center items-center rounded-lg"
                onClick={handleDelete}
              >
                <Ai.AiOutlineDelete className="w-4 h-4 text-danger" />
              </button>
            </div>
          </div>
          <div className="relative z-0 w-full  group  z-0">
            <div className="flex items-center pl-3">
              <input
                readOnly
                checked={true}
                // onChange={(e) =>
                //   setCurrentField({
                //     ...field,
                //     index: index,
                //   })
                // }
                type={field.type}
                value={field.type}
                name="list-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <h1 className="w-full py-3 ml-2 text-medium  text-gray-900">
                {field.label}
              </h1>
            </div>
          </div>
        </div>
      ) : field?.type == "dropdown" || field?.type == "contactList" ? (
        <div
          className="mb-4  hover:border-gray-200 hover:border dark:dark:text-white/90! dark:bg-black dark:border dark:border-gray-800 px-4 md:px-8 py-4   bg-gray-50 rounded-lg hover:shadow-md"
          key={Math.random()}
          onClick={() => setCurrentField({ ...field, index: index })}
        >
          <div className="relative flex-1 translate-y-[-0rem] translate-x-[0.5rem]">
            <div className="absolute flex justify-end space-x-2 right-0 -translate-y-3 translate-x-5">
              <button
                className=" w-6 h-6 bg-indigo-100 flex justify-center items-center rounded-lg cursor-pointer"
                onClick={handleEdit}
              >
                <Ci.CiEdit className="w-4 h-4 text-indigo-500" />
              </button>
              <button
                className=" w-6 h-6 bg-red-100 flex justify-center items-center rounded-lg"
                onClick={handleDelete}
              >
                <Ai.AiOutlineDelete className="w-4 h-4 text-danger" />
              </button>
            </div>
          </div>
          <div className="z-0 w-full mb-2 group">
            <div className="mb-2 flex text-large text-large text-gray_800  duration-300 transform translate-y-1 scale-75 top-3 -z-10 origin-[0] left-0 text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 scale-75 -translate-y-6">
              {field.type == "date" ? "" : field.label}
              {field.required == true && (
                <>
                  <div className=" text-danger">(</div>
                  <div className=" text-danger">
                    {field.required == true ? "*" : ""}
                  </div>
                  <div className=" text-danger">)</div>
                </>
              )}
            </div>
            <select
              id={field.id}
              disabled
              className={`border border-gray-300 rounded-lg
               bg-gray-50  text-gray-900 text-large   block w-full p-1`}
            ></select>
          </div>
        </div>
      ) : (
        <div
          className="mb-4  hover:border-gray-200 hover:border dark:dark:text-white/90! dark:bg-black dark:border dark:border-gray-800 px-4 md:px-8 py-4   bg-gray-50 rounded-lg hover:shadow-md"
          key={Math.random()}
          onClick={() => setCurrentField({ ...field, index: index })}
        >
          <div className="relative flex-1 translate-y-[-0rem] translate-x-[0.5rem]">
            <div className="absolute flex justify-end space-x-2 right-0 -translate-y-3 translate-x-5">
              <button
                className=" w-6 h-6 bg-indigo-100 flex justify-center items-center rounded-lg cursor-pointer"
                onClick={handleEdit}
              >
                <Ci.CiEdit className="w-4 h-4 text-indigo-500" />
              </button>
              <button
                className=" w-6 h-6 bg-red-100 flex justify-center items-center rounded-lg"
                onClick={handleDelete}
              >
                <Ai.AiOutlineDelete className="w-4 h-4 text-danger" />
              </button>
            </div>
          </div>
          <div className="z-0 w-full mb-2 group">
            <div className="flex text-large text-large text-gray_800  duration-300 transform translate-y-1 scale-75 top-3 -z-10 origin-[0] left-0 text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 scale-75 -translate-y-6">
              {field.label}
              {field.required == true && (
                <div className="flex px-2">
                  <div className=" text-danger">(</div>
                  <div className=" text-danger">
                    {field.required == true ? "*" : ""}
                  </div>
                  <div className=" text-danger">)</div>
                </div>
              )}
            </div>
            {/* <input
              readOnly
              type={field.type}
              name={field.id}
              className={`px-2 block w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer ${
                field.type == "date" ? "py-3" : ""
              }`}
              placeholder=" "
              required
            /> */}
            <div
              className={`text-medium px-2 block w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer ${
                field.type == "date" ? "py-3" : "py-2"
              }`}
            >
              {field.type == "date" ? "dd/mm/yyyy" : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
