// import React, { Component } from 'react';
// import { promocodeListColumns, promocodeListTableData } from './PromocodeListTableData';
// import DataTable from '../../../../../../Common/DataTable/DataTable';
// import DataTableHeader from '../../../../../../Common/DataTableHeader/DataTableHeader';
// import DataTableFooter from '../../../../../../Common/DataTableFooter/DataTableFooter';

// class PromocodeListTable extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dataT: promocodeListTableData.map(data => ({
//         roomId: data.roomId,
//         roomType: data.roomType,
//         from: data.from,
//         to: data.to,
//         discount: data.discount,
//         promoCode: data.promoCode,
//         status: <span className={`badge ${data.statusBgColor}`}>{data.status}</span>,
//         actions: (
//           <>
//             <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#edit-promocode"><i className="bi bi-pencil-square"></i></button>
//             <button type="button" className="btn deleterow" onClick={() => this.handleDelete(data.roomId)}><i className="bi bi-trash text-danger"></i></button>
//           </>
//         ),
//       })),
//     };
//   }

//   handleDelete = (roomId) => {
//     this.setState(prevState => ({
//       dataT: prevState.dataT.filter(data => data.roomId !== roomId),
//     }));
//   };

//   render() {
//     const { dataT } = this.state;

//     return (
//       <>
//         <DataTableHeader />
//         <DataTable columns={promocodeListColumns} data={dataT} />
//         <DataTableFooter dataT={dataT} />
//       </>
//     );
//   }
// }

// export default PromocodeListTable;


// src/components/promocodes/Components/PromocodeListTable.js
import React, { useState } from 'react';
// import { useGetPromocodesQuery, useDeletePromocodeMutation } from '../../../services/promocodeAPI';
// import DataTable from '../../../Common/DataTable/DataTable';
// import DataTableHeader from '../../../Common/DataTableHeader/DataTableHeader';
// import DataTableFooter from '../../../Common/DataTableFooter/DataTableFooter';
// import EditPromocode from './EditPromocode';
import { useGetPromocodesQuery,useDeletePromocodeMutation } from '../../../../../../services/promocodeAPI';
import DataTable from '../../../../../../Common/DataTable/DataTable';
import DataTableHeader from '../../../../../../Common/DataTableHeader/DataTableHeader';
import DataTableFooter from '../../../../../../Common/DataTableFooter/DataTableFooter';
import EditPromocode from './EditPromocode';
import { toast } from 'react-toastify';

const PromocodeListTable = () => {
  // State for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('code');
  const [sortOrder, setSortOrder] = useState('asc');

  // State for edit/delete operations
  const [selectedPromocode, setSelectedPromocode] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // RTK Query hooks
  const { data: promocodeData, isLoading, isError } = useGetPromocodesQuery({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
    sortField,
    sortOrder
  });

  const [deletePromocode, { isLoading: isDeleting }] = useDeletePromocodeMutation();

  // Sort handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // Event handlers
  const handleEdit = (promocode) => {
    setSelectedPromocode(promocode);
  };

  const handleDelete = async (promocode) => {
    setSelectedPromocode(promocode);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePromocode(selectedPromocode._id).unwrap();
      setShowDeleteConfirm(false);
      setSelectedPromocode(null);
      toast.success('Promocode deleted successfully');
    } catch (error) {
      toast.error('Failed to delete promocode');
      console.error('Failed to delete promocode:', error);
    }
  };

  const handleEditComplete = () => {
    setSelectedPromocode(null);
  };

  // Column definitions
  const columns = [
    {
      Header: 'Code',
      accessor: 'code',
      sortable: true,
    },
    {
      Header: 'Room Type',
      accessor: 'roomType',
      sortable: true,
      Cell: ({ value }) => (
        <span className="badge bg-primary">{value}</span>
      )
    },
    {
      Header: 'Discount',
      accessor: row => row.discountType === 'PERCENTAGE' 
        ? `${row.discountValue}%` 
        : `₹${row.discountValue}`,
      sortable: false,
    },
    {
      Header: 'Valid From',
      accessor: row => new Date(row.validFrom).toLocaleDateString(),
      sortable: true,
    },
    {
      Header: 'Valid To',
      accessor: row => new Date(row.validTo).toLocaleDateString(),
      sortable: true,
    },
    {
      Header: 'Usage',
      accessor: row => `${row.currentUsageCount}/${row.maxUsageCount || '∞'}`,
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

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="alert alert-danger">
        Error loading promocodes. Please try again later.
      </div>
    );
  }

  // Prepare data for the table
  const tableData = promocodeData?.data?.promocodes || [];
  const totalItems = promocodeData?.data?.pagination?.total || 0;
  const totalPages = promocodeData?.data?.pagination?.pages || 0;

  return (
    <>
      {/* DataTable Header with Search and PageSize controls */}
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

      {/* Main DataTable component */}
      <DataTable 
        columns={columns}
        data={tableData}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      {/* DataTable Footer with Pagination */}
      <DataTableFooter 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {/* Edit Modal */}
      {selectedPromocode && (
        <EditPromocode
          selectedPromocode={selectedPromocode}
          onClose={handleEditComplete}
        />
      )}

      {/* Delete Confirmation Modal */}
      <div 
        className={`modal fade ${showDeleteConfirm ? 'show' : ''}`}
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
              <p>Are you sure you want to delete the promocode "{selectedPromocode?.code}"?</p>
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

export default PromocodeListTable;
