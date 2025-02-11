// src/pages/EventCategories/Components/EventTypeList.jsx
import React, { useState } from 'react';
import { useDeleteEventTypeMutation } from '../../../../services/eventAPI';
import AddEventType from './AddEventType';
import EditEventType from './EditEventType';
import moment from 'moment';

const EventTypeList = ({ category }) => {
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteEventType] = useDeleteEventTypeMutation();

  const handleEdit = (eventType) => {
    setSelectedEventType(eventType);
  };

  const handleDelete = (eventType) => {
    setSelectedEventType(eventType);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteEventType({
        categoryId: category._id,
        eventTypeId: selectedEventType._id
      }).unwrap();
      setShowDeleteConfirm(false);
      setSelectedEventType(null);
    } catch (error) {
      console.error('Failed to delete event type:', error);
    }
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Event Types</h4>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          Add Event Type
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
        {category.eventTypes.map((eventType) => (
          <div key={eventType._id} className="col">
            <div className="card h-100">
              <div className="position-relative">
                <img
                  src={eventType.images[0]}
                  className="card-img-top"
                  alt={eventType.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                {eventType.images.length > 1 && (
                  <span className="position-absolute bottom-0 end-0 badge bg-dark m-2">
                    +{eventType.images.length - 1} more
                  </span>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{eventType.name}</h5>
                <p className="card-text text-muted small">{eventType.description}</p>
                
                <div className="mt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted">Capacity:</small>
                    <span>{eventType.maxCapacity || 'N/A'}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted">Price Range:</small>
                    <span>
                      {eventType.priceRange?.min && eventType.priceRange?.max
                        ? `₹${eventType.priceRange.min} - ₹${eventType.priceRange.max}`
                        : 'N/A'}
                    </span>
                  </div>
                  {eventType.amenities?.length > 0 && (
                    <div className="mb-2">
                      <small className="text-muted d-block mb-1">Amenities:</small>
                      <div className="d-flex flex-wrap gap-1">
                        {eventType.amenities.map((amenity, index) => (
                          <span key={index} className="badge bg-light text-dark">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-footer bg-white border-top-0">
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {eventType.banquetHalls?.length || 0} halls available
                  </small>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleEdit(eventType)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(eventType)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Type Modal */}
      {showAddModal && (
        <AddEventType
          categoryId={category._id}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Event Type Modal */}
      {selectedEventType && !showDeleteConfirm && (
        <EditEventType
          categoryId={category._id}
          eventType={selectedEventType}
          onClose={() => setSelectedEventType(null)}
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
                <p>Are you sure you want to delete "{selectedEventType.name}"?</p>
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

export default EventTypeList;