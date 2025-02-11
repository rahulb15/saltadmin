// // import React, { Component } from 'react';
// // import {amenitiesListColumn, amenitiesListTableData} from './AmenitiesListTableData';
// // import DataTable from '../../../../../Common/DataTable/DataTable';
// // import DataTableHeader from '../../../../../Common/DataTableHeader/DataTableHeader';
// // import DataTableFooter from '../../../../../Common/DataTableFooter/DataTableFooter';

// // class AmenitiesListTable extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       dataT: amenitiesListTableData.map(data => ({
// //         id: data.id,
// //         roomName: data.roomName,
// //         complementary: data.complementary,
// //         complementaryRate: data.complementaryRate,
// //         actions: (
// //           <>
// //             <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#edit-complementary">
// //               <i className="bi bi-pencil-square"></i>
// //             </button>
// //             <button type="button" className="btn deleterow" onClick={() => this.handleDelete(data.id)}>
// //               <i className="bi bi-trash text-danger"></i>
// //             </button>
// //           </>
// //         ),
// //       })),
// //     };
// //   }

// //   handleDelete = (id) => {
// //     this.setState(prevState => ({
// //       dataT: prevState.dataT.filter(data => data.id !== id),
// //     }));
// //   };

// //   render() {
// //     const { dataT } = this.state;

// //     return (
// //       <>
// //         <DataTableHeader />
// //         <DataTable columns={amenitiesListColumn} data={dataT} />
// //         <DataTableFooter dataT={dataT} />
// //       </>
// //     );
// //   }
// // }

// // export default AmenitiesListTable;


// import React, { useState } from 'react';
// import { useGetAmenitiesQuery } from '../../../../../services/amenitiesAPI';
// import DataTable from '../../../../../Common/DataTable/DataTable';
// import DataTableHeader from '../../../../../Common/DataTableHeader/DataTableHeader';
// import DataTableFooter from '../../../../../Common/DataTableFooter/DataTableFooter';

// const AmenitiesListTable = () => {
//   // State for pagination and filtering
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortField, setSortField] = useState('name');
//   const [sortOrder, setSortOrder] = useState('asc');

//   // Fetch amenities data using RTK Query
//   const { data: amenitiesData, isLoading, isError } = useGetAmenitiesQuery({
//     page: currentPage,
//     limit: pageSize,
//     search: searchQuery,
//     sortField,
//     sortOrder
//   });

//   // Handle page size change
//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setCurrentPage(1); // Reset to first page when changing page size
//   };

//   // Handle search
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   // Handle pagination
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   // Handle sorting
//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortOrder('asc');
//     }
//   };

//   // Define table columns
//   const columns = [
//     {
//       Header: 'Name',
//       accessor: 'name',
//       sortable: true,
//     },
//     {
//       Header: 'Category',
//       accessor: 'category',
//       sortable: true,
//       Cell: ({ value }) => (
//         <span className="badge bg-primary">{value}</span>
//       )
//     },
//     {
//       Header: 'Description',
//       accessor: 'description',
//       sortable: false,
//     },
//     {
//       Header: 'Status',
//       accessor: 'isActive',
//       sortable: true,
//       Cell: ({ value }) => (
//         <span className={`badge ${value ? 'bg-success' : 'bg-danger'}`}>
//           {value ? 'Active' : 'Inactive'}
//         </span>
//       )
//     },
//     {
//       Header: 'Actions',
//       accessor: '_id',
//       sortable: false,
//       Cell: ({ value }) => (
//         <div className="d-flex gap-2">
//           <button 
//             type="button" 
//             className="btn btn-sm btn-outline-primary"
//             data-bs-toggle="modal" 
//             data-bs-target="#edit-complementary"
//             // onClick={() => handleEdit(value)}
//           >
//             <i className="bi bi-pencil-square"></i>
//           </button>
//           <button 
//             type="button" 
//             className="btn btn-sm btn-outline-danger"
//             // onClick={() => handleDelete(value)}
//           >
//             <i className="bi bi-trash"></i>
//           </button>
//         </div>
//       )
//     }
//   ];

//   // Loading state
//   if (isLoading) {
//     return <div className="text-center py-4">Loading...</div>;
//   }

//   // Error state
//   if (isError) {
//     return <div className="alert alert-danger">Error loading amenities</div>;
//   }

//   // Prepare data for the table
//   const tableData = amenitiesData?.data?.amenities || [];
//   const totalItems = amenitiesData?.data?.pagination?.total || 0;
//   const totalPages = amenitiesData?.data?.pagination?.pages || 0;

