//src/pages/FeaturedHotels/Components/EditFeaturedHotel.jsx
import React, { useState, useEffect } from 'react';
import { useUpdateFeaturedHotelMutation } from '../../../../services/featuredHotelAPI';
import moment from 'moment';

const EditFeaturedHotel = ({ selectedHotel, onClose }) => {
  const [updateFeaturedHotel, { isLoading }] = useUpdateFeaturedHotelMutation();
  const [formData, setFormData] = useState({
    sectionType: '',
    position: '',
    startDate: '',
    endDate: '',
    customTitle: '',
    customDescription: '',
    highlightTags: [],
    promotionalOffer: '',
    isActive: true
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (selectedHotel) {
      setFormData({
        sectionType: selectedHotel.sectionType || 'featured',
        position: selectedHotel.position || '',
        startDate: moment(selectedHotel.startDate).format('YYYY-MM-DD'),
        endDate: moment(selectedHotel.endDate).format('YYYY-MM-DD'),
        customTitle: selectedHotel.customTitle || '',
        customDescription: selectedHotel.customDescription || '',
        highlightTags: selectedHotel.highlightTags || [],
        promotionalOffer: selectedHotel.promotionalOffer || '',
        isActive: selectedHotel.isActive
      });
    }
  }, [selectedHotel]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({
      ...prev,
      highlightTags: tags
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const dataToSubmit = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString()
      };

      await updateFeaturedHotel({ 
        id: selectedHotel._id, 
        data: dataToSubmit 
      }).unwrap();
      
      setSuccess('Featured hotel updated successfully!');
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err.data?.message || 'Failed to update featured hotel');
    }
  };

  return (
    <div className="modal fade show" 
      tabIndex="-1" 
      role="dialog"
      style={{ display: 'block' }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Featured Hotel</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger">{error}</div>
            )}
            {success && (
              <div className="alert alert-success">{success}</div>
            )}

            {/* Selected Hotel Info */}
            <div className="mb-4">
              <div className="d-flex align-items-center">
                <img
                  src={selectedHotel?.hotelId?.mainImage || selectedHotel?.hotelId?.images[0]}
                  alt={selectedHotel?.hotelId?.name}
                  className="me-3 rounded"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <div>
                  <h5 className="mb-1">{selectedHotel?.hotelId?.name}</h5>
                  <p className="mb-1 text-muted">
                    {selectedHotel?.hotelId?.address?.city}, {selectedHotel?.hotelId?.address?.country}
                  </p>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary me-2">{selectedHotel?.hotelId?.type}</span>
                    <span className="badge bg-success">{selectedHotel?.hotelId?.rating} ★</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Section Type */}
              <div className="mb-3">
                <label className="form-label">Section Type</label>
                <select
                  className="form-select"
                  name="sectionType"
                  value={formData.sectionType}
                  onChange={handleInputChange}
                >
                  <option value="featured">Featured</option>
                  <option value="trending">Trending</option>
                  <option value="topRated">Top Rated</option>
                  <option value="recommended">Recommended</option>
                </select>
              </div>

              {/* Position */}
              <div className="mb-3">
                <label className="form-label">Position</label>
                <input
                  type="number"
                  className="form-control"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              {/* Dates */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Custom Title and Description */}
              <div className="mb-3">
                <label className="form-label">Custom Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="customTitle"
                  value={formData.customTitle}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Custom Description</label>
                <textarea
                  className="form-control"
                  name="customDescription"
                  value={formData.customDescription}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              {/* Highlight Tags */}
              <div className="mb-3">
                <label className="form-label">Highlight Tags (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.highlightTags.join(', ')}
                  onChange={handleTagsChange}
                />
              </div>

              {/* Promotional Offer */}
              <div className="mb-3">
                <label className="form-label">Promotional Offer</label>
                <input
                  type="text"
                  className="form-control"
                  name="promotionalOffer"
                  value={formData.promotionalOffer}
                  onChange={handleInputChange}
                />
              </div>

              {/* Active Status */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="isActive">Active</label>
              </div>

              <div className="modal-footer px-0 pb-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Featured Hotel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </div>
  );
};

export default EditFeaturedHotel;