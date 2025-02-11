
// src/pages/FeaturedHotels/Components/FeaturedHotelList.jsx
import React, { useState } from 'react';
import { useGetFeaturedHotelsQuery , useDeleteFeaturedHotelMutation} from '../../../../services/featuredHotelAPI';
import DataTable from '../../../../Common/DataTable/DataTable';
import DataTableHeader from '../../../../Common/DataTableHeader/DataTableHeader';
import DataTableFooter from '../../../../Common/DataTableFooter/DataTableFooter';
import EditFeaturedHotel from './EditFeaturedHotel';
import Preview from './Preview';
import moment from 'moment';

const FeaturedHotelList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('position');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [deleteFeaturedHotel, { isLoading: isDeleting }] = useDeleteFeaturedHotelMutation();

  const { data: hotelsData, isLoading, isError } = useGetFeaturedHotelsQuery({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
    sortField,
    sortOrder
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handlePreview = (hotel) => {
    setSelectedHotel(hotel);
    setShowPreview(true);
  };

  const handleDelete = (hotel) => {
    setSelectedHotel(hotel);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteFeaturedHotel(selectedHotel._id).unwrap();
      setShowDeleteConfirm(false);
      setSelectedHotel(null);
    } catch (error) {
      console.error('Failed to delete featured hotel:', error);
    }
  };

  const columns = [
    {
      Header: 'Hotel',
      accessor: 'hotelId',
      sortable: true,
      Cell: ({ row }) => (
        <div className="d-flex align-items-center">
          <img 
            src={row.original.hotelId?.mainImage || row.original.hotelId?.images[0]} 
            alt={row.original.hotelId?.name}
            className="rounded me-2"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
          <div>
            <div className="fw-bold">{row.original.hotelId?.name}</div>
            <small className="text-muted">{row.original.customTitle || row.original.hotelId?.description}</small>
          </div>
        </div>
      )
    },
    {
      Header: 'Section',
      accessor: 'sectionType',
      sortable: true,
      Cell: ({ value }) => (
        <span className="badge bg-primary">{value}</span>
      )
    },
    {
      Header: 'Position',
      accessor: 'position',
      sortable: true,
    },
    {
      Header: 'Valid Until',
      accessor: 'endDate',
      sortable: true,
      Cell: ({ value }) => moment(value).format('DD MMM YYYY')
    },
    {
      Header: 'Status',
      accessor: 'isActive',
      sortable: true,
      Cell: ({ value }) => (
        <span className={`badge bg-${value ? 'success' : 'danger'}`}>
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
            onClick={() => handlePreview(row.original)}
          >
            <i className="bi bi-eye"></i>
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handleEdit(row.original)}
          >
            <i className="bi bi-pencil"></i>
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
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError) {
    return <div className="alert alert-danger">Error loading featured hotels</div>;
  }

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

      {selectedHotel && (
        <EditFeaturedHotel
          selectedHotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
      )}

      <Preview
        open={showPreview}
        handleClose={() => setShowPreview(false)}
        selectedHotel={selectedHotel}
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
              <p>Are you sure you want to remove "{selectedHotel?.hotelId?.name}" from featured hotels?</p>
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
                {isDeleting ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showDeleteConfirm && (
        <div 
          className="modal-backdrop fade show" 
          onClick={() => setShowDeleteConfirm(false)}
        ></div>
      )}
    </>
  );
};

export default FeaturedHotelList;