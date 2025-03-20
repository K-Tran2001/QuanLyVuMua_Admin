import React from "react";
import { MainContext } from "../../../context/MainContext";

const Drawer = ({ children }) => {
  const context = React.useContext(MainContext);
  const { drawer, setDrawer } = context;

  const positions = {
    leftDrawer: `top-0 left-0 ${drawer.isOpen ? "" : "-translate-x-full"}`,
    rightDrawer: `top-0 right-0 ${drawer.isOpen ? "" : "translate-x-full"}`,
  };
  console.log("positions[position]", positions[drawer.children]);

  return (
    <div>
      {drawer.isOpen && (
        <div
          className="z-9999999 fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px] opacity-70"
          onClick={() => setDrawer({ ...drawer, isOpen: false })}
        ></div>
      )}
      <div
        id="drawer-navigation"
        className={`z-99999999 w-[500px] fixed  h-screen p-4 overflow-y-auto transition-transform  bg-white w-64 dark:bg-gray-800"
      aria-labelledby="drawer-navigation-label ${positions[drawer.position]}`}
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Filter
        </h5>
        <button
          onClick={() => setDrawer({ ...drawer, isOpen: false })}
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
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
          <span className="sr-only">Close menu</span>
        </button>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
