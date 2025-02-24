// import React, { useState } from 'react';
// import { useCreateFeaturedHotelMutation } from '../../../../services/featuredHotelAPI';
// import HotelSelector from './HotelSelector';

// const AddFeaturedHotel = () => {
//   const [createFeaturedHotel, { isLoading }] = useCreateFeaturedHotelMutation();
//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [showHotelSelector, setShowHotelSelector] = useState(false);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [customImages, setCustomImages] = useState([]);
//   const [formData, setFormData] = useState({
//     sectionType: 'featured',
//     position: '',
//     startDate: '',
//     endDate: '',
//     customTitle: '',
//     customDescription: '',
//     highlightTags: [],
//     promotionalOffer: '',
//     customAmenities: [],
//     displayPrice: {
//       basePrice: '',
//       discountedPrice: '',
//       discountPercentage: '',
//       currency: 'INR'
//     },
//     specialFeatures: [],
//     isActive: true
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name.includes('displayPrice.')) {
//       const priceField = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         displayPrice: {
//           ...prev.displayPrice,
//           [priceField]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   const handleTagsChange = (e) => {
//     const tags = e.target.value.split(',').map(tag => tag.trim());
//     setFormData(prev => ({
//       ...prev,
//       highlightTags: tags
//     }));
//   };

//   const handleHotelSelect = (hotel) => {
//     setSelectedHotel(hotel);
//     setShowHotelSelector(false);
//     // Pre-fill fields and set default images
//     setFormData(prev => ({
//       ...prev,
//       customTitle: hotel.name,
//       customDescription: hotel.description
//     }));
//     setSelectedImages(hotel.images.map((url, index) => ({
//       id: index,
//       url,
//       isSelected: true
//     })));
//   };

//   const handleImageSelect = (imageId) => {
//     setSelectedImages(prev =>
//       prev.map(img => 
//         img.id === imageId 
//           ? { ...img, isSelected: !img.isSelected }
//           : img
//       )
//     );
//   };

//   // const handleCustomImageUpload = (e) => {
//   //   const files = Array.from(e.target.files);
//   //   const newImages = files.map(file => ({
//   //     id: `custom-${Date.now()}-${file.name}`,
//   //     file,
//   //     url: URL.createObjectURL(file),
//   //     isSelected: true,
//   //     isCustom: true
//   //   }));
//   //   setCustomImages(prev => [...prev, ...newImages]);
//   // };

//   const handleCustomImageUpload = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Get current length of selected images for position indexing
//     const startingIndex = selectedImages.length;
    
//     const newImages = files.map((file, index) => ({
//       id: `custom-${Date.now()}-${file.name}`,
//       file,
//       url: URL.createObjectURL(file),
//       isSelected: true,
//       isCustom: true,
//       position: startingIndex + index // Add position for order tracking
//     }));
    
//     setCustomImages(prev => [...prev, ...newImages]);
//   };



//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setError('');
//   //   setSuccess('');

//   //   if (!selectedHotel) {
//   //     setError('Please select a hotel');
//   //     return;
//   //   }

//   //   try {
//   //     // Create FormData for file upload
//   //     const formDataToSubmit = new FormData();
//   //     formDataToSubmit.append('hotelId', selectedHotel._id);
      
//   //     // Append all form fields
//   //     Object.keys(formData).forEach(key => {
//   //       if (key === 'displayPrice') {
//   //         formDataToSubmit.append(key, JSON.stringify(formData[key]));
//   //       } else if (Array.isArray(formData[key])) {
//   //         formDataToSubmit.append(key, JSON.stringify(formData[key]));
//   //       } else {
//   //         formDataToSubmit.append(key, formData[key]);
//   //       }
//   //     });

//   //     // Append selected hotel images
//   //     const selectedHotelImages = selectedImages
//   //       .filter(img => img.isSelected)
//   //       .map(img => img.url);
//   //     formDataToSubmit.append('selectedHotelImages', JSON.stringify(selectedHotelImages));

//   //     // Append custom images
//   //     customImages
//   //       .filter(img => img.isSelected)
//   //       .forEach(img => {
//   //         formDataToSubmit.append('customImages', img.file);
//   //       });

//   //     await createFeaturedHotel(formDataToSubmit).unwrap();
//   //     setSuccess('Hotel added to featured section successfully!');

//   //     // Reset form
//   //     setFormData({
//   //       sectionType: 'featured',
//   //       position: '',
//   //       startDate: '',
//   //       endDate: '',
//   //       customTitle: '',
//   //       customDescription: '',
//   //       highlightTags: [],
//   //       promotionalOffer: '',
//   //       customAmenities: [],
//   //       displayPrice: {
//   //         basePrice: '',
//   //         discountedPrice: '',
//   //         discountPercentage: '',
//   //         currency: 'INR'
//   //       },
//   //       specialFeatures: [],
//   //       isActive: true
//   //     });
//   //     setSelectedHotel(null);
//   //     setSelectedImages([]);
//   //     setCustomImages([]);

//   //     // Close modal after success
//   //     setTimeout(() => {
//   //       const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
//   //       if (closeButton) closeButton.click();
//   //     }, 1500);

//   //   } catch (err) {
//   //     setError(err.data?.message || 'Failed to add hotel to featured section');
//   //   }
//   // };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
  
//     if (!selectedHotel) {
//       setError('Please select a hotel');
//       return;
//     }
  
//     try {
//       const formDataToSubmit = new FormData();
//       formDataToSubmit.append('hotelId', selectedHotel._id);
      
//       // Handle all form fields
//       Object.keys(formData).forEach(key => {
//         if (key === 'displayPrice' || key === 'customAmenities' || key === 'specialFeatures' || Array.isArray(formData[key])) {
//           formDataToSubmit.append(key, JSON.stringify(formData[key]));
//         } else {
//           formDataToSubmit.append(key, formData[key]);
//         }
//       });
  
//       // Combine and sort selected hotel images and custom images
//       const allSelectedImages = [
//         ...selectedImages
//           .filter(img => img.isSelected)
//           .map((img, index) => ({
//             url: img.url,
//             position: index,
//             type: 'url'
//           })),
//         ...customImages
//           .filter(img => img.isSelected)
//           .map((img, index) => ({
//             file: img.file,
//             position: selectedImages.filter(si => si.isSelected).length + index,
//             type: 'file'
//           }))
//       ].sort((a, b) => a.position - b.position);
  
//       // Append existing URLs
//       const selectedUrls = allSelectedImages
//         .filter(img => img.type === 'url')
//         .map(img => img.url);
//       formDataToSubmit.append('selectedHotelImages', JSON.stringify(selectedUrls));
  
//       // Append new files with position information
//       allSelectedImages
//         .filter(img => img.type === 'file')
//         .forEach((img, index) => {
//           formDataToSubmit.append(`customImages_${img.position}`, img.file);
//         });
  
//       await createFeaturedHotel(formDataToSubmit).unwrap();
//       setSuccess('Hotel added to featured section successfully!');
  
//       // Reset form
//       setFormData({
//         sectionType: 'featured',
//         position: '',
//         startDate: '',
//         endDate: '',
//         customTitle: '',
//         customDescription: '',
//         highlightTags: [],
//         promotionalOffer: '',
//         customAmenities: [],
//         displayPrice: {
//           basePrice: '',
//           discountedPrice: '',
//           discountPercentage: '',
//           currency: 'INR'
//         },
//         specialFeatures: [],
//         isActive: true
//       });
//       setSelectedHotel(null);
//       setSelectedImages([]);
//       setCustomImages([]);
  
//       // Close modal after success
//       setTimeout(() => {
//         const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
//         if (closeButton) closeButton.click();
//       }, 1500);
  
//     } catch (err) {
//       setError(err.data?.message || 'Failed to add hotel to featured section');
//     }
//   };


//   return (
//     <>
//       <div className="modal fade" id="add-featured-hotel" tabIndex="-1" aria-hidden="true">
//         <div className="modal-dialog modal-lg">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Add Featured Hotel</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               {error && (
//                 <div className="alert alert-danger" role="alert">
//                   {error}
//                 </div>
//               )}
//               {success && (
//                 <div className="alert alert-success" role="alert">
//                   {success}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit}>
//                 {/* Hotel Selection */}
//                 <div className="mb-3">
//                   <label className="form-label">Select Hotel <span className="text-danger">*</span></label>
//                   {selectedHotel ? (
//                     <div className="d-flex align-items-center">
//                       <img
//                         src={selectedHotel.mainImage || selectedHotel.images[0]}
//                         alt={selectedHotel.name}
//                         className="me-2 rounded"
//                         style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                       />
//                       <div>
//                         <div className="fw-bold">{selectedHotel.name}</div>
//                         <small className="text-muted">{selectedHotel.address?.city}</small>
//                       </div>
//                       <button
//                         type="button"
//                         className="btn btn-outline-primary btn-sm ms-auto"
//                         onClick={() => setShowHotelSelector(true)}
//                       >
//                         Change Hotel
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       type="button"
//                       className="btn btn-outline-primary"
//                       onClick={() => setShowHotelSelector(true)}
//                     >
//                       Select Hotel
//                     </button>
//                   )}
//                 </div>

//                 {/* Images Selection */}
//                 {selectedHotel && (
//                   <div className="mb-3">
//                     <label className="form-label">Hotel Images</label>
//                     <div className="row g-2 mb-2">
//                       {selectedImages.map(image => (
//                         <div key={image.id} className="col-auto">
//                           <div 
//                             className={`position-relative border rounded p-1 ${
//                               image.isSelected ? 'border-primary' : 'border-secondary'
//                             }`}
//                             style={{ cursor: 'pointer' }}
//                             onClick={() => handleImageSelect(image.id)}
//                           >
//                             <img
//                               src={image.url}
//                               alt="Hotel"
//                               style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                               className="rounded"
//                             />
//                             <div 
//                               className={`position-absolute top-0 end-0 p-1 rounded-circle m-1 ${
//                                 image.isSelected ? 'bg-primary text-white' : 'bg-secondary text-white'
//                               }`}
//                             >
//                               <i className="bi bi-check"></i>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Custom Image Upload */}
//                     <div>
//                       <label className="form-label">Add Custom Images</label>
//                       <input
//                         type="file"
//                         className="form-control mb-2"
//                         multiple
//                         accept="image/*"
//                         onChange={handleCustomImageUpload}
//                       />
//                       {customImages.length > 0 && (
//                         <div className="row g-2">
//                           {customImages.map(image => (
//                             <div key={image.id} className="col-auto">
//                               <div 
//                                 className={`position-relative border rounded p-1 ${
//                                   image.isSelected ? 'border-primary' : 'border-secondary'
//                                 }`}
//                                 style={{ cursor: 'pointer' }}
//                                 onClick={() => handleImageSelect(image.id)}
//                               >
//                                 <img
//                                   src={image.url}
//                                   alt="Custom upload"
//                                   style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                                   className="rounded"
//                                 />
//                                 <div 
//                                   className={`position-absolute top-0 end-0 p-1 rounded-circle m-1 ${
//                                     image.isSelected ? 'bg-primary text-white' : 'bg-secondary text-white'
//                                   }`}
//                                 >
//                                   <i className="bi bi-check"></i>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Section Type */}
//                 <div className="mb-3">
//                   <label className="form-label">Section Type <span className="text-danger">*</span></label>
//                   <select
//                     className="form-select"
//                     name="sectionType"
//                     value={formData.sectionType}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="featured">Featured</option>
//                     <option value="trending">Trending</option>
//                     <option value="topRated">Top Rated</option>
//                     <option value="recommended">Recommended</option>
//                     <option value="latest">Latest</option>
//                     <option value="premier">Premier</option>
//                     <option value="select">Select</option>
//                     <option value="express">Express</option>
//                     <option value="gurugram">Gurugram</option>
//                     <option value="delhi">Delhi</option>
//                     <option value="mohali">Mohali</option>
//                   </select>
//                 </div>

//                 {/* Position */}
//                 <div className="mb-3">
//                   <label className="form-label">Position</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="position"
//                     value={formData.position}
//                     onChange={handleInputChange}
//                     min="0"
//                   />
//                 </div>

//                 {/* Display Price */}
//                 <div className="mb-3">
//                   <label className="form-label">Display Price</label>
//                   <div className="row g-2">
//                     <div className="col-md-4">
//                       <input
//                         type="number"
//                         className="form-control"
//                         name="displayPrice.basePrice"
//                         value={formData.displayPrice.basePrice}
//                         onChange={handleInputChange}
//                         placeholder="Base Price"
//                       />
//                     </div>
//                     <div className="col-md-4">
//                       <input
//                         type="number"
//                         className="form-control"
//                         name="displayPrice.discountedPrice"
//                         value={formData.displayPrice.discountedPrice}
//                         onChange={handleInputChange}
//                         placeholder="Discounted Price"
//                       />
//                     </div>
//                     <div className="col-md-4">
//                       <input
//                         type="number"
//                         className="form-control"
//                         name="displayPrice.discountPercentage"
//                         value={formData.displayPrice.discountPercentage}
//                         onChange={handleInputChange}
//                         placeholder="Discount %"
//                         min="0"
//                         max="100"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Dates */}
//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">Start Date <span className="text-danger">*</span></label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="startDate"
//                       value={formData.startDate}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <label className="form-label">End Date <span className="text-danger">*</span></label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="endDate"
//                       value={formData.endDate}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Custom Title and Description */}
//                 <div className="mb-3">
//                   <label className="form-label">Custom Title</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="customTitle"
//                     value={formData.customTitle}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Custom Description</label>
//                   <textarea
//                     className="form-control"
//                     name="customDescription"
//                     value={formData.customDescription}
//                     onChange={handleInputChange}
//                     rows="3"
//                   />
//                 </div>

//                 {/* Highlight Tags */}
//                 <div className="mb-3">
//                   <label className="form-label">Highlight Tags (comma-separated)</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={formData.highlightTags.join(', ')}
//                     onChange={handleTagsChange}
//                     placeholder="e.g., Best Seller, Popular, New"
//                   />
//                 </div>

//                 {/* Promotional Offer */}
//                 <div className="mb-3">
//                   <label className="form-label">Promotional Offer</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="promotionalOffer"
//                     value={formData.promotionalOffer}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 20% off on weekend stays"
//                   />
//                 </div>

//                 {/* Custom Amenities */}
//                 <div className="mb-3">
//                   <label className="form-label">Custom Amenities</label>
//                   <div className="row g-2">
//                     {formData.customAmenities.map((amenity, index) => (
//                       <div key={index} className="col-12 d-flex gap-2 align-items-start">
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={amenity.name}
//                           onChange={(e) => {
//                             const updatedAmenities = [...formData.customAmenities];
//                             updatedAmenities[index].name = e.target.value;
//                             setFormData(prev => ({
//                               ...prev,
//                               customAmenities: updatedAmenities
//                             }));
//                           }}
//                           placeholder="Amenity name"
//                         />
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={amenity.icon}
//                           onChange={(e) => {
//                             const updatedAmenities = [...formData.customAmenities];
//                             updatedAmenities[index].icon = e.target.value;
//                             setFormData(prev => ({
//                               ...prev,
//                               customAmenities: updatedAmenities
//                             }));
//                           }}
//                           placeholder="Icon class"
//                         />
//                         <button
//                           type="button"
//                           className="btn btn-outline-danger"
//                           onClick={() => {
//                             const updatedAmenities = formData.customAmenities.filter((_, i) => i !== index);
//                             setFormData(prev => ({
//                               ...prev,
//                               customAmenities: updatedAmenities
//                             }));
//                           }}
//                         >
//                           <i className="bi bi-trash"></i>
//                         </button>
//                       </div>
//                     ))}
//                     <div className="col-12">
//                       <button
//                         type="button"
//                         className="btn btn-outline-secondary"
//                         onClick={() => {
//                           setFormData(prev => ({
//                             ...prev,
//                             customAmenities: [
//                               ...prev.customAmenities,
//                               { name: '', icon: '', description: '' }
//                             ]
//                           }));
//                         }}
//                       >
//                         Add Amenity
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Special Features */}
//                 <div className="mb-3">
//                   <label className="form-label">Special Features</label>
//                   <div className="row g-2">
//                     {formData.specialFeatures.map((feature, index) => (
//                       <div key={index} className="col-12">
//                         <div className="card mb-2">
//                           <div className="card-body">
//                             <div className="row g-2">
//                               <div className="col-md-5">
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   value={feature.title}
//                                   onChange={(e) => {
//                                     const updatedFeatures = [...formData.specialFeatures];
//                                     updatedFeatures[index].title = e.target.value;
//                                     setFormData(prev => ({
//                                       ...prev,
//                                       specialFeatures: updatedFeatures
//                                     }));
//                                   }}
//                                   placeholder="Feature title"
//                                 />
//                               </div>
//                               <div className="col-md-5">
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   value={feature.icon}
//                                   onChange={(e) => {
//                                     const updatedFeatures = [...formData.specialFeatures];
//                                     updatedFeatures[index].icon = e.target.value;
//                                     setFormData(prev => ({
//                                       ...prev,
//                                       specialFeatures: updatedFeatures
//                                     }));
//                                   }}
//                                   placeholder="Icon class"
//                                 />
//                               </div>
//                               <div className="col-md-2">
//                                 <button
//                                   type="button"
//                                   className="btn btn-outline-danger"
//                                   onClick={() => {
//                                     const updatedFeatures = formData.specialFeatures.filter((_, i) => i !== index);
//                                     setFormData(prev => ({
//                                       ...prev,
//                                       specialFeatures: updatedFeatures
//                                     }));
//                                   }}
//                                 >
//                                   <i className="bi bi-trash"></i>
//                                 </button>
//                               </div>
//                               <div className="col-12">
//                                 <textarea
//                                   className="form-control"
//                                   value={feature.description}
//                                   onChange={(e) => {
//                                     const updatedFeatures = [...formData.specialFeatures];
//                                     updatedFeatures[index].description = e.target.value;
//                                     setFormData(prev => ({
//                                       ...prev,
//                                       specialFeatures: updatedFeatures
//                                     }));
//                                   }}
//                                   placeholder="Feature description"
//                                   rows="2"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     <div className="col-12">
//                       <button
//                         type="button"
//                         className="btn btn-outline-secondary"
//                         onClick={() => {
//                           setFormData(prev => ({
//                             ...prev,
//                             specialFeatures: [
//                               ...prev.specialFeatures,
//                               { title: '', description: '', icon: '' }
//                             ]
//                           }));
//                         }}
//                       >
//                         Add Special Feature
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Active Status */}
//                 <div className="mb-3 form-check">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="isActive"
//                     name="isActive"
//                     checked={formData.isActive}
//                     onChange={handleInputChange}
//                   />
//                   <label className="form-check-label" htmlFor="isActive">Active</label>
//                 </div>

