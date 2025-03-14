import React from "react";
import { ArrowRightIcon, CalenderIcon } from "../../../icons";

const Pagination = (props) => {
  const { pageFilter } = props;
  const [pagination, setPanigation] = React.useState({
    currentPage: 1,
    totalPage: 15,
  });
  const [listButtom, setListButtom] = React.useState([]);

  React.useEffect(() => {
    var listTarget = [];
    if (pagination.totalPage <= 6) {
      for (var i = 1; i <= pagination.currentPage; i++) {
        listTarget = [...listTarget, i];
      }
    } else if (pagination.totalPage > 6 && pagination.totalPage < 10) {
      //case 1
      listTarget = [
        1,
        2,
        "...",
        pagination.totalPage - 1,
        pagination.totalPage,
      ];
    } else {
      listTarget = [
        1,
        2,
        3,
        "...",
        pagination.totalPage - 2,
        pagination.totalPage - 1,
        pagination.totalPage,
      ];
    }
    setListButtom(listTarget);
  }, []);
  return (
    <div className="flex justify-end">
      <div className="flex items-center justify-between gap-2 px-6 py-4 sm:justify-normal">
        <button
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 sm:p-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          disabled={pagination.currentPage === 1}
          onClick={() => {
            pagination.currentPage >= 1 &&
              setPanigation({
                ...pagination,
                currentPage: pagination.currentPage - 1,
              });
          }}
        >
          <span className="text-gray-500  pointer-events-none  dark:text-gray-400 rotate-180 p-0">
            <ArrowRightIcon />
          </span>
        </button>

        <span className="block text-sm font-medium text-gray-700 dark:text-gray-400 sm:hidden">
          {`Page ${pagination.currentPage} of ${pagination.totalPage}`}
        </span>

        <ul className="hidden items-center gap-0.5 sm:flex">
          {listButtom.map((button) => {
            if (button !== "...") {
              return (
                <li key={Math.random()}>
                  <a
                    onClick={() => {
                      setPanigation({
                        ...pagination,
                        currentPage: button,
                      });
                    }}
                    className={`${
                      pagination.currentPage == button
                        ? "bg-brand-500 text-sm font-medium text-white"
                        : ""
                    } cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg  hover:bg-brand-500 hover:text-white`}
                  >
                    {button}
                  </a>
                </li>
              );
            } else {
              return (
                <li key={Math.random()}>
                  <a className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-500 hover:text-white dark:text-gray-400 dark:hover:text-white">
                    ...
                  </a>
                </li>
              );
            }
          })}
        </ul>

        <button
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 sm:p-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          disabled={pagination.currentPage === pagination.totalPage}
          onClick={() => {
            pagination.currentPage < pagination.totalPage &&
              setPanigation({
                ...pagination,
                currentPage: pagination.currentPage + 1,
              });
          }}
        >
          <span className="text-gray-500  pointer-events-none  dark:text-gray-400 p-0">
            <ArrowRightIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;

// import React, { useState, useMemo } from "react";
// import { ArrowRightIcon } from "../../../icons";

// const Pagination = ({ totalPage = 15 }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   console.log("currentPage", currentPage);

//   const listButtons = useMemo(() => {
//     let pages = [];

//     // Luôn có trang đầu tiên
//     pages.push(1);
//     console.log("pages", pages);

//     // Hiển thị trang trước, trang hiện tại, trang sau
//     if (currentPage > 2) pages.push(currentPage - 1);
//     pages.push(currentPage);
//     if (currentPage < totalPage - 1) pages.push(currentPage + 1);

//     // Nếu có khoảng cách giữa trang 2 và trang hiện tại, thêm "..."
//     if (currentPage > 4) pages.splice(1, 0, "...");

//     // Nếu có khoảng cách giữa trang hiện tại và trang cuối, thêm "..."
//     if (currentPage < totalPage - 3) pages.push("...");

//     // Luôn có 3 trang cuối cùng
//     pages.push(totalPage - 2, totalPage - 1, totalPage);

//     // Lọc các trang hợp lệ
//     return [...new Set(pages)].filter((p) => p >= 1 && p <= totalPage);
//   }, [currentPage, totalPage]);
//   console.log("listButtons", listButtons);

//   return (
//     <div className="flex justify-end">
//       <div className="flex items-center gap-2 px-6 py-4">
//         {/* Nút Previous */}
//         <button
//           className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow hover:bg-gray-50"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//         >
//           <span className="text-gray-500 rotate-180 p-0">
//             <ArrowRightIcon />
//           </span>
//         </button>

//         {/* Danh sách trang */}
//         <ul className="flex items-center gap-1">
//           {listButtons.map((button, index) => (
//             <li key={index}>
//               {button === "..." ? (
//                 <span className="px-3 py-1 text-gray-700">...</span>
//               ) : (
//                 <button
//                   onClick={() => setCurrentPage(button)}
//                   className={`${
//                     currentPage === button
//                       ? "bg-brand-500 text-white"
//                       : "hover:bg-brand-500 hover:text-white"
//                   } flex h-9 w-9 items-center justify-center rounded-lg`}
//                 >
//                   {button}
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>

//         {/* Nút Next */}
//         <button
//           className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow hover:bg-gray-50"
//           disabled={currentPage === totalPage}
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(totalPage, prev + 1))
//           }
//         >
//           <span className="text-gray-500 p-0">
//             <ArrowRightIcon />
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
