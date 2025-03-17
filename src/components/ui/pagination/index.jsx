import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  const { onChange } = props;

  return (
    <div className="flex justify-end">
      <div className="flex items-center justify-between gap-2 px-6 py-4 sm:justify-normal">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={(event) => onChange(event)}
          pageRangeDisplayed={5} // Số trang hiển thị trong paginator
          marginPagesDisplayed={2} // Số trang hiển thị ở đầu/cuối paginator
          pageCount={10} // Tổng số trang
          previousLabel="< Previous"
          containerClassName="flex gap-4 items-center"
          pageClassName={
            "cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg  hover:bg-brand-500 hover:text-white"
          }
          activeClassName="bg-brand-500 text-sm font-medium text-white"
        />
      </div>
    </div>
  );
};

export default Pagination;
