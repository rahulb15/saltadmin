import React, { useState } from 'react';
import { useCreateHotelMutation } from '../../../../../services/hotelAPI';
import { useGetAmenitiesQuery } from '../../../../../services/amenitiesAPI';

const AddHotel = () => {
  const [createHotel, { isLoading }] = useCreateHotelMutation();
  const { data: amenitiesData, isLoading: loadingAmenities } = useGetAmenitiesQuery({
    limit: 100,
    page: 1,
  });

  const initialFormState = {
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
    amenities: [],
    policies: {
      checkInTime: '',
      checkOutTime: '',
      cancellationPolicy: '',
      childrenPolicy: '',
      petPolicy: ''
    },
    status: 'active'
  };

  const [formDataState, setFormDataState] = useState(initialFormState);
  const [showToast, setShowToast] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => 
      prevImages.filter((_, i) => i !== index)
    );
  };

  // Group amenities by category
  const groupedAmenities = React.useMemo(() => {
    if (!amenitiesData?.data?.amenities) return {};
    
    return amenitiesData.data.amenities.reduce((acc, amenity) => {
      if (!acc[amenity.category]) {
        acc[amenity.category] = [];
      }
      acc[amenity.category].push(amenity);
      return acc;
    }, {});
  }, [amenitiesData]);

  const handleInputChange = (e, section = null) => {
    const { name, value } = e.target;
    
    if (section) {
      setFormDataState(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
    } else {
      setFormDataState(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormDataState(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target;
    setFormDataState(prev => ({
      ...prev,
      address: {
        ...prev.address,
        coordinates: {
          ...prev.address.coordinates,
          [name]: value
        }
      }
    }));
  };

  const resetForm = () => {
    setFormDataState(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Convert nested objects to strings
      const addressData = JSON.stringify(formDataState.address);
      const contactData = JSON.stringify(formDataState.contact);
      const policiesData = JSON.stringify(formDataState.policies);
      const amenitiesData = JSON.stringify(formDataState.amenities);
  
      // Append basic fields
      formData.append('name', formDataState.name);
      formData.append('hotelCode', formDataState.hotelCode);
      formData.append('type', formDataState.type);
      formData.append('description', formDataState.description);
      
      // Append nested objects as strings
      formData.append('address', addressData);
      formData.append('contact', contactData);
      formData.append('policies', policiesData);
      formData.append('amenities', amenitiesData);
  
      // Append images
      if (selectedImages.length > 0) {
        selectedImages.forEach((image) => {
          formData.append('hotelImages', image);
        });
      }
  
      await createHotel(formData).unwrap();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      resetForm();
      const closeButton = document.querySelector('[data-bs-dismiss="offcanvas"]');
      if (closeButton) {
        closeButton.click();
      }
    } catch (err) {
      console.error('Failed to create hotel:', err);
    }
  };


  const renderAmenitiesSection = () => {
    if (loadingAmenities) {
      return (
        <div className="form-group mb-3">
          <label className="form-label text-muted">Loading amenities...</label>
          <select className="form-select" disabled>
            <option>Loading...</option>
          </select>
        </div>
      );
    }
    const handleAmenitySelect = (amenityId) => {
      setFormDataState(prev => ({
        ...prev,
        amenities: prev.amenities.includes(amenityId)
          ? prev.amenities.filter(id => id !== amenityId)
          : [...prev.amenities, amenityId]
      }));
    };

    const handleRemoveAmenity = (amenityId) => {
      setFormDataState(prev => ({
        ...prev,
        amenities: prev.amenities.filter(id => id !== amenityId)
      }));
    };

    const isAmenitySelected = (amenityId) => formDataState.amenities.includes(amenityId);

    return (
      <div className="form-group mb-3">
        <label className="form-label text-muted">Amenities</label>
        {/* Amenities Selection List */}
        <div className="border rounded p-2 mb-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {Object.entries(groupedAmenities).map(([category, amenities]) => (
            <div key={category} className="mb-2">
              <div className="fw-bold text-muted small mb-1">{category}</div>
              {amenities.map(amenity => (
                <div 
                  key={amenity._id} 
                  className={`btn btn-sm me-2 mb-2 ${
                    isAmenitySelected(amenity._id) 
                      ? 'btn-primary' 
                      : 'btn-outline-secondary'
                  }`}
                  onClick={() => handleAmenitySelect(amenity._id)}
                  style={{ cursor: 'pointer' }}
                >
                  {amenity.name}
                  {amenity.additionalDetails?.isComplimentary && ' (Complimentary)'}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Selected Amenities Chips */}
        <div className="selected-amenities mt-2">
          <small className="text-muted">Selected amenities: </small>
          {formDataState.amenities.length > 0 ? (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {formDataState.amenities.map(amenityId => {
                const amenity = amenitiesData?.data?.amenities.find(a => a._id === amenityId);
                return amenity ? (
                  <div 
                    key={amenityId} 
                    className="badge bg-primary d-flex align-items-center"
                    style={{ paddingRight: '0.5rem' }}
                  >
                    <span className="me-2">{amenity.name}</span>
                    <button
                      type="button"
                      className="btn btn-link text-white p-0 ms-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveAmenity(amenityId);
                      }}
                      style={{ 
                        fontSize: '1.2rem', 
                        lineHeight: 1,
                        textDecoration: 'none'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <small className="text-muted d-block mt-1">No amenities selected</small>
          )}
        </div>

        <small className="text-muted d-block mt-2">
          Click on amenities to select/deselect them. Click × to remove selected amenities.
        </small>
      </div>
    );
  };
  


        // Add this section to your render method, before the form submit buttons
        const renderImageUploadSection = () => (
          <div className="form-group mb-3">
            <label className="form-label text-muted">Hotel Images</label>
            <input
              type="file"
              className="form-control mb-2"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            
            {selectedImages.length > 0 && (
              <div className="selected-images mt-2">
                <div className="d-flex flex-wrap gap-2">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="position-relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        className="rounded"
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="progress mt-2">
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
          </div>
        );
      

  return (
    <>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="add-room" aria-labelledby="add-room">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Add Hotel</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="form-group mb-3">
              <label className="form-label text-muted">Hotel Name <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className="form-control" 
                name="name"
                value={formDataState.name}
                onChange={handleInputChange}
                placeholder="Enter hotel name"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label text-muted">Hotel Code <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                name="hotelCode"
                value={formDataState.hotelCode}
                onChange={handleInputChange}
                placeholder="Enter hotel code"
                required
              />
            </div>


            <div className="form-group mb-3">
              <label className="form-label text-muted">Hotel Category <span className="text-danger">*</span></label>
              <select 
                className="form-select"
                name="type"
                value={formDataState.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select hotel type</option>
                <option value="Express">Express</option>
                <option value="Select">Select</option>
                <option value="Premier">Premier</option>
                <option value="Autograph">Autograph</option>
                {/* <option value="Extended Stay">Extended Stay</option> */}
              </select>
            </div>

            <div className="form-group mb-3">
              <label className="form-label text-muted">Description <span className="text-danger">*</span></label>
              <textarea 
                className="form-control"
                name="description"
                value={formDataState.description}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            {/* Address Information */}
            <div className="form-group mb-3">
              <label className="form-label text-muted">Street Address <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className="form-control" 
                name="street"
                value={formDataState.address.street}
                onChange={handleAddressChange}
                placeholder="Enter street address"
                required
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label text-muted">City <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="city"
                  value={formDataState.address.city}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted">State <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="state"
                  value={formDataState.address.state}
                  onChange={handleAddressChange}
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
                  name="country"
                  value={formDataState.address.country}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted">Zip Code <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="zipCode"
                  value={formDataState.address.zipCode}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label text-muted">Latitude</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="latitude"
                  value={formDataState.address.coordinates.latitude}
                  onChange={handleCoordinatesChange}
                  step="any"
                  placeholder="e.g. 51.5074"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted">Longitude</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="longitude"
                  value={formDataState.address.coordinates.longitude}
                  onChange={handleCoordinatesChange}
                  step="any"
                  placeholder="e.g. -0.1278"
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
                  name="email"
                  value={formDataState.contact.email}
                  onChange={(e) => handleInputChange(e, 'contact')}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted">Phone <span className="text-danger">*</span></label>
                <input 
                  type="tel" 
                  className="form-control" 
                  name="phone"
                  value={formDataState.contact.phone}
                  onChange={(e) => handleInputChange(e, 'contact')}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label text-muted">Website</label>
              <input 
                type="url" 
                className="form-control" 
                name="website"
                value={formDataState.contact.website}
                onChange={(e) => handleInputChange(e, 'contact')}
                placeholder="https://"
              />
            </div>

            {/* Amenities Section */}
            {renderAmenitiesSection()}

            {/* Policies */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label text-muted">Check-in Time <span className="text-danger">*</span></label>
                <input 
                  type="time" 
                  className="form-control" 
                  name="checkInTime"
                  value={formDataState.policies.checkInTime}
                  onChange={(e) => handleInputChange(e, 'policies')}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted">Check-out Time <span className="text-danger">*</span></label>
                <input 
                  type="time" 
                  className="form-control" 
                  name="checkOutTime"
                  value={formDataState.policies.checkOutTime}
                  onChange={(e) => handleInputChange(e, 'policies')}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label text-muted">Cancellation Policy <span className="text-danger">*</span></label>
              <textarea 
                className="form-control"
                name="cancellationPolicy"
                value={formDataState.policies.cancellationPolicy}
                onChange={(e) => handleInputChange(e, 'policies')}
                rows="3"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label text-muted">Children Policy</label>
              <textarea 
                className="form-control"
                name="childrenPolicy"
                value={formDataState.policies.childrenPolicy}
                onChange={(e) => handleInputChange(e, 'policies')}
                rows="2"
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label text-muted">Pet Policy</label>
              <textarea 
                className="form-control"
                name="petPolicy"
                value={formDataState.policies.petPolicy}
                onChange={(e) => handleInputChange(e, 'policies')}
                rows="2"
              />
            </div>

            {renderImageUploadSection()}

            <div className="d-flex mt-4">
              <button 
                type="button" 
                className="btn w-100 me-1 py-2 btn-primary"
                onClick={resetForm}
              >
                Clear
              </button>
              <button 
                type="submit" 
                className="btn w-100 ms-1 py-2 btn-dark"
                disabled={isLoading || loadingAmenities}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div 
            className="toast show" 
            role="alert" 
            aria-live="assertive" 
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Success</strong>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">
              Hotel added successfully!
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Error Message Component
const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return <div className="text-danger small mt-1">{error}</div>;
};

export default AddHotel;