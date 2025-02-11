// src/pages/BanquetHalls/Components/BanquetHallTable.jsx
import React from 'react';
import moment from 'moment';

const BanquetHallTable = ({ banquetHalls, onEdit, onDelete }) => {
  return (
    <div>
      {banquetHalls.map((hall) => (
        <div key={hall._id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex align-items-start">
                <div className="image-grid me-3">
                  {hall.images.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${hall.name} - ${index + 1}`}
                      className="rounded"
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        marginRight: '5px',
                        marginBottom: '5px'
                      }}
                    />
                  ))}
                </div>
                <div>
                  <h5 className="mb-1">{hall.name}</h5>
                  <p className="text-muted mb-1">{hall.description}</p>
                  <div className="mb-1">
                    <strong>Capacity:</strong> {hall.capacity} people
                  </div>
                  <div className="mb-1">
                    <strong>Location:</strong> {hall.location.city}, {hall.location.state}
                  </div>
                  <div className="mb-1">
                    <strong>Base Price:</strong> ₹{hall.pricing.basePrice}
                  </div>
                  {hall.amenities.length > 0 && (
                    <div className="mb-1">
                      <strong>Amenities:</strong>
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {hall.amenities.map((amenity, index) => (
                          <span key={index} className="badge bg-light text-dark">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <small className="text-muted">
                    Created: {moment(hall.createdAt).format('DD MMM YYYY')}
                  </small>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => onEdit(hall)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(hall)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BanquetHallTable;