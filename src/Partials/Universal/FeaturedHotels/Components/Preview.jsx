//src/pages/FeaturedHotels/Components/Preview.jsx
import React from 'react';
import moment from 'moment';

const Preview = ({ open, handleClose, selectedHotel }) => {
  if (!open || !selectedHotel) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) {
      handleClose();
    }
  };

  return (
    <>
      <div 
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        style={{ display: 'block' }}
        onClick={handleBackdropClick}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Featured Hotel Preview</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                {/* Hotel Basic Info */}
                <div className="row mb-4">
                  <div className="col-md-8">
                    <h2>{selectedHotel.customTitle || selectedHotel.hotelId?.name}</h2>
                    <p className="text-muted mb-2">
                      {selectedHotel.hotelId?.address?.street}, {selectedHotel.hotelId?.address?.city}, 
                      {selectedHotel.hotelId?.address?.country}
                    </p>
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge bg-primary me-2">{selectedHotel.hotelId?.type}</span>
                      <span className="badge bg-success me-2">{selectedHotel.hotelId?.rating} ★</span>
                      {selectedHotel.isActive ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-danger">Inactive</span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4 text-md-end">
                    <div className="text-muted">
                      <div>Section: <span className="fw-bold">{selectedHotel.sectionType}</span></div>
                      <div>Position: <span className="fw-bold">{selectedHotel.position}</span></div>
                      <div>Valid until: <span className="fw-bold">{moment(selectedHotel.endDate).format('MMM DD, YYYY')}</span></div>
                    </div>
                  </div>
                </div>

                {/* Hotel Images */}
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="position-relative" style={{ height: '400px' }}>
                      <img
                        src={selectedHotel.hotelId?.mainImage || selectedHotel.hotelId?.images[0]}
                        alt={selectedHotel.hotelId?.name}
                        className="w-100 h-100 rounded"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Description and Details */}
                <div className="row mb-4">
                  <div className="col-md-8">
                    <h4>Description</h4>
                    <p>{selectedHotel.customDescription || selectedHotel.hotelId?.description}</p>

                    {selectedHotel.highlightTags?.length > 0 && (
                      <div className="mb-3">
                        <h5>Highlights</h5>
                        <div className="d-flex flex-wrap gap-2">
                          {selectedHotel.highlightTags.map((tag, index) => (
                            <span key={index} className="badge bg-info">{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}

{selectedHotel.promotionalOffer && (
                      <div className="mb-3">
                        <h5>Special Offer</h5>
                        <div className="alert alert-warning">
                          <i className="bi bi-tag-fill me-2"></i>
                          {selectedHotel.promotionalOffer}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Featured Details</h5>
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <small className="text-muted">Start Date:</small>
                            <br />
                            {moment(selectedHotel.startDate).format('MMM DD, YYYY')}
                          </li>
                          <li className="mb-2">
                            <small className="text-muted">End Date:</small>
                            <br />
                            {moment(selectedHotel.endDate).format('MMM DD, YYYY')}
                          </li>
                          <li className="mb-2">
                            <small className="text-muted">Section Type:</small>
                            <br />
                            {selectedHotel.sectionType}
                          </li>
                          <li className="mb-2">
                            <small className="text-muted">Position:</small>
                            <br />
                            {selectedHotel.position}
                          </li>
                          <li className="mb-2">
                            <small className="text-muted">Status:</small>
                            <br />
                            {selectedHotel.isActive ? (
                              <span className="text-success">Active</span>
                            ) : (
                              <span className="text-danger">Inactive</span>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Hotel Contact Information */}
                    <div className="card mt-3">
                      <div className="card-body">
                        <h5 className="card-title">Contact Information</h5>
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <small className="text-muted">Email:</small>
                            <br />
                            {selectedHotel.hotelId?.contact?.email}
                          </li>
                          <li className="mb-2">
                            <small className="text-muted">Phone:</small>
                            <br />
                            {selectedHotel.hotelId?.contact?.phone}
                          </li>
                          {selectedHotel.hotelId?.contact?.website && (
                            <li>
                              <small className="text-muted">Website:</small>
                              <br />
                              <a href={selectedHotel.hotelId.contact.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                Visit Website
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hotel Amenities */}
                {selectedHotel.hotelId?.amenities?.length > 0 && (
                  <div className="row mb-4">
                    <div className="col-12">
                      <h4>Amenities</h4>
                      <div className="d-flex flex-wrap gap-3">
                        {selectedHotel.hotelId.amenities.map((amenity) => (
                          <div key={amenity._id} className="d-flex align-items-center">
                            <i className={`bi bi-${amenity.icon} me-2`}></i>
                            {amenity.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hotel Policies */}
                {selectedHotel.hotelId?.policies && (
                  <div className="row">
                    <div className="col-12">
                      <h4>Policies</h4>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="card">
                            <div className="card-body">
                              <h6>Check-in/Check-out</h6>
                              <p className="mb-1">
                                <small className="text-muted">Check-in Time:</small>
                                <br />
                                {selectedHotel.hotelId.policies.checkInTime}
                              </p>
                              <p className="mb-0">
                                <small className="text-muted">Check-out Time:</small>
                                <br />
                                {selectedHotel.hotelId.policies.checkOutTime}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card">
                            <div className="card-body">
                              <h6>Other Policies</h6>
                              {selectedHotel.hotelId.policies.cancellationPolicy && (
                                <p className="mb-1">
                                  <small className="text-muted">Cancellation Policy:</small>
                                  <br />
                                  {selectedHotel.hotelId.policies.cancellationPolicy}
                                </p>
                              )}
                              {selectedHotel.hotelId.policies.childrenPolicy && (
                                <p className="mb-1">
                                  <small className="text-muted">Children Policy:</small>
                                  <br />
                                  {selectedHotel.hotelId.policies.childrenPolicy}
                                </p>
                              )}
                              {selectedHotel.hotelId.policies.petPolicy && (
                                <p className="mb-0">
                                  <small className="text-muted">Pet Policy:</small>
                                  <br />
                                  {selectedHotel.hotelId.policies.petPolicy}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={handleClose}></div>
    </>
  );
};

export default Preview;