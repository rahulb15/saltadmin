// src/pages/BanquetHalls/Components/EditBanquetHall.jsx
import React, { useState, useEffect } from 'react';
import { useUpdateBanquetHallMutation } from '../../../../services/eventAPI';

const EditBanquetHall = ({ banquetHall, onClose }) => {
  const [updateBanquetHall, { isLoading }] = useUpdateBanquetHallMutation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    amenities: [],
    pricing: {
      basePrice: '',
      cleaningFee: '',
      securityDeposit: ''
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    },
    rules: []
  });
  const [images, setImages] = useState([]);
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize form data with existing banquet hall data
  useEffect(() => {
    if (banquetHall) {
      setFormData({
        name: banquetHall.name || '',
        description: banquetHall.description || '',
        capacity: banquetHall.capacity || '',
        location: banquetHall.location || {
          address: '',
          city: '',
          state: '',
          zipCode: '',
        },
        amenities: banquetHall.amenities || [],
        pricing: banquetHall.pricing || {
          basePrice: '',
          cleaningFee: '',
          securityDeposit: ''
        },
        availability: banquetHall.availability || {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true
        },
        rules: banquetHall.rules || []
      });
      
      // Set existing image previews
      if (banquetHall.images) {
        setImagesPreviews(banquetHall.images);
      }
    }
  }, [banquetHall]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAmenitiesChange = (e) => {
    const value = e.target.value;
    const amenitiesList = value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      amenities: amenitiesList
    }));
  };

  const handleRulesChange = (e) => {
    const value = e.target.value;
    const rulesList = value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      rules: rulesList
    }));
  };

  const handleAvailabilityChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [name]: checked
      }
    }));
  };

  const handleImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);

    // Generate previews for new images
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(previews => {
      setImagesPreviews(previews);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.capacity) {
        setError('Please fill in all required fields');
        return;
      }

      // Create FormData for API request
      const formDataToSubmit = new FormData();
      
      // Append basic fields
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('capacity', formData.capacity);
      
      // Append nested objects as JSON strings
      formDataToSubmit.append('location', JSON.stringify(formData.location));
      formDataToSubmit.append('pricing', JSON.stringify(formData.pricing));
      formDataToSubmit.append('availability', JSON.stringify(formData.availability));
      
      // Append arrays
      formDataToSubmit.append('amenities', JSON.stringify(formData.amenities));
      formDataToSubmit.append('rules', JSON.stringify(formData.rules));

      // Append new images if any
      if (images.length > 0) {
        images.forEach((image, index) => {
          formDataToSubmit.append('images', image);
        });
      }

      // Send update request
      await updateBanquetHall({
        id: banquetHall._id,
        formData: formDataToSubmit
      }).unwrap();
      
      setSuccess('Banquet hall updated successfully!');
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err.data?.message || 'Failed to update banquet hall');
    }
  };

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Banquet Hall</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="mb-3">
                  <label className="form-label">Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description <span className="text-danger">*</span></label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Capacity <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Location Information */}
                <div className="card mb-3">
                  <div className="card-body">
                    <h6>Location Details</h6>
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="location.address"
                          value={formData.location.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="location.city"
                          value={formData.location.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="location.state"
                          value={formData.location.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">ZIP Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="location.zipCode"
                          value={formData.location.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Information */}
                <div className="card mb-3">
                  <div className="card-body">
                    <h6>Pricing Details</h6>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Base Price</label>
                        <input
                          type="number"
                          className="form-control"
                          name="pricing.basePrice"
                          value={formData.pricing.basePrice}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Cleaning Fee</label>
                        <input
                          type="number"
                          className="form-control"
                          name="pricing.cleaningFee"
                          value={formData.pricing.cleaningFee}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Security Deposit</label>
                        <input
                          type="number"
                          className="form-control"
                          name="pricing.securityDeposit"
                          value={formData.pricing.securityDeposit}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities and Rules */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Amenities (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.amenities.join(', ')}
                      onChange={handleAmenitiesChange}
                      placeholder="WiFi, Parking, Sound System, etc."
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Rules (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.rules.join(', ')}
                      onChange={handleRulesChange}
                      placeholder="No smoking, No outside food, etc."
                    />
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-3">
                  <label className="form-label d-block">Availability</label>
                  <div className="d-flex flex-wrap gap-3">
                    {Object.keys(formData.availability).map(day => (
                      <div key={day} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name={day}
                          checked={formData.availability[day]}
                          onChange={handleAvailabilityChange}
                          id={`availability-${day}`}
                        />
                        <label className="form-check-label" htmlFor={`availability-${day}`}>
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images Upload */}
                <div className="mb-3">
                  <label className="form-label">Images</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImagesUpload}
                    accept="image/*"
                    multiple
                  />
                  <small className="text-muted d-block mt-1">
                    Upload new images only if you want to replace the existing ones
                  </small>
                  <div className="mt-2 d-flex gap-2 flex-wrap">
                    {imagesPreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    ))}
                  </div>
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
                    {isLoading ? 'Updating...' : 'Update Banquet Hall'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
};

export default EditBanquetHall;