//   return (
//     <>
//       <DataTableHeader 
//         pageSize={pageSize}
//         onPageSizeChange={handlePageSizeChange}
//         searchQuery={searchQuery}
//         onSearch={handleSearch}
//       />

//       <DataTable 
//         columns={columns}
//         data={tableData}
//         sortField={sortField}
//         sortOrder={sortOrder}
//         onSort={handleSort}
//       />

//       <DataTableFooter 
//         currentPage={currentPage}
//         totalPages={totalPages}
//         totalItems={totalItems}
//         pageSize={pageSize}
//         onPageChange={handlePageChange}
//       />
//     </>
//   );
// };

// export default AmenitiesListTable;


import React, { useState } from 'react';
import { useGetAmenitiesQuery,useDeleteAmenityMutation } from '../../../../../services/amenitiesAPI';
import DataTable from '../../../../../Common/DataTable/DataTable';
import DataTableHeader from '../../../../../Common/DataTableHeader/DataTableHeader';
import DataTableFooter from '../../../../../Common/DataTableFooter/DataTableFooter';
import EditAmenities from './EditAmenities';

const AmenitiesListTable = () => {
  // State for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // State for managing selected amenity for edit/delete
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteAmenity, { isLoading: isDeleting }] = useDeleteAmenityMutation();
  // Fetch amenities data using RTK Query
  const { data: amenitiesData, isLoading, isError } = useGetAmenitiesQuery({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
    sortField,
    sortOrder
  });

    // Sort handler
    const handleSort = (field) => {
      // If clicking the same field, toggle the order
      if (sortField === field) {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
      } else {
        // If clicking a new field, set it as the sort field and default to ascending
        setSortField(field);
        setSortOrder('asc');
      }
      // Reset to first page when sorting changes
      setCurrentPage(1);
    };
  

  // Event handlers
  const handleEdit = (amenity) => {
    setSelectedAmenity(amenity);
  };




  const handleEditComplete = () => {
    setSelectedAmenity(null);
  };

  // Column definitions with updated action handlers
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      sortable: true,
    },
    {
      Header: 'Category',
      accessor: 'category',
      sortable: true,
      Cell: ({ value }) => (
        <span className="badge bg-primary">{value}</span>
      )
    },
    {
      Header: 'Description',
      accessor: 'description',
      sortable: false,
    },
    {
      Header: 'Status',
      accessor: 'isActive',
      sortable: true,
      Cell: ({ value }) => (
        <span className={`badge ${value ? 'bg-success' : 'bg-danger'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      Header: 'Actions',
      accessor: '_id',
      sortable: false,
      Cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button 
            type="button" 
            className="btn btn-sm btn-outline-primary"
            data-bs-toggle="modal" 
            data-bs-target="#edit-complementary"
            onClick={() => handleEdit(row.original)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDelete(row.original)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    }
  ];

  // Loading and error states
  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError) {
    return <div className="alert alert-danger">Error loading amenities</div>;
  }

  // Prepare data for the table
  const tableData = amenitiesData?.data?.amenities || [];
  const totalItems = amenitiesData?.data?.pagination?.total || 0;
  const totalPages = amenitiesData?.data?.pagination?.pages || 0;

    // Handle delete
    const handleDelete = (amenity) => {
      setSelectedAmenity(amenity);
      setShowDeleteConfirm(true);
    };
  
    // Handle delete confirmation
    const handleDeleteConfirm = async () => {
      try {
        await deleteAmenity(selectedAmenity._id).unwrap();
        setShowDeleteConfirm(false);
        setSelectedAmenity(null);
      } catch (error) {
        console.error('Failed to delete amenity:', error);
      }
    };

  return (
    <>
      <DataTableHeader 
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      <DataTable 
        columns={columns}
        data={tableData}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <DataTableFooter 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {/* Edit Modal */}
      <EditAmenities
        selectedAmenity={selectedAmenity}
        onClose={handleEditComplete}
      />

          {/* Delete Confirmation Modal */}
          <div className={`modal fade ${showDeleteConfirm ? 'show' : ''}`} 
           id="deleteConfirmModal" 
           tabIndex="-1" 
           role="dialog"
           style={{ display: showDeleteConfirm ? 'block' : 'none' }}
           aria-hidden={!showDeleteConfirm}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowDeleteConfirm(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the amenity "{selectedAmenity?.name}"?</p>
              <p className="text-danger">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop for delete modal */}
      {showDeleteConfirm && (
        <div 
          className="modal-backdrop fade show" 
          onClick={() => setShowDeleteConfirm(false)}
        ></div>
      )}
    </>
  );
};

export default AmenitiesListTable;