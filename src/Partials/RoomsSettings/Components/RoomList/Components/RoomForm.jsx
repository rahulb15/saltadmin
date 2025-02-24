import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateRoomMutation, useUpdateRoomMutation } from '../../../../../services/roomAPI';
import { useGetHotelsQuery } from '../../../../../services/hotelAPI';
import { setSelectedRoom } from '../../../../../Redux/reducers/roomReducer';



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


const ROOM_TYPES = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Family'];
const UNIT_OPTIONS = [
    { value: 'sqft', label: 'Square Feet' },
    { value: 'sqm', label: 'Square Meters' }
];

const RoomForm = ({ isEdit = false, initialData = null, onClose }) => {
    const dispatch = useDispatch();
    const selectedRoom = useSelector(state => state.rooms.selectedRoom);
    const [createRoom] = useCreateRoomMutation();
    const [updateRoom] = useUpdateRoomMutation();
    const { data: hotelsData } = useGetHotelsQuery({ page: 1, limit: 100 });

    // Form state management
    const [formData, setFormData] = useState(defaultFormData);
    const [mainImagePreview, setMainImagePreview] = useState('');
    const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [images, setImages] = useState({
        mainImage: null,
        additionalImages: []
    });
    const [existingImages, setExistingImages] = useState({
        mainImage: '',
        additionalImages: []
    });

    // Initialize form with edit data if available
    useEffect(() => {
        if (isEdit && selectedRoom) {
            const cleanRoomData = {
                ...defaultFormData,
                ...JSON.parse(JSON.stringify(selectedRoom))
            };
            setFormData(cleanRoomData);
            setExistingImages({
                mainImage: selectedRoom.images.mainImage,
                additionalImages: selectedRoom.images.additionalImages || []
            });
            setMainImagePreview(selectedRoom.images.mainImage);
            setAdditionalImagePreviews(selectedRoom.images.additionalImages || []);
        }
    }, [isEdit, selectedRoom]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (isEdit) {
                dispatch(setSelectedRoom(null));
            }
        };
    }, [isEdit, dispatch]);

    // Form Handlers
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

    const handleImageChange = (e, type = 'main') => {
        const files = Array.from(e.target.files);
        if (type === 'main' && files[0]) {
            setImages(prev => ({ ...prev, mainImage: files[0] }));
            const reader = new FileReader();
            reader.onloadend = () => setMainImagePreview(reader.result);
            reader.readAsDataURL(files[0]);
        } else if (type === 'additional') {
            setImages(prev => ({
                ...prev,
                additionalImages: [...prev.additionalImages, ...files]
            }));
            
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAdditionalImagePreviews(prev => [...prev, reader.result]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleRemoveImage = (index, type = 'main') => {
        if (type === 'main') {
            if (isEdit && existingImages.mainImage) {
                setImagesToDelete(prev => [...prev, existingImages.mainImage]);
            }
            setImages(prev => ({ ...prev, mainImage: null }));
            setMainImagePreview('');
        } else {
            if (isEdit && existingImages.additionalImages[index]) {
                setImagesToDelete(prev => [...prev, existingImages.additionalImages[index]]);
                setExistingImages(prev => ({
                    ...prev,
                    additionalImages: prev.additionalImages.filter((_, i) => i !== index)
                }));
            }
            setImages(prev => ({
                ...prev,
                additionalImages: prev.additionalImages.filter((_, i) => i !== index)
            }));
            setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();

            // Append form data
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
            });

            // Append images
            if (images.mainImage) {
                formDataToSend.append('mainImage', images.mainImage);
            }
            images.additionalImages.forEach(image => {
                formDataToSend.append('additionalImages', image);
            });

            // Handle image deletion for edit mode
            if (isEdit && imagesToDelete.length > 0) {
                formDataToSend.append('imagesToDelete', JSON.stringify(imagesToDelete));
            }

            const response = isEdit 
                ? await updateRoom({ id: selectedRoom._id, data: formDataToSend }).unwrap()
                : await createRoom(formDataToSend).unwrap();

            if (response.status === 'SUCCESS') {
                const modalElement = document.getElementById(isEdit ? 'edit-room' : 'add-room');
                const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(modalElement);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
                alert(`Room ${isEdit ? 'updated' : 'created'} successfully`);
            }
        } catch (error) {
            console.error('Error saving room:', error);
            alert(`Failed to ${isEdit ? 'update' : 'create'} room`);
        }
    };

    return (
        <div 
    className="offcanvas offcanvas-end" 
    tabIndex="-1" 
    id={isEdit ? "edit-room" : "add-room"}
    style={{ maxWidth: '650px' }} // Optional: if you want a wider form
>
    <div className="offcanvas-header">
        <h5 className="offcanvas-title">{isEdit ? 'Edit Room' : 'Add Room'}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div 
        className="offcanvas-body" 
        style={{
            height: 'calc(100vh - 65px)', // Subtract header height
            overflowY: 'auto',
            padding: '1rem'
        }}
    >
        <form onSubmit={handleSubmit}>
                    {/* Image Section */}
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
                                                onClick={() => handleRemoveImage(0, 'main')}
                                            >×</button>
                                        </div>
                                    )}
                                    <div className="flex-grow-1">
                                        <input 
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => handleImageChange(e, 'main')}
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
                                    onChange={(e) => handleImageChange(e, 'additional')}
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
                                                    onClick={() => handleRemoveImage(index, 'additional')}
                                                >×</button>
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