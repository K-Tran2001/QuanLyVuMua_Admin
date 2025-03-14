// // Props for Table
// interface TableProps {
//   children: ReactNode; // Table content (thead, tbody, etc.)
//   className?: string; // Optional className for styling
// }

// // Props for TableHeader
// interface TableHeaderProps {
//   children: ReactNode; // Header row(s)
//   className?: string; // Optional className for styling
// }

// // Props for TableBody
// interface TableBodyProps {
//   children: ReactNode; // Body row(s)
//   className?: string; // Optional className for styling
// }

// // Props for TableRow
// interface TableRowProps {
//   children: ReactNode; // Cells (th or td)
//   className?: string; // Optional className for styling
//   onClick?: React.MouseEventHandler<HTMLTableRowElement>;
//   onDoubleClick?:React.MouseEventHandler<HTMLTableRowElement>
// }

// // Props for TableCell
// interface TableCellProps {
//   children: ReactNode; // Cell content
//   isHeader?: boolean; // If true, renders as <th>, otherwise <td>
//   className?: string; // Optional className for styling
//   colSpan?:number;
// }

// Table Component
const Table = ({ children, className }) => {
  return <table className={`min-w-full  ${className}`}>{children}</table>;
};

// TableHeader Component
const TableHeader = ({ children, className }) => {
  return <thead className={className}>{children}</thead>;
};

// TableBody Component
const TableBody = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

// TableRow Component
const TableRow = ({ children, className, onClick, onDoubleClick }) => {
  return (
    <tr
      className={
        className + "hover:shadow-sm hover:bg-gray-100 dark:hover:bg-black"
      }
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </tr>
  );
};

// TableCell Component
const TableCell = ({ children, isHeader = false, className, colSpan = 1 }) => {
  const CellTag = isHeader ? "th" : "td";
  return (
    <CellTag className={` ${className}`} colSpan={colSpan}>
      {children}
    </CellTag>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
