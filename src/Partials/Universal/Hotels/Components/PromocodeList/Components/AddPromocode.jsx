// import React from 'react'

// const AddPromocode = () => {
//   return (
//     <div className="modal fade" id="add-promocode" tabIndex="-1"  aria-hidden="true">
//         <div className="modal-dialog">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h1 className="modal-title fs-5">Add Promocode List</h1>
//                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div className="modal-body">
//                     <form>
//                         <div className="form-group mb-3">
//                             <label className="form-label text-muted">Room Type</label>
//                             <select className="form-select">
//                                 <option defaultValue='selected'>Choose Room Type</option>
//                                 <option value="1">Singal</option>
//                                 <option value="2">Double</option>
//                                 <option value="3">Tripal</option>
//                                 <option value="4">Quad</option>
//                                 <option value="6">Queen</option>
//                                 <option value="7">King</option>
//                                 <option value="8">Others</option>
//                             </select>
//                         </div>
//                         <div className="form-group mb-3">
//                             <label className="form-label text-muted">From</label>
//                             <input type="date" className="form-control"/>
//                         </div>
//                         <div className="form-group mb-3">
//                             <label className="form-label text-muted">To</label>
//                             <input type="date" className="form-control"/>
//                         </div>
//                         <div className="form-group mb-3">
//                             <label className="form-label text-muted">Discount</label>
//                             <input type="text" className="form-control"/>
//                         </div>
//                         <div className="form-group mb-3">
//                             <label className="form-label text-muted">Promocode</label>
//                             <input type="text" className="form-control"/>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="modal-footer">
//                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                     <button type="button" className="btn btn-primary">Save changes</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AddPromocode


// src/components/promocodes/Components/AddPromocode.js
import React, { useState } from 'react';
import { useCreatePromocodeMutation } from '../../../../../../services/promocodeAPI';

const AddPromocode = () => {
  const [createPromocode, { isLoading }] = useCreatePromocodeMutation();

  const [formData, setFormData] = useState({
    code: '',
    roomType: '',
    validFrom: '',
    validTo: '',
    discountType: 'FIXED',
    discountValue: '',
    maxDiscountAmount: '',
    minBookingAmount: '',
    maxUsageCount: '',
    isActive: true
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Validate form data
      if (!formData.code.trim()) {
        setError('Promocode is required');
        return;
      }

      // Format numbers
      const submissionData = {
        ...formData,
        discountValue: parseFloat(formData.discountValue),
        maxDiscountAmount: formData.maxDiscountAmount ? parseFloat(formData.maxDiscountAmount) : null,
        minBookingAmount: formData.minBookingAmount ? parseFloat(formData.minBookingAmount) : 0,
        maxUsageCount: formData.maxUsageCount ? parseInt(formData.maxUsageCount) : null
      };

      await createPromocode(submissionData).unwrap();
      setSuccess('Promocode created successfully!');
      
      // Reset form
      setFormData({
        code: '',
        roomType: '',
        validFrom: '',
        validTo: '',
        discountType: 'FIXED',
        discountValue: '',
        maxDiscountAmount: '',
        minBookingAmount: '',
        maxUsageCount: '',
        isActive: true
      });

      // Close modal after successful creation
      setTimeout(() => {
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (closeButton) {
          closeButton.click();
        }
      }, 1500);

    } catch (err) {
      setError(err.data?.message || 'Failed to create promocode');
    }
  };

  return (
    <div className="modal fade" id="add-promocode" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Add Promocode</h1>
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
                <label className="form-label text-muted">Promocode <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label text-muted">Room Type <span className="text-danger">*</span></label>
                <select
                  className="form-select"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Room Type</option>
                  <option value="SINGLE">Single</option>
                  <option value="DOUBLE">Double</option>
                  <option value="TRIPLE">Triple</option>
                  <option value="QUAD">Quad</option>
                  <option value="QUEEN">Queen</option>
                  <option value="KING">King</option>
                  <option value="OTHERS">Others</option>
                </select>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-muted">Valid From <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      name="validFrom"
                      value={formData.validFrom}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-muted">Valid To <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      name="validTo"
                      value={formData.validTo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-muted">Discount Type <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="discountType"
                      value={formData.discountType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="FIXED">Fixed Amount</option>
                      <option value="PERCENTAGE">Percentage</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-muted">Discount Value <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      name="discountValue"
                      value={formData.discountValue}
                      onChange={handleInputChange}
                      min="0"
                      step={formData.discountType === 'PERCENTAGE' ? '0.01' : '1'}
                      required
                    />
                  </div>
                </div>
              </div>

              {formData.discountType === 'PERCENTAGE' && (
                <div className="form-group mb-3">
                  <label className="form-label text-muted">Maximum Discount Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="maxDiscountAmount"
                    value={formData.maxDiscountAmount}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              )}

              <div className="form-group mb-3">
                <label className="form-label text-muted">Minimum Booking Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="minBookingAmount"
                  value={formData.minBookingAmount}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label text-muted">Maximum Usage Count</label>
                <input
                  type="number"
                  className="form-control"
                  name="maxUsageCount"
                  value={formData.maxUsageCount}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="Leave empty for unlimited usage"
                />
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="isActive">
                  Active
                </label>
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
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPromocode;