
// src/pages/EventCategories/Components/AddEventType.jsx
import React, { useState } from 'react';
import { useAddEventTypeMutation, useGetBanquetHallsQuery } from '../../../../services/eventAPI';

const AddEventType = ({ categoryId, onClose }) => {
  const [addEventType, { isLoading }] = useAddEventTypeMutation();
  const { data: banquetHalls } = useGetBanquetHallsQuery();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    banquetHallIds: [],
    amenities: [],
    maxCapacity: '',
    priceRange: {
      min: '',
      max: ''
    }
  });
  const [images, setImages] = useState([]);
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('priceRange.')) {
      const priceField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        priceRange: {
          ...prev.priceRange,
          [priceField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleBanquetHallChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      banquetHallIds: selectedOptions
    }));
  };

  const handleAmenitiesChange = (e) => {
    const value = e.target.value;
    const amenitiesList = value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      amenities: amenitiesList
    }));
  };

  const handleImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);

    // Generate previews
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
      if (!formData.name || !formData.description || formData.banquetHallIds.length === 0 || images.length === 0) {
        setError('Name, description, banquet halls, and at least one image are required');
        return;
      }

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('banquetHallIds', JSON.stringify(formData.banquetHallIds));
      formDataToSubmit.append('amenities', JSON.stringify(formData.amenities));
      formDataToSubmit.append('maxCapacity', formData.maxCapacity);
      formDataToSubmit.append('priceRange', JSON.stringify(formData.priceRange));

      images.forEach(image => {
        formDataToSubmit.append('images', image);
      });

      await addEventType({ 
        categoryId, 
        formData: formDataToSubmit 
      }).unwrap();
      
      setSuccess('Event type added successfully!');
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err.data?.message || 'Failed to add event type');
    }
  };

  return (
    <>
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <div className="modal-dialog modal-lg" style={{ zIndex: 1050 }}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Event Type</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="modal-body">
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          {success && (
            <div className="alert alert-success">{success}</div>
          )}
          
          <form onSubmit={handleSubmit}>
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
                <label className="form-label">Banquet Halls <span className="text-danger">*</span></label>
                <select
                  className="form-select"
                  multiple
                  value={formData.banquetHallIds}
                  onChange={handleBanquetHallChange}
                  required
                >
                  {banquetHalls?.data?.map(hall => (
                    <option key={hall._id} value={hall._id}>
                      {hall.name} ({hall.capacity} capacity)
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Images <span className="text-danger">*</span></label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImagesUpload}
                  accept="image/*"
                  multiple
                  required
                />
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

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Maximum Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="maxCapacity"
                    value={formData.maxCapacity}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Amenities (comma-separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="amenities"
                    value={formData.amenities.join(', ')}
                    onChange={handleAmenitiesChange}
                    placeholder="WiFi, Parking, etc."
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Minimum Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="priceRange.min"
                    value={formData.priceRange.min}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Maximum Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="priceRange.max"
                    value={formData.priceRange.max}
                    onChange={handleInputChange}
                  />
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
                    {isLoading ? 'Adding...' : 'Add Event Type'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEventType;