// src/pages/BanquetHalls/BanquetHallList.jsx
import React, { useState } from 'react';
import { useGetBanquetHallsQuery, useDeleteBanquetHallMutation } from '../../../services/eventAPI';
import AddBanquetHall from './Components/AddBanquetHall';
import EditBanquetHall from './Components/EditBanquetHall';
import BanquetHallTable from './Components/BanquetHallTable';

const BanquetHallList = () => {
  const [selectedHall, setSelectedHall] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { data: banquetHalls, isLoading, isError } = useGetBanquetHallsQuery();
  const [deleteBanquetHall] = useDeleteBanquetHallMutation();

  const handleEdit = (hall) => {
    setSelectedHall(hall);
  };

  const handleDelete = (hall) => {
    setSelectedHall(hall);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBanquetHall(selectedHall._id).unwrap();
      setShowDeleteConfirm(false);
      setSelectedHall(null);
    } catch (error) {
      console.error('Failed to delete banquet hall:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError) {
    return <div className="alert alert-danger">Error loading banquet halls</div>;
  }

  return (
    <div className="px-xl-5 px-lg-4 px-3 py-3 page-body">
      <div className="row g-3">
        <div className="col-sm-12">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <h3 className="fw-bold mb-0">Banquet Halls</h3>
            <div className="col-auto d-flex w-sm-100">
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => setShowAddModal(true)}
              >
                Add Banquet Hall
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <BanquetHallTable
                banquetHalls={banquetHalls?.data || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Banquet Hall Modal */}
      {showAddModal && (
        <AddBanquetHall onClose={() => setShowAddModal(false)} />
      )}
      
      {/* Edit Banquet Hall Modal */}
      {selectedHall && !showDeleteConfirm && (
        <EditBanquetHall
          banquetHall={selectedHall}
          onClose={() => setSelectedHall(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteConfirm(false)}
                />
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete "{selectedHall?.name}"?</p>
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
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setShowDeleteConfirm(false)} />
        </div>
      )}
    </div>
  );
};

export default BanquetHallList;
