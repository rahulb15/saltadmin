// // src/pages/EventCategories/Components/AddCategory.jsx
// import React, { useState } from 'react';
// import { useCreateCategoryMutation } from '../../../../services/eventAPI';

// const AddCategory = () => {
//   const [createCategory, { isLoading }] = useCreateCategoryMutation();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//   });
//   const [banner, setBanner] = useState(null);
//   const [bannerPreview, setBannerPreview] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleBannerUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setBanner(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBannerPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const formDataToSubmit = new FormData();
//       formDataToSubmit.append('name', formData.name);
//       formDataToSubmit.append('description', formData.description);
//       if (banner) {
//         formDataToSubmit.append('banner', banner);
//       }

//       await createCategory(formDataToSubmit).unwrap();
//       setSuccess('Category created successfully!');
      
//       // Reset form
//       setFormData({
//         name: '',
//         description: '',
//       });
//       setBanner(null);
//       setBannerPreview(null);

//       // Close modal after success
//       setTimeout(() => {
//         const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
//         if (closeButton) {
//           closeButton.click();
//         }
//       }, 1500);

//     } catch (err) {
//       setError(err.data?.message || 'Failed to create category');
//     }
//   };

//   return (
//     <div className="modal fade" id="add-category" tabIndex="-1" aria-hidden="true">
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Add New Category</h5>
//             <button type="button" className="btn-close" data-bs-dismiss="modal" />
//           </div>
//           <div className="modal-body">
//             {error && (
//               <div className="alert alert-danger">{error}</div>
//             )}
//             {success && (
//               <div className="alert alert-success">{success}</div>
//             )}
            
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Name <span className="text-danger">*</span></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Description <span className="text-danger">*</span></label>
//                 <textarea
//                   className="form-control"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   rows="3"
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Banner Image</label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   onChange={handleBannerUpload}
//                   accept="image/*"
//                 />
//                 {bannerPreview && (
//                   <img
//                     src={bannerPreview}
//                     alt="Preview"
//                     className="mt-2"
//                     style={{ maxWidth: '200px' }}
//                   />
//                 )}
//               </div>

//               <div className="modal-footer px-0 pb-0">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={isLoading}
//                   >
//                   {isLoading ? 'Creating...' : 'Create Category'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;




// Updated AddCategory.jsx
import React, { useState } from 'react';
import { useCreateCategoryMutation } from '../../../../services/eventAPI';

const AddCategory = ({ onClose }) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

      await createCategory(formDataToSubmit).unwrap();
      setSuccess('Category created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
      });
      setBanner(null);
      setBannerPreview(null);

      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (err) {
      setError(err.data?.message || 'Failed to create category');
    }
  };

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Category</h5>
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
                    {isLoading ? 'Creating...' : 'Create Category'}
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

export default AddCategory;