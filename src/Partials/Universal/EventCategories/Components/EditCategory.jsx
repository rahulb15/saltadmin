// src/pages/EventCategories/Components/EditCategory.jsx
import React, { useState, useEffect } from 'react';
import { useUpdateCategoryMutation } from '../../../../services/eventAPI';

const EditCategory = ({ category, onClose }) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
      });
      setBannerPreview(category.banner || null);
    }
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBanner(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('description', formData.description);
      if (banner) {
        formDataToSubmit.append('banner', banner);
      }

      await updateCategory({ 
        id: category._id, 
        formData: formDataToSubmit 
      }).unwrap();
      
      setSuccess('Category updated successfully!');
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err.data?.message || 'Failed to update category');
    }
  };

  return (
    <>
      <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Category</h5>
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
                  <label className="form-label">Banner Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleBannerUpload}
                    accept="image/*"
                  />
                  {bannerPreview && (
                    <img
                      src={bannerPreview}
                      alt="Preview"
                      className="mt-2"
                      style={{ maxWidth: '200px' }}
                    />
                  )}
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
                    {isLoading ? 'Updating...' : 'Update Category'}
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

export default EditCategory;