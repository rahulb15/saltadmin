// EditHotel.jsx
import React, { useState, useEffect } from 'react';
import { useUpdateHotelMutation } from '../../../../../services/hotelAPI';
import { useGetAmenitiesQuery } from '../../../../../services/amenitiesAPI';

const EditHotel = ({ selectedHotel, onClose }) => {
  const [updateHotel, { isLoading: isUpdating }] = useUpdateHotelMutation();
  const { data: amenitiesData } = useGetAmenitiesQuery({ limit: 100 });
  const [selectedFiles, setSelectedFiles] = useState([]);
const [previewUrls, setPreviewUrls] = useState([]);
const [uploadProgress, setUploadProgress] = useState(0);
const [showImagePreview, setShowImagePreview] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    hotelCode: '',
    type: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      coordinates: {
        latitude: '',
        longitude: ''
      }
    },
    contact: {
      email: '',
      phone: '',
      website: ''
    },
	images: [],
    amenities: [],
    policies: {
      checkInTime: '',
      checkOutTime: '',
      cancellationPolicy: '',
      childrenPolicy: '',
      petPolicy: ''
    },
    status: 'active'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (selectedHotel) {
      console.log(selectedHotel,"selectedHotel");
      setFormData({
        name: selectedHotel.name || '',
        hotelCode: selectedHotel.hotelCode || '',
        type: selectedHotel.type || '',
        description: selectedHotel.description || '',
        address: {
          street: selectedHotel.address?.street || '',
          city: selectedHotel.address?.city || '',
          state: selectedHotel.address?.state || '',
          country: selectedHotel.address?.country || '',
          zipCode: selectedHotel.address?.zipCode || '',
          coordinates: {
            latitude: selectedHotel.address?.coordinates?.latitude || '',
            longitude: selectedHotel.address?.coordinates?.longitude || ''
          }
        },
        contact: {
          email: selectedHotel.contact?.email || '',
          phone: selectedHotel.contact?.phone || '',
          website: selectedHotel.contact?.website || ''
        },
        amenities: selectedHotel.amenities || [],
        policies: {
          checkInTime: selectedHotel.policies?.checkInTime || '',
          checkOutTime: selectedHotel.policies?.checkOutTime || '',
          cancellationPolicy: selectedHotel.policies?.cancellationPolicy || '',
          childrenPolicy: selectedHotel.policies?.childrenPolicy || '',
          petPolicy: selectedHotel.policies?.petPolicy || ''
        },
        status: selectedHotel.status || 'active'
      });
    }
  }, [selectedHotel]);

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       await updateHotel({
//         id: selectedHotel._id,
//         ...formData
//       }).unwrap();
      
//       setSuccess('Hotel updated successfully!');
//       setTimeout(() => {
//         const closeButton = document.querySelector('[data-bs-dismiss="offcanvas"]');
//         if (closeButton) {
//           closeButton.click();
//         }
//       }, 1500);
//     } catch (err) {
//       setError(err.data?.message || 'Failed to update hotel');
//     }
//   };


const handleSubmit = async (e) => {
	e.preventDefault();
	setError('');
	setSuccess('');
  
	try {
	  const formDataToSend = new FormData();
  
	  // Append all existing form data
	  Object.keys(formData).forEach(key => {
		if (key !== 'images') {
		  if (typeof formData[key] === 'object') {
			formDataToSend.append(key, JSON.stringify(formData[key]));
		  } else {
			formDataToSend.append(key, formData[key]);
		  }
		}
	  });
  
	  // Append existing images
	  formData.images.forEach(image => {
		formDataToSend.append('existingImages', image);
	  });
  
	  // Append new images
	  selectedFiles.forEach(file => {
		formDataToSend.append('hotelImages', file);
	  });
  
	  await updateHotel({
		id: selectedHotel._id,
		data: formDataToSend
	  }).unwrap();
	  
	  setSuccess('Hotel updated successfully!');
	  setTimeout(() => {
		const closeButton = document.querySelector('[data-bs-dismiss="offcanvas"]');
		if (closeButton) {
		  closeButton.click();
		}
	  }, 1500);
	} catch (err) {
	  setError(err.data?.message || 'Failed to update hotel');
	}
  };



// Add this to your useEffect
useEffect(() => {
	if (selectedHotel) {
	  setFormData(prev => ({
		...prev,
		images: selectedHotel.images || []
	  }));
	}
  }, [selectedHotel]);
  
  // Add these handlers for image management
  const handleImageChange = (e) => {
	const files = Array.from(e.target.files);
	setSelectedFiles(prev => [...prev, ...files]);
	
	// Create preview URLs for new files
	const newPreviewUrls = files.map(file => URL.createObjectURL(file));
	setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };
  
  const removeImage = (index, type) => {
	if (type === 'existing') {
	  setFormData(prev => ({
		...prev,
		images: prev.images.filter((_, i) => i !== index)
	  }));
	} else {
	  setSelectedFiles(prev => prev.filter((_, i) => i !== index));
	  setPreviewUrls(prev => {
		// Revoke the URL to avoid memory leaks
		URL.revokeObjectURL(prev[index]);
		return prev.filter((_, i) => i !== index);
	  });
	}
  };
  
  const handleImagePreview = (image) => {
	setSelectedImage(image);
	setShowImagePreview(true);
  };
  
  // Add the image preview modal component
  const ImagePreviewModal = ({ image, show, onClose }) => {
	if (!show) return null;
  
	return (
	  <>
		<div className="modal fade show" 
		  style={{ display: 'block' }} 
		  tabIndex="-1"
		>
		  <div className="modal-dialog modal-lg modal-dialog-centered">
			<div className="modal-content">
			  <div className="modal-header">
				<h5 className="modal-title">Image Preview</h5>
				<button 
				  type="button" 
				  className="btn-close" 
				  onClick={onClose}
				></button>
			  </div>
			  <div className="modal-body text-center">
				<img 
				  src={image} 
				  alt="Preview" 
				  style={{ maxWidth: '100%', maxHeight: '70vh' }} 
				/>
			  </div>
			</div>
		  </div>
		</div>
		<div className="modal-backdrop fade show" onClick={onClose}></div>
	  </>
	);
  };
  






  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="edit-room" aria-labelledby="edit-room">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Edit Hotel</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="form-group mb-3">
            <label className="form-label text-muted">Hotel Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-muted">Hotel Code <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="hotelCode"
              value={formData.hotelCode}
              onChange={handleInputChange}
              required
            />
          </div>
          

          <div className="form-group mb-3">
            <label className="form-label text-muted">Hotel Type <span className="text-danger">*</span></label>
            <select
              className="form-select"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Business">Business</option>
              <option value="Resort">Resort</option>
              <option value="Boutique">Boutique</option>
              <option value="Airport">Airport</option>
              <option value="Extended Stay">Extended Stay</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-muted">Description <span className="text-danger">*</span></label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              required
            ></textarea>
          </div>

          {/* Address Information */}
          <div className="form-group mb-3">
            <label className="form-label text-muted">Street Address <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label text-muted">City <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                required
              />
            </div>
			<div className="col-md-6">
			<label className="form-label text-muted">State <span className="text-danger">*</span></label>
			<input
                type="text"
                className="form-control"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label text-muted">Country <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="address.country"
                value={formData.address.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted">Zip Code <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label text-muted">Email <span className="text-danger">*</span></label>
              <input
                type="email"
                className="form-control"
                name="contact.email"
                value={formData.contact.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted">Phone <span className="text-danger">*</span></label>
              <input
                type="tel"
                className="form-control"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-muted">Website</label>
            <input
              type="url"
              className="form-control"
              name="contact.website"
              value={formData.contact.website}
              onChange={handleInputChange}
              placeholder="https://"
            />
          </div>

          {/* Amenities Section */}
          <div className="form-group mb-3">
            <label className="form-label text-muted">Amenities</label>
            <div className="border rounded p-3">
              <div className="row g-2">
                {amenitiesData?.data?.amenities?.map(amenity => (
                  <div key={amenity._id} className="col-md-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`amenity-${amenity._id}`}
                        checked={formData.amenities.includes(amenity._id)}
                        onChange={(e) => {
                          const updatedAmenities = e.target.checked
                            ? [...formData.amenities, amenity._id]
                            : formData.amenities.filter(id => id !== amenity._id);
                          setFormData(prev => ({
                            ...prev,
                            amenities: updatedAmenities
                          }));
                        }}
                      />
                      <label className="form-check-label" htmlFor={`amenity-${amenity._id}`}>
                        {amenity.name}
                        {amenity.additionalDetails?.isComplimentary && 
                          <span className="badge bg-success ms-1">Complimentary</span>
                        }
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {console.log(formData.policies.checkInTime + "hhhhh " + formData.policies.checkOutTime)}

          {/* Policies */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label text-muted">Check-in Time <span className="text-danger">*</span></label>
              <input
                type="time"
                className="form-control"
                name="policies.checkInTime"
                value={formData.policies.checkInTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted">Check-out Time <span className="text-danger">*</span></label>
              <input
                type="time"
                className="form-control"
                name="policies.checkOutTime"
                value={formData.policies.checkOutTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-muted">Cancellation Policy <span className="text-danger">*</span></label>
            <textarea
              className="form-control"
              name="policies.cancellationPolicy"
              value={formData.policies.cancellationPolicy}
              onChange={handleInputChange}
              rows="2"
              required
            ></textarea>
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-muted">Children Policy</label>
            <textarea
              className="form-control"
              name="policies.childrenPolicy"
              value={formData.policies.childrenPolicy}
              onChange={handleInputChange}
              rows="2"
            ></textarea>
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-muted">Pet Policy</label>
            <textarea
              className="form-control"
              name="policies.petPolicy"
              value={formData.policies.petPolicy}
              onChange={handleInputChange}
              rows="2"
            ></textarea>
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-muted">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

		  <div className="form-group mb-3">
  <label className="form-label text-muted">Hotel Images</label>
  
  {/* Existing Images */}
  {formData.images.length > 0 && (
    <div className="mb-3">
      <label className="form-label text-muted">Existing Images</label>
      <div className="row g-2">
        {formData.images.map((image, index) => (
          <div key={`existing-${index}`} className="col-md-4 col-6">
            <div className="position-relative border rounded p-1">
              <img
                src={image}
                alt={`Hotel ${index + 1}`}
                className="img-fluid rounded cursor-pointer"
                style={{ 
                  height: '150px', 
                  width: '100%', 
                  objectFit: 'cover',
                  cursor: 'pointer' 
                }}
                onClick={() => handleImagePreview(image)}
              />
              <button
                type="button"
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                onClick={() => removeImage(index, 'existing')}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* New Images */}
  {previewUrls.length > 0 && (
    <div className="mb-3">
      <label className="form-label text-muted">New Images</label>
      <div className="row g-2">
        {previewUrls.map((url, index) => (
          <div key={`new-${index}`} className="col-md-4 col-6">
            <div className="position-relative border rounded p-1">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="img-fluid rounded"
                style={{ 
                  height: '150px', 
                  width: '100%', 
                  objectFit: 'cover',
                  cursor: 'pointer' 
                }}
                onClick={() => handleImagePreview(url)}
              />
              <button
                type="button"
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                onClick={() => removeImage(index, 'new')}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Upload Progress */}
  {uploadProgress > 0 && uploadProgress < 100 && (
    <div className="progress mb-3">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${uploadProgress}%` }}
        aria-valuenow={uploadProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {uploadProgress}%
      </div>
    </div>
  )}

  {/* File Input */}
  <div className="input-group">
    <input
      type="file"
      className="form-control"
      accept="image/*"
      multiple
      onChange={handleImageChange}
    />
  </div>
  <small className="text-muted">You can select multiple images</small>
</div>

{/* Image Preview Modal */}
<ImagePreviewModal
  image={selectedImage}
  show={showImagePreview}
  onClose={() => setShowImagePreview(false)}
/>




          <div className="d-flex mt-4 pt-3 border-top">
            <button
              type="button"
              className="btn btn-secondary me-2"
              data-bs-dismiss="offcanvas"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHotel;