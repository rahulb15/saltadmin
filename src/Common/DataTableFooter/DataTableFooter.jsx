// import React from 'react'

// const DataTableFooter = ( {dataT} ) => {
//   return (
//     <div className="d-flex justify-content-between align-items-center">
//         <div>
//           Showing 1 to{' '} {dataT.length} of {dataT.length} entries
//         </div>
//         <div className="dataTables_paginate paging_simple_numbers" id="timetracker-table_paginate">
//           <ul className="pagination">
//             <li className="paginate_button page-item previous disabled" id="timetracker-table_previous">
//               <a href="#" aria-controls="timetracker-table" data-dt-idx="0" tabIndex="0" className="page-link">Previous</a>
//             </li>
//             <li className="paginate_button page-item active">
//               <a href="#" aria-controls="timetracker-table" data-dt-idx="1" tabIndex="0" className="page-link text-white">1</a>
//             </li>
//             <li className="paginate_button page-item next disabled" id="timetracker-table_next">
//               <a href="#" aria-controls="timetracker-table" data-dt-idx="2" tabIndex="0" className="page-link">Next</a>
//             </li>
//           </ul>
//         </div>
//     </div>
//   )
// }

// export default DataTableFooter


// DataTableFooter.jsx
const DataTableFooter = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  pageSize, 
  onPageChange 
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div>
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
      <nav>
        <ul className="pagination pagination-sm mb-0">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          
          {[...Array(totalPages)].map((_, index) => (
            <li 
              key={index + 1} 
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DataTableFooter;