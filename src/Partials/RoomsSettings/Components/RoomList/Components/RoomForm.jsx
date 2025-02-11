import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateRoomMutation, useUpdateRoomMutation } from '../../../../../services/roomAPI';
import { useGetHotelsQuery } from '../../../../../services/hotelAPI';
import { setSelectedRoom } from '../../../../../Redux/reducers/roomReducer';
import * as bootstrap from 'bootstrap';


const RoomForm = ({ isEdit = false, initialData = null, onClose }) => {
    const dispatch = useDispatch();
    const selectedRoom = useSelector(state => state.rooms.selectedRoom);
    const [createRoom] = useCreateRoomMutation();
    const [updateRoom] = useUpdateRoomMutation();
    const { data: hotelsData } = useGetHotelsQuery({ page: 1, limit: 100 });

    const defaultFormData = {
        hotelId: '',
        roomNumber: '',
        name: '',
        roomName: '',
        roomDescription: '',
        type: '',
        capacity: {
            baseAdults: 1,
            maxAdults: 2,
            baseChildren: 0,
            maxChildren: 0
        },
        pricing: {
            basePrice: 0,
            rackRate: 0,
            currency: 'INR'
        },
        size: {
            value: 0,
            unit: 'sqft'
        },
        bedConfiguration: [{
            type: 'Default',
            count: 1
        }],
        policies: {
            checkInTime: '14:00',
            checkOutTime: '12:00',
            cancellationPolicy: 'Standard cancellation policy'
        },
        amenities: [],
        images: {
            mainImage: '',
            additionalImages: []
        },
        status: 'active'
    };

       // Image preview states
       const [mainImagePreview, setMainImagePreview] = useState('');
       const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
       const [imagesToDelete, setImagesToDelete] = useState([]);
       
       // Track existing images separately
       const [existingImages, setExistingImages] = useState({
           mainImage: '',
           additionalImages: []
       });

    const [formData, setFormData] = useState(defaultFormData);
    const [images, setImages] = useState({
        mainImage: null,
        additionalImages: []
    });

    useEffect(() => {
        if (isEdit && initialData) {
            setFormData(initialData);
        }
    }, [isEdit, initialData]);

      // Load existing images on edit
      useEffect(() => {
        if (isEdit && selectedRoom) {
            setExistingImages({
                mainImage: selectedRoom.images.mainImage,
                additionalImages: selectedRoom.images.additionalImages || []
            });
            setMainImagePreview(selectedRoom.images.mainImage);
            setAdditionalImagePreviews(selectedRoom.images.additionalImages || []);
        }
    }, [isEdit, selectedRoom]);


   
    // Effect to handle edit mode
    useEffect(() => {
        if (isEdit && selectedRoom) {
            // Create a clean copy of the selected room data
            const cleanRoomData = {
                ...defaultFormData,
                ...JSON.parse(JSON.stringify(selectedRoom))
            };
            setFormData(cleanRoomData);
        } else {
            setFormData(defaultFormData);
        }
    }, [isEdit, selectedRoom]);

      // Cleanup when modal closes
      useEffect(() => {
        const offcanvasElement = document.getElementById(isEdit ? 'edit-room' : 'add-room');
        if (offcanvasElement) {
            offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                setFormData(defaultFormData);
                setImages({ mainImage: null, additionalImages: [] });
                if (isEdit) {
                    // Dispatch a plain object action to clear selected room
                    dispatch({
                        type: 'rooms/setSelectedRoom',
                        payload: null
                    });
                }
            });
        }
    }, [isEdit, dispatch]);



    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImages(prev => ({
                ...prev,
                mainImage: file
            }));
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => ({
            ...prev,
            additionalImages: [...prev.additionalImages, ...files]
        }));

        // Create previews
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAdditionalImagePreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveMainImage = () => {
        if (isEdit && existingImages.mainImage) {
            setImagesToDelete(prev => [...prev, existingImages.mainImage]);
        }
        setImages(prev => ({ ...prev, mainImage: null }));
        setMainImagePreview('');
    };

    const handleRemoveAdditionalImage = (index) => {
        if (isEdit && existingImages.additionalImages[index]) {
            setImagesToDelete(prev => [...prev, existingImages.additionalImages[index]]);
            const newExistingImages = [...existingImages.additionalImages];
            newExistingImages.splice(index, 1);
            setExistingImages(prev => ({
                ...prev,
                additionalImages: newExistingImages
            }));
        }
        
        setImages(prev => {
            const newImages = [...prev.additionalImages];
            newImages.splice(index, 1);
            return {
                ...prev,
                additionalImages: newImages
            };
        });
        
        setAdditionalImagePreviews(prev => {
            const newPreviews = [...prev];
            newPreviews.splice(index, 1);
            return newPreviews;
        });
    };


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

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        if (name === 'mainImage') {
            setImages(prev => ({
                ...prev,
                mainImage: files[0]
            }));
        } else {
            setImages(prev => ({
                ...prev,
                additionalImages: Array.from(files)
            }));
        }
    };

    const handleCloseModal = () => {
        const offcanvasElement = document.getElementById(isEdit ? 'edit-room' : 'add-room');
        if (offcanvasElement) {
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvasInstance) {
                offcanvasInstance.hide();
            }
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const roomFormData = new FormData();

    //         // Append basic form data
    //         Object.keys(formData).forEach(key => {
    //             if (typeof formData[key] === 'object') {
    //                 roomFormData.append(key, JSON.stringify(formData[key]));
    //             } else {
    //                 roomFormData.append(key, formData[key]);
    //             }
    //         });

    //         // Append images
    //         if (images.mainImage) {
    //             roomFormData.append('mainImage', images.mainImage);
    //         }
    //         images.additionalImages.forEach(image => {
    //             roomFormData.append('additionalImages', image);
    //         });

    //         // Append images to delete if in edit mode
    //         if (isEdit && imagesToDelete.length > 0) {
    //             roomFormData.append('imagesToDelete', JSON.stringify(imagesToDelete));
    //         }

    //         if (isEdit && selectedRoom) {
    //             await updateRoom({ id: selectedRoom._id, data: roomFormData }).unwrap();
    //         } else {
    //             await createRoom(roomFormData).unwrap();
    //         }

    //         handleCloseModal();
    //         alert(isEdit ? 'Room updated successfully' : 'Room created successfully');
    //     } catch (error) {
    //         console.error('Error saving room:', error);
    //         alert(isEdit ? 'Failed to update room' : 'Failed to create room');
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const roomFormData = new FormData();
    
            // Append basic form data
            Object.keys(formData).forEach(key => {
                if (typeof formData[key] === 'object') {
                    roomFormData.append(key, JSON.stringify(formData[key]));
                } else {
                    roomFormData.append(key, formData[key]);
                }
            });
    
            // Handle main image
            if (images.mainImage) {
                roomFormData.append('mainImage', images.mainImage);
            }
    
            // Handle additional images
            if (images.additionalImages.length > 0) {
                images.additionalImages.forEach(image => {
                    roomFormData.append('additionalImages', image);
                });
            }
    
            // Handle images to delete in edit mode
            if (isEdit && imagesToDelete.length > 0) {
                roomFormData.append('imagesToDelete', JSON.stringify(imagesToDelete));
            }
    
            if (isEdit && selectedRoom) {
                const response = await updateRoom({
                    id: selectedRoom._id,
                    data: roomFormData
                }).unwrap();
                if (response.status === 'SUCCESS') {
                    handleCloseModal();
                    alert('Room updated successfully');
                }
            } else {
                const response = await createRoom(roomFormData).unwrap();
                if (response.status === 'SUCCESS') {
                    handleCloseModal();
                    alert('Room created successfully');
                }
            }
        } catch (error) {
            console.error('Error saving room:', error);
            alert(isEdit ? 'Failed to update room' : 'Failed to create room');
        }
    };
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id={isEdit ? "edit-room" : "add-room"}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">{isEdit ? 'Edit Room' : 'Add Room'}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <form onSubmit={handleSubmit}>

                      {/* Images Section */}
                      <div className="card mb-4">
                        <div className="card-header">
                            <h6 className="mb-0">Room Images</h6>
                        </div>
                        <div className="card-body">
                            {/* Main Image */}
                            <div className="mb-4">
                                <label className="form-label">Main Image</label>
                                <div className="d-flex align-items-center gap-3">
                                    {mainImagePreview && (
                                        <div className="position-relative">
                                            <img 
                                                src={mainImagePreview} 
                                                alt="Main room" 
                                                className="rounded"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                            <button 
                                                type="button"
                                                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                                onClick={handleRemoveMainImage}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex-grow-1">
                                        <input 
                                            type="file"
                                            className="form-control"
                                            onChange={handleMainImageChange}
                                            accept="image/*"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Images */}
                            <div>
                                <label className="form-label">Additional Images</label>
                                <input 
                                    type="file"
                                    className="form-control mb-3"
                                    onChange={handleAdditionalImagesChange}
                                    accept="image/*"
                                    multiple
                                />
                                {additionalImagePreviews.length > 0 && (
                                    <div className="d-flex flex-wrap gap-3">
                                        {additionalImagePreviews.map((preview, index) => (
                                            <div key={index} className="position-relative">
                                                <img 
                                                    src={preview} 
                                                    alt={`Room ${index + 1}`} 
                                                    className="rounded"
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                                <button 
                                                    type="button"
                                                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                                    onClick={() => handleRemoveAdditionalImage(index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Hotel Selection */}
                    <div className="form-group mb-3">
                        <label className="form-label text-muted">Hotel <span className="text-danger">*</span></label>
                        <select 
                            className="form-select"
                            name="hotelId"
                            value={formData.hotelId}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Hotel</option>
                            {hotelsData?.data?.hotels?.map((hotel) => (
                                <option key={hotel._id} value={hotel._id}>
                                    {hotel.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Basic Room Info */}
                    <div className="form-group mb-3">
                        <label className="form-label text-muted">Room Number <span className="text-danger">*</span></label>
                        <input 
                            type="text"
                            className="form-control"
                            name="roomNumber"
                            value={formData.roomNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label text-muted">Room Name <span className="text-danger">*</span></label>
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
                        <label className="form-label text-muted">Room Type <span className="text-danger">*</span></label>
                        <input 
                            type="text"
                            className="form-control"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Capacity */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label text-muted">Base Adults <span className="text-danger">*</span></label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    name="capacity.baseAdults"
                                    value={formData.capacity.baseAdults}
                                    onChange={handleInputChange}
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label text-muted">Max Adults <span className="text-danger">*</span></label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    name="capacity.maxAdults"
                                    value={formData.capacity.maxAdults}
                                    onChange={handleInputChange}
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label text-muted">Base Price <span className="text-danger">*</span></label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    name="pricing.basePrice"
                                    value={formData.pricing.basePrice}
                                    onChange={handleInputChange}
                                    min="0"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label text-muted">Rack Rate <span className="text-danger">*</span></label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    name="pricing.rackRate"
                                    value={formData.pricing.rackRate}
                                    onChange={handleInputChange}
                                    min="0"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Room Size */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label text-muted">Size <span className="text-danger">*</span></label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    name="size.value"
                                    value={formData.size.value}
                                    onChange={handleInputChange}
                                    min="0"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label text-muted">Unit <span className="text-danger">*</span></label>
                                <select 
                                    className="form-select"
                                    name="size.unit"
                                    value={formData.size.unit}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="sqft">Square Feet</option>
                                    <option value="sqm">Square Meters</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="form-group mb-3">
                        <label className="form-label text-muted">Main Image</label>
                        <input 
                            type="file"
                            className="form-control"
                            name="mainImage"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label text-muted">Additional Images</label>
                        <input 
                            type="file"
                            className="form-control"
                            name="additionalImages"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple
                        />
                    </div>

                    {/* Policies */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label text-muted">Check-in Time</label>
                                <input 
                                    type="time"
                                    className="form-control"
                                    name="policies.checkInTime"
                                    value={formData.policies.checkInTime}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label text-muted">Check-out Time</label>
                                <input 
                                    type="time"
                                    className="form-control"
                                    name="policies.checkOutTime"
                                    value={formData.policies.checkOutTime}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label text-muted">Room Description</label>
                        <textarea 
                            className="form-control"
                            name="roomDescription"
                            value={formData.roomDescription}
                            onChange={handleInputChange}
                            rows="3"
                        ></textarea>
                    </div>

                    {/* <div className="d-flex mt-4">
                        {!isEdit && (
                            <button 
                                type="button" 
                                className="btn w-100 me-1 py-2 btn-secondary"
                                onClick={() => setFormData({})}
                            >
                                Clear
                            </button>
                        )}
                        <button type="submit" className="btn w-100 ms-1 py-2 btn-primary">
                            {isEdit ? 'Update' : 'Save'}
                        </button>
                    </div> */}

                    {/* Submit Button */}
                    <div className="d-flex mt-4">
                        {!isEdit && (
                            <button 
                                type="button" 
                                className="btn w-100 me-1 py-2 btn-secondary"
                                onClick={() => {
                                    setFormData(defaultFormData);
                                    setImages({ mainImage: null, additionalImages: [] });
                                    setMainImagePreview('');
                                    setAdditionalImagePreviews([]);
                                }}
                            >
                                Clear
                            </button>
                        )}
                        <button type="submit" className="btn w-100 ms-1 py-2 btn-primary">
                            {isEdit ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Export separate components for Add and Edit
export const AddRoom = () => <RoomForm isEdit={false} />;
export const EditRoom = ({ onClose }) => {
    const selectedRoom = useSelector(state => state.rooms.selectedRoom);
    return <RoomForm isEdit={true} initialData={selectedRoom} onClose={onClose} />;
};

export default RoomForm;