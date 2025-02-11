// import React from 'react'

// const AddAmenities = () => {
//   return (
//     <div className="modal fade" id="add-complementary" tabIndex="-1"  aria-hidden="true">
// 		<div className="modal-dialog">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h1 className="modal-title fs-5">Add Complementary</h1>
//                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div className="modal-body">
//                     <form>
//                         <div className="form-group mb-3">
//                             <label className="form-label text-muted">Room Type <span className="text-danger">*</span></label>
//                             <select className="form-select"><option>Family Room</option><option value="1">Standard Room</option><option value="2">Singal</option><option value="3">Studio</option><option value="4">Queen</option><option value="6">King</option><option value="7">Cabana</option><option value="8">Connecting</option></select>
//                         </div>
//                         <div className="form-group mb-3">
//                             <label className="form-label text-muted">Complementary</label>
//                             <input type="text" className="form-control"/>
//                         </div>
//                         <div className="form-group">
//                             <label className="form-label text-muted">Commission Rate</label>
//                             <input type="text" className="form-control"  placeholder="Commission Rate"/>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="modal-footer">
//                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                     <button type="button" className="btn btn-primary">Save changes</button>
//                 </div>
//             </div>
// 		</div>
// 	</div>
//   )
// }

// export default AddAmenities



import React, { useState } from 'react';
import { useCreateAmenityMutation } from '../../../../../services/amenitiesAPI';
// import { Loader2 } from 'lucide-react';

const AddAmenities = () => {
  const [createAmenity, { isLoading }] = useCreateAmenityMutation();

  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    category: '',
    description: '',
    roomTypes: [], // Array of room types this amenity is available for
    additionalDetails: {
      commissionRate: '',
      isComplimentary: true,
      availability: 'all', // all, weekends, weekdays
    }
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleRoomTypesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      roomTypes: selectedOptions
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Validate form data
      if (!formData.name.trim()) {
        setError('Name is required');
        return;
      }

      // Format commission rate as number
      const submissionData = {
        ...formData,
        additionalDetails: {
          ...formData.additionalDetails,
          commissionRate: formData.additionalDetails.commissionRate 
            ? parseFloat(formData.additionalDetails.commissionRate) 
            : 0
        }
      };

      await createAmenity(submissionData).unwrap();
      setSuccess('Amenity created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        icon: '',
        category: '',
        description: '',
        roomTypes: [],
        additionalDetails: {
          commissionRate: '',
          isComplimentary: true,
          availability: 'all'
        }
      });

      // Close modal after successful creation
      setTimeout(() => {
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (closeButton) {
          closeButton.click();
        }
      }, 1500);

    } catch (err) {
      setError(err.data?.message || 'Failed to create amenity');
    }
  };

  return (
    <div className="modal fade" id="add-complementary" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Add Amenity</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
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
              <div className="form-group mb-3">
                <label className="form-label text-muted">Amenity Name <span className="text-danger">*</span></label>
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
                <label className="form-label text-muted">Category <span className="text-danger">*</span></label>
                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="BASIC">Basic</option>
                  <option value="PREMIUM">Premium</option>
                  <option value="LUXURY">Luxury</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label className="form-label text-muted">Room Types</label>
                <select
                  className="form-select"
                  multiple
                  name="roomTypes"
                  value={formData.roomTypes}
                  onChange={handleRoomTypesChange}
                >
                  <option value="Family">Family Room</option>
                  <option value="Standard">Standard Room</option>
                  <option value="Single">Single Room</option>
                  <option value="Studio">Studio</option>
                  <option value="Queen">Queen Room</option>
                  <option value="King">King Room</option>
                  <option value="Cabana">Cabana</option>
                  <option value="Connecting">Connecting Room</option>
                </select>
                <small className="text-muted">Hold Ctrl/Cmd to select multiple</small>
              </div>

              <div className="form-group mb-3">
                <label className="form-label text-muted">Icon (FontAwesome class)</label>
                <input
                  type="text"
                  className="form-control"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="e.g., fa-wifi"
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label text-muted">Commission Rate (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="additionalDetails.commissionRate"
                  value={formData.additionalDetails.commissionRate}
                  onChange={handleInputChange}
                  placeholder="Commission Rate"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label text-muted">Availability</label>
                <select
                  className="form-select"
                  name="additionalDetails.availability"
                  value={formData.additionalDetails.availability}
                  onChange={handleInputChange}
                >
                  <option value="all">All Days</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="weekdays">Weekdays Only</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isComplimentary"
                    name="additionalDetails.isComplimentary"
                    checked={formData.additionalDetails.isComplimentary}
                    onChange={(e) => handleInputChange({
                      target: {
                        name: 'additionalDetails.isComplimentary',
                        value: e.target.checked
                      }
                    })}
                  />
                  <label className="form-check-label" htmlFor="isComplimentary">
                    Is Complimentary
                  </label>
                </div>
              </div>

              <div className="form-group mb-3">
                <label className="form-label text-muted">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>

              <div className="modal-footer px-0 pb-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      {/* <Loader2 className="animate-spin inline mr-2" /> */}
                      Saving...
                    </>
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAmenities;