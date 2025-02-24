// HotelListTable.jsx
import React, { useState } from 'react';
import { useGetHotelsQuery, useDeleteHotelMutation } from '../../../../../services/hotelAPI';
import DataTable from '../../../../../Common/DataTable/DataTable';
import DataTableHeader from '../../../../../Common/DataTableHeader/DataTableHeader';
import DataTableFooter from '../../../../../Common/DataTableFooter/DataTableFooter';
import EditHotel from './EditHotel';
import ImagePreviewModal from './ImagePreviewModal';


const HotelListTable = () => {
  // State for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // State for managing selected hotel for edit/delete
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteHotel, { isLoading: isDeleting }] = useDeleteHotelMutation();

  const [showImagePreview, setShowImagePreview] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  

  // Fetch hotels data using RTK Query
  const { data: hotelsData, isLoading, isError } = useGetHotelsQuery({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
    sortField,
    sortOrder
  });


  const handleViewImages = (images) => {
    setSelectedImages(images);
    setShowImagePreview(true);
  };

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
  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleEditComplete = () => {
    setSelectedHotel(null);
  };

  // Handle delete
  const handleDelete = (hotel) => {
    setSelectedHotel(hotel);
    setShowDeleteConfirm(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      await deleteHotel(selectedHotel._id).unwrap();
      setShowDeleteConfirm(false);
      setSelectedHotel(null);
    } catch (error) {
      console.error('Failed to delete hotel:', error);
    }
  };

  // Column definitions
  const columns = [
    {
      Header: 'Hotel Name',
      accessor: 'name',
      sortable: true,
    },
    {
      Header: 'Type',
      accessor: 'type',
      sortable: true,
      Cell: ({ value }) => (
        <span className="badge bg-primary">{value}</span>
      )
    },
    {
      Header: 'Location',
      accessor: 'address.city',
      sortable: true,
      Cell: ({ row }) => {
        const address = row.original.address || {};
        return <span>{`${address.city || ''}, ${address.country || ''}`}</span>;
      }
    },
    {
      Header: 'Contact',
      accessor: 'contact.phone',
      sortable: false,
      Cell: ({ row }) => {
        const contact = row.original.contact || {};
        return (
          <div>
            <div>{contact.phone || 'N/A'}</div>
            <small className="text-muted">{contact.email || 'N/A'}</small>
          </div>
        );
      }
    },
    {
      Header: 'Policy',
      accessor: 'policies',
      sortable: false,
      Cell: ({ row }) => {
        const policies = row.original.policies || {};
        return (
          <div className="small">
            <div className="mb-1">
              <strong>Check-in:</strong> {policies.checkInTime || 'N/A'}
            </div>
            <div className="mb-1">
              <strong>Check-out:</strong> {policies.checkOutTime || 'N/A'}
            </div>
            {policies.cancellationPolicy && (
              <div className="text-muted text-truncate" style={{ maxWidth: '200px' }}>
                <strong>Cancel:</strong> {policies.cancellationPolicy}
              </div>
            )}
          </div>
        );
      }
    },
    {
      Header: 'Status',
      accessor: 'status',
      sortable: true,
      Cell: ({ value }) => (
        <span className={`badge ${
          value === 'active' ? 'bg-success' :
          value === 'maintenance' ? 'bg-warning' :
          'bg-danger'
        }`}>
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : 'N/A'}
        </span>
      )
    },
    {
      Header: 'Rating',
      accessor: 'rating',
      sortable: true,
      Cell: ({ value }) => (
        <div className="d-flex align-items-center">
          <span className="text-warning me-1">★</span>
          <span>{value?.toFixed(1) || 'N/A'}</span>
        </div>
      )
    },
    {
      Header: 'Images',
      accessor: 'images',
      sortable: false,
      Cell: ({ value }) => {
        if (!value || value.length === 0) {
          return <span className="text-muted">No images</span>;
        }
        
        return (
          <div className="d-flex align-items-center">
            <div style={{
              width: '50px',
              height: '50px',
              overflow: 'hidden',
              borderRadius: '4px'
            }}>
              <img 
                src={value[0]} 
                alt="Hotel thumbnail"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary ms-2"
              onClick={(e) => {
                e.stopPropagation();
                handleViewImages(value);
              }}
            >
              View All ({value.length})
            </button>
          </div>
        );
      }
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
            data-bs-toggle="offcanvas" 
            data-bs-target="#edit-room"
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
    return <div className="alert alert-danger">Error loading hotels</div>;
  }

  // Prepare data for the table
  const tableData = hotelsData?.data?.hotels || [];
  const totalItems = hotelsData?.data?.pagination?.total || 0;
  const totalPages = hotelsData?.data?.pagination?.pages || 0;

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
      <EditHotel
        selectedHotel={selectedHotel}
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
              <p>Are you sure you want to delete the hotel "{selectedHotel?.name}"?</p>
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

<ImagePreviewModal 
        images={selectedImages}
        show={showImagePreview}
        onClose={() => setShowImagePreview(false)}
      />
    </>
  );
};

export default HotelListTable;
