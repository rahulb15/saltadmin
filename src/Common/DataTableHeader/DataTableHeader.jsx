// import React, { useState } from 'react'

// const DataTableHeader = () => {

//   const [pageSize, setPageSize] = useState(10); // Default page size
//   const [globalFilter, setGlobalFilter] = useState('');
//   const sizeOptions = [10, 25, 50, 100]; // Available size options

//   const handlePageSizeChange = (e) => {
//     const newSize = parseInt(e.target.value);
//     setPageSize(newSize);
//   };

//   return (
//     <div className="d-flex justify-content-between align-items-center mb-2">
//         <div className="d-flex align-items-center">
//           Show{' '}
//           <select
//             value={pageSize}
//             onChange={handlePageSizeChange}
//             className="form-select form-select-sm ms-2"
//           >
//             {sizeOptions.map((size, index) => (
//               <option key={index} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//           &nbsp;entries
//         </div>
//         <div className="d-flex align-items-center">
//           <span className="me-2">Search:</span>
//           <input
//             value={globalFilter || ''}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             className="form-control form-control-sm"
//           />
//         </div>
//     </div>
//   )
// }

// export default DataTableHeader


// DataTableHeader.jsx
import React from 'react';

const DataTableHeader = ({ 
  pageSize, 
  onPageSizeChange, 
  searchQuery, 
  onSearch 
}) => {
  const sizeOptions = [10, 25, 50, 100];

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="d-flex align-items-center">
        Show{' '}
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="form-select form-select-sm mx-2"
        >
          {sizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        entries
      </div>
      <div className="d-flex align-items-center">
        <label className="me-2">Search:</label>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="form-control form-control-sm"
          placeholder="Search amenities..."
        />
      </div>
    </div>
  );
};

export default DataTableHeader;