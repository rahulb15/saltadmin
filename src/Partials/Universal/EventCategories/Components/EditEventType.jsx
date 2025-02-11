
// src/pages/EventCategories/Components/EditEventType.jsx
import React, { useState, useEffect } from 'react';
import { useUpdateEventTypeMutation, useGetBanquetHallsQuery } from '../../../../services/eventAPI';

const EditEventType = ({ categoryId, eventType, onClose }) => {
  const [updateEventType, { isLoading }] = useUpdateEventTypeMutation();
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

  useEffect(() => {
    if (eventType) {
      setFormData({
        name: eventType.name || '',
        description: eventType.description || '',
        banquetHallIds: eventType.banquetHalls?.map(hall => hall._id) || [],
        amenities: eventType.amenities || [],
        maxCapacity: eventType.maxCapacity || '',
        priceRange: eventType.priceRange || { min: '', max: '' }
      });
      setImagesPreviews(eventType.images || []);
    }
  }, [eventType]);

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
      if (!formData.name || !formData.description || formData.banquetHallIds.length === 0) {
        setError('Name, description, and banquet halls are required');
        return;
      }

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('banquetHallIds', JSON.stringify(formData.banquetHallIds));
      formDataToSubmit.append('amenities', JSON.stringify(formData.amenities));
      formDataToSubmit.append('maxCapacity', formData.maxCapacity);
      formDataToSubmit.append('priceRange', JSON.stringify(formData.priceRange));

      if (images.length > 0) {
        images.forEach(image => {
          formDataToSubmit.append('images', image);
        });
      }

      await updateEventType({
        categoryId,
        eventTypeId: eventType._id,
        formData: formDataToSubmit
      }).unwrap();

      setSuccess('Event type updated successfully!');
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err.data?.message || 'Failed to update event type');
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Event Type</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger">{error}</div>
            )}
            {success && (
              <div className="alert alert-success">{success}</div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Same form fields as AddEventType */}
              {/* ... Copy the form fields from AddEventType component ... */}
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
                  {isLoading ? 'Updating...' : 'Update Event Type'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} />
    </div>
  );
};

export default EditEventType;