//                 <div className="modal-footer px-0 pb-0">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     data-bs-dismiss="modal"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? 'Adding...' : 'Add to Featured'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Hotel Selector Modal */}
//       <HotelSelector
//         show={showHotelSelector}
//         onClose={() => setShowHotelSelector(false)}
//         onSelect={handleHotelSelect}
//       />
//     </>
//   );

// };

// export default AddFeaturedHotel;


import React, { useState } from 'react';
import { useCreateFeaturedHotelMutation } from '../../../../services/featuredHotelAPI';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import HotelSelector from './HotelSelector';

// Sortable Image Component
const SortableImage = ({ image, index, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`position-relative border rounded p-1 ${
        isDragging ? 'border-primary shadow' : 'border-secondary'
      }`}
    >
      <div {...attributes} {...listeners} style={{ cursor: 'grab' }}>
        <img
          src={image.url}
          alt={`Image ${index + 1}`}
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          className="rounded"
        />
      </div>
      <button
        type="button"
        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle"
        onClick={() => onRemove(image.id)}
        style={{ width: '20px', height: '20px', padding: '0' }}
      >
        ×
      </button>
      <small className="position-absolute bottom-0 start-0 m-1 badge bg-secondary">
        {index + 1}
      </small>
    </div>
  );
};

const AddFeaturedHotel = () => {
  const [createFeaturedHotel, { isLoading }] = useCreateFeaturedHotelMutation();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showHotelSelector, setShowHotelSelector] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [formData, setFormData] = useState({
    sectionType: 'featured',
    position: '',
    startDate: '',
    endDate: '',
    customTitle: '',
    customDescription: '',
    highlightTags: [],
    promotionalOffer: '',
    customAmenities: [],
    displayPrice: {
      basePrice: '',
      discountedPrice: '',
      discountPercentage: '',
      currency: 'INR'
    },
    specialFeatures: [],
    isActive: true
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('displayPrice.')) {
      const priceField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        displayPrice: {
          ...prev.displayPrice,
          [priceField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({
      ...prev,
      highlightTags: tags
    }));
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over.id) {
      setAllImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex).map((item, index) => ({
          ...item,
          position: index
        }));
      });
    }
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setShowHotelSelector(false);
    
    // Convert hotel images to our format
    const hotelImages = hotel.images.map((url, index) => ({
      id: `hotel-${index}`,
      url,
      type: 'hotel',
      position: index,
      isSelected: true
    }));

    setAllImages(hotelImages);
    
    setFormData(prev => ({
      ...prev,
      customTitle: hotel.name,
      customDescription: hotel.description
    }));
  };

  const handleCustomImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const newImages = files.map((file, index) => ({
      id: `custom-${Date.now()}-${index}`,
      file,
      url: URL.createObjectURL(file),
      type: 'custom',
      position: allImages.length + index,
      isSelected: true
    }));

    setAllImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = (imageId) => {
    setAllImages(prev => {
      const filtered = prev.filter(img => img.id !== imageId);
      // Reposition remaining images
      return filtered.map((img, index) => ({
        ...img,
        position: index
      }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedHotel) {
      setError('Please select a hotel');
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('hotelId', selectedHotel._id);
      
      // Handle all form fields
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'object' || Array.isArray(formData[key])) {
          formDataToSubmit.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      });

      // Handle images based on their type
      const hotelUrls = allImages
        .filter(img => img.type === 'hotel')
        .map(img => img.url);
      formDataToSubmit.append('selectedHotelImages', JSON.stringify(hotelUrls));

      // Append custom images with position information
      allImages
        .filter(img => img.type === 'custom')
        .forEach(img => {
          formDataToSubmit.append(`customImages_${img.position}`, img.file);
        });

      await createFeaturedHotel(formDataToSubmit).unwrap();
      setSuccess('Hotel added to featured section successfully!');

      // Reset form
      setFormData({
        sectionType: 'featured',
        position: '',
        startDate: '',
        endDate: '',
        customTitle: '',
        customDescription: '',
        highlightTags: [],
        promotionalOffer: '',
        customAmenities: [],
        displayPrice: {
          basePrice: '',
          discountedPrice: '',
          discountPercentage: '',
          currency: 'INR'
        },
        specialFeatures: [],
        isActive: true
      });
      setSelectedHotel(null);
      setAllImages([]);

      // Close modal after success
      setTimeout(() => {
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (closeButton) closeButton.click();
      }, 1500);

    } catch (err) {
      setError(err.data?.message || 'Failed to add hotel to featured section');
    }
  };

  // Image Gallery Component
  const ImageGallery = () => (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="mb-2">
        <input
          type="file"
          className="form-control"
          multiple
          accept="image/*"
          onChange={handleCustomImageUpload}
        />
        <small className="text-muted d-block mt-1">
          Drag and drop images to reorder. Click × to remove an image.
        </small>
      </div>
      <div className="d-flex flex-wrap gap-2 mb-3">
        <SortableContext
          items={allImages.map(img => img.id)}
          strategy={horizontalListSortingStrategy}
        >
          {allImages.map((image, index) => (
            <SortableImage
              key={image.id}
              image={image}
              index={index}
              onRemove={handleRemoveImage}
            />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeId ? (
          <div className="border rounded p-1 border-primary shadow">
            <img
              src={allImages.find(img => img.id === activeId)?.url}
              alt="Dragging"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              className="rounded"
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  return (
    <>
      <div className="modal fade" id="add-featured-hotel" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Featured Hotel</h5>
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

              <form onSubmit={handleSubmit} className="needs-validation">
                {/* Hotel Selection */}
                <div className="mb-3">
                  <label className="form-label">Select Hotel <span className="text-danger">*</span></label>
                  {selectedHotel ? (
                    <div className="d-flex align-items-center">
                      <img
                        src={selectedHotel.mainImage || selectedHotel.images[0]}
                        alt={selectedHotel.name}
                        className="me-2 rounded"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                      <div>
                        <div className="fw-bold">{selectedHotel.name}</div>
                        <small className="text-muted">{selectedHotel.address?.city}</small>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm ms-auto"
                        onClick={() => setShowHotelSelector(true)}
                      >
                        Change Hotel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setShowHotelSelector(true)}
                    >
                      Select Hotel
                    </button>
                  )}
                </div>

                {/* Images Section */}
                {selectedHotel && (
                  <div className="mb-3">
                    <label className="form-label">Hotel Images</label>
                    <ImageGallery />
                  </div>
                )}

                {/* Section Type */}
                <div className="mb-3">
                  <label className="form-label">Section Type <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    name="sectionType"
                    value={formData.sectionType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="featured">Featured</option>
                    <option value="trending">Trending</option>
                    <option value="topRated">Top Rated</option>
                    <option value="recommended">Recommended</option>
                    <option value="latest">Latest</option>
                    <option value="premier">Premier</option>
                    <option value="select">Select</option>
                    <option value="express">Express</option>
                    <option value="gurugram">Gurugram</option>
                    <option value="delhi">Delhi</option>
                    <option value="mohali">Mohali</option>
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

                {/* Display Price */}
                <div className="mb-3">
                  <label className="form-label">Display Price</label>
                  <div className="row g-2">
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        name="displayPrice.basePrice"
                        value={formData.displayPrice.basePrice}
                        onChange={handleInputChange}
                        placeholder="Base Price"
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        name="displayPrice.discountedPrice"
                        value={formData.displayPrice.discountedPrice}
                        onChange={handleInputChange}
                        placeholder="Discounted Price"
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        name="displayPrice.discountPercentage"
                        value={formData.displayPrice.discountPercentage}
                        onChange={handleInputChange}
                        placeholder="Discount %"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Start Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">End Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
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
                    placeholder="e.g., Best Seller, Popular, New"
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
                    placeholder="e.g., 20% off on weekend stays"
                  />
                </div>

                {/* Custom Amenities */}
                <div className="mb-3">
                  <label className="form-label">Custom Amenities</label>
                  <div className="row g-2">
                    {formData.customAmenities.map((amenity, index) => (
                      <div key={index} className="col-12 d-flex gap-2 align-items-start">
                        <input
                          type="text"
                          className="form-control"
                          value={amenity.name}
                          onChange={(e) => {
                            const updatedAmenities = [...formData.customAmenities];
                            updatedAmenities[index].name = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              customAmenities: updatedAmenities
                            }));
                          }}
                          placeholder="Amenity name"
                        />
                        <input
                          type="text"
                          className="form-control"
                          value={amenity.icon}
                          onChange={(e) => {
                            const updatedAmenities = [...formData.customAmenities];
                            updatedAmenities[index].icon = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              customAmenities: updatedAmenities
                            }));
                          }}
                          placeholder="Icon class"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => {
                            const updatedAmenities = formData.customAmenities.filter((_, i) => i !== index);
                            setFormData(prev => ({
                              ...prev,
                              customAmenities: updatedAmenities
                            }));
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    ))}
                    <div className="col-12">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            customAmenities: [
                              ...prev.customAmenities,
                              { name: '', icon: '', description: '' }
                            ]
                          }));
                        }}
                      >
                        Add Amenity
                      </button>
                    </div>
                  </div>
                </div>

                {/* Special Features */}
                <div className="mb-3">
                  <label className="form-label">Special Features</label>
                  <div className="row g-2">
                    {formData.specialFeatures.map((feature, index) => (
                      <div key={index} className="col-12">
                        <div className="card mb-2">
                          <div className="card-body">
                            <div className="row g-2">
                              <div className="col-md-5">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={feature.title}
                                  onChange={(e) => {
                                    const updatedFeatures = [...formData.specialFeatures];
                                    updatedFeatures[index].title = e.target.value;
                                    setFormData(prev => ({
                                      ...prev,
                                      specialFeatures: updatedFeatures
                                    }));
                                  }}
                                  placeholder="Feature title"
                                />
                              </div>
                              <div className="col-md-5">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={feature.icon}
                                  onChange={(e) => {
                                    const updatedFeatures = [...formData.specialFeatures];
                                    updatedFeatures[index].icon = e.target.value;
                                    setFormData(prev => ({
                                      ...prev,
                                      specialFeatures: updatedFeatures
                                    }));
                                  }}
                                  placeholder="Icon class"
                                />
                              </div>
                              <div className="col-md-2">
                                <button
                                  type="button"
                                  className="btn btn-outline-danger"
                                  onClick={() => {
                                    const updatedFeatures = formData.specialFeatures.filter((_, i) => i !== index);
                                    setFormData(prev => ({
                                      ...prev,
                                      specialFeatures: updatedFeatures
                                    }));
                                  }}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                              <div className="col-12">
                                <textarea
                                  className="form-control"
                                  value={feature.description}
                                  onChange={(e) => {
                                    const updatedFeatures = [...formData.specialFeatures];
                                    updatedFeatures[index].description = e.target.value;
                                    setFormData(prev => ({
                                      ...prev,
                                      specialFeatures: updatedFeatures
                                    }));
                                  }}
                                  placeholder="Feature description"
                                  rows="2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="col-12">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            specialFeatures: [
                              ...prev.specialFeatures,
                              { title: '', description: '', icon: '' }
                            ]
                          }));
                        }}
                      >
                        Add Special Feature
                      </button>
                    </div>
                  </div>
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

                {/* Form Actions */}
                <div className="modal-footer px-0 pb-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Adding...' : 'Add to Featured'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Selector Modal */}
      <HotelSelector
        show={showHotelSelector}
        onClose={() => setShowHotelSelector(false)}
        onSelect={handleHotelSelect}
      />
    </>
  );
};

export default AddFeaturedHotel;