// import React, { Component } from 'react';
// import { roomListColumn, roomListTableData } from './RoomListTableData';
// import DataTable from '../../../../../Common/DataTable/DataTable';
// import DataTableHeader from '../../../../../Common/DataTableHeader/DataTableHeader';
// import DataTableFooter from '../../../../../Common/DataTableFooter/DataTableFooter';

// class RoomListTable extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dataT: roomListTableData.map(data => ({
//         id: data.id,
//         roomType: data.roomType,
//         roomPrice: data.roomPrice,
//         bedCharge: data.bedCharge,
//         capacity: data.capacity,
//         roomSize: data.roomSize,
//         bedNo: data.bedNo,
//         bedType: data.bedType,
//         actions: (
//           <>
//             <button type="button" className="btn" data-bs-toggle="offcanvas" data-bs-target="#edit-room" aria-controls="edit-room">
//               <i className="bi bi-pencil-square"></i>
//             </button>
//             <button type="button" className="btn deleterow" onClick={() => this.handleDelete(data.id)}>
//               <i className="bi bi-trash text-danger"></i>
//             </button>
//           </>
//         ),
//       })),
//     };
//   }

//   handleDelete = (id) => {
//     this.setState(prevState => ({
//       dataT: prevState.dataT.filter(data => data.id !== id),
//     }));
//   };

//   render() {
//     const { dataT } = this.state;

//     return (
//       <>
//         <DataTableHeader />
//         <DataTable columns={roomListColumn} data={dataT} />
//         <DataTableFooter dataT={dataT} />
//       </>
//     );
//   }
// }

// export default RoomListTable;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useGetRoomsQuery, useGetOnlineRoomsQuery } from '../../../../../services/roomAPI';
// import { 
//     setSearchMode, 
//     setSearchParams, 
//     setPagination,
//     setLocalRooms,
//     setOnlineRooms 
// } from '../../../../../Redux/reducers/roomReducer';
// import { Search, Calendar, Users, AlertCircle, Building } from 'lucide-react';
// import DataTableRooms from '../../../../../Common/DataTableRooms/DataTableRooms';
// import DataTableFooter from '../../../../../Common/DataTableFooter/DataTableFooter';
// import ImagePreviewModal from '../../../../HotelsSettings/Components/HotelList/Components/ImagePreviewModal';
// import Alert from '../../../../../Common/Alert/Alert';
// import { useGetHotelsQuery } from '../../../../../services/hotelAPI';
// import { useSelectRoomMutation } from '../../../../../services/roomAPI';

// const RoomListTable = () => {
//     const dispatch = useDispatch();
//     const {
//         searchMode,
//         searchParams,
//         pagination,
//         rooms: localRooms,
//         onlineRooms
//     } = useSelector(state => state.rooms);

//     const [showImagePreview, setShowImagePreview] = useState(false);
//     const [selectedImages, setSelectedImages] = useState([]);
//     const [searchError, setSearchError] = useState(null);
//     const [shouldFetchOnline, setShouldFetchOnline] = useState(false);
//     const [selectRoom] = useSelectRoomMutation();

//     const { data: hotelsData, isLoading: isHotelsLoading } = useGetHotelsQuery({
//       page: 1,
//       limit: 100, // Adjust limit as needed
//   });

//     // RTK Query hooks
//     const { data: localRoomsData, isLoading: isLocalLoading } = useGetRoomsQuery(
//         {
//             page: pagination.currentPage,
//             limit: pagination.pageSize,
//             ...searchParams
//         },
//         { skip: searchMode === 'online' }
//     );
//     const { data: onlineRoomsData, isLoading: isOnlineLoading } = useGetOnlineRoomsQuery(
//       {
//           hotelId: searchParams.hotelId,
//           params: {
//               check_in_date: searchParams.checkInDate,
//               check_out_date: searchParams.checkOutDate,
//               number_adults: searchParams.adults,
//               number_children: searchParams.children
//           }
//       },
//       { 
//           skip: !shouldFetchOnline || searchMode !== 'online' || !searchParams.hotelId 
//       }
//   );

//   // Add this handler
// const handleRoomSelection = async (room) => {
//   try {
//       await selectRoom({
//           hotelId: searchParams.hotelId,
//           roomData: room
//       }).unwrap();
      
//       // Show success message
//       // toast.success('Room successfully selected and saved');
//       alert('Room successfully selected and saved');
//   } catch (error) {
//       console.error('Error selecting room:', error);
//       // toast.error('Failed to select room');
//       alert('Failed to select room');
//   }
// };

//   const handleHotelChange = (e) => {
//     const hotelId = e.target.value;
//     dispatch(setSearchParams({ 
//         hotelId,
//         // Optional: Reset other search params when hotel changes
//         // checkInDate: '',
//         // checkOutDate: '',
//         // adults: 1,
//         // children: 0
//     }));
// };

//     // Effects to handle data updates
//     useEffect(() => {
//         if (localRoomsData) {
//             dispatch(setLocalRooms(localRoomsData.data.rooms));
//             dispatch(setPagination({
//                 totalItems: localRoomsData.data.pagination.total,
//                 totalPages: localRoomsData.data.pagination.pages
//             }));
//         }
//     }, [localRoomsData, dispatch]);

//     useEffect(() => {
//       if (onlineRoomsData) {
//           dispatch(setOnlineRooms(onlineRoomsData.rooms || []));
//       }
//   }, [onlineRoomsData, dispatch]);

//   useEffect(() => {
//     if (searchMode === 'online') {
//         console.log('Current search params:', searchParams);
//         console.log('Should fetch online:', shouldFetchOnline);
//         console.log('Hotel ID:', searchParams.hotelId);
//     }
// }, [searchMode, searchParams, shouldFetchOnline]);

//     // Handlers
//     const handleSearchModeChange = (mode) => {
//       dispatch(setSearchMode(mode));
//       setSearchError(null);
//       setShouldFetchOnline(false);  // Reset the fetch trigger
//       dispatch(setOnlineRooms([]));  // Clear previous online results
//   };


//     const handleSearchParamChange = (e) => {
//         const { name, value } = e.target;
//         dispatch(setSearchParams({ [name]: value }));
//     };

//     const handleSearch = () => {
//       const { checkInDate, checkOutDate, adults, hotelId } = searchParams;
      
//       if (!checkInDate || !checkOutDate || !adults || (searchMode === 'online' && !hotelId)) {
//           setSearchError('Please fill in all required search fields');
//           return;
//       }
      
//       setSearchError(null);
//       dispatch(setPagination({ currentPage: 1 }));

//       if (searchMode === 'online') {
//           setShouldFetchOnline(true);
//       }
//   };

//     const handleViewImages = (images) => {
//         const imageUrls = searchMode === 'online'
//             ? images.RoomImages?.map(img => img.image) || []
//             : [images.mainImage, ...(images.additionalImages || [])];
        
//         setSelectedImages(imageUrls);
//         setShowImagePreview(true);
//     };

//     // Column definitions
//     const columns = [
//         {
//             Header: 'Room Details',
//             accessor: searchMode === 'online' ? 'Room_Name' : 'name',
//             Cell: ({ row }) => (
//                 <div className="flex flex-col">
//                     <span className="font-medium">
//                         {searchMode === 'online' ? row.original.Room_Name : row.original.name}
//                     </span>
//                     <span className="text-sm text-gray-500">
//                         {searchMode === 'online' 
//                             ? row.original.Room_Description 
//                             : row.original.roomDescription}
//                     </span>
//                 </div>
//             )
//         },
//         {
//             Header: 'Type',
//             accessor: searchMode === 'online' ? 'Roomtype_Name' : 'type',
//             Cell: ({ value }) => (
//                 <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                     {value}
//                 </span>
//             )
//         },
//         {
//             Header: 'Capacity',
//             accessor: 'capacity',
//             Cell: ({ row }) => {
//                 const capacity = searchMode === 'online' 
//                     ? {
//                         adults: row.original.Room_Max_adult,
//                         children: row.original.Room_Max_child
//                     }
//                     : row.original.capacity;

//                 return (
//                     <div className="flex items-center space-x-2">
//                         <Users size={16} className="text-gray-400" />
//                         <span>{`${capacity.adults} Adults, ${capacity.children} Children`}</span>
//                     </div>
//                 );
//             }
//         },
//         {
//             Header: 'Price',
//             accessor: searchMode === 'online' ? 'room_rates_info' : 'pricing',
//             Cell: ({ row }) => {
//                 const price = searchMode === 'online'
//                     ? row.original.room_rates_info.totalprice_inclusive_all
//                     : row.original.pricing.basePrice;

//                 return (
//                     <div className="text-lg font-semibold text-green-600">
//                         ₹{typeof price === 'number' ? price.toLocaleString() : price}
//                     </div>
//                 );
//             }
//         },
//         {
//             Header: 'Images',
//             accessor: 'images',
//             Cell: ({ row }) => {
//                 const images = searchMode === 'online'
//                     ? row.original.RoomImages
//                     : row.original.images;
//                 const mainImage = searchMode === 'online'
//                     ? row.original.room_main_image
//                     : images?.mainImage;

//                 return (
//                     <div className="flex items-center space-x-2">
//                         <div className="w-16 h-16 overflow-hidden rounded">
//                             <img
//                                 src={mainImage}
//                                 alt="Room"
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                         <button
//                             onClick={() => handleViewImages(images)}
//                             className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
//                         >
//                             View All
//                         </button>
//                     </div>
//                 );
//             }
//         },
//         {
//           Header: 'Actions',
//           id: 'actions',
//           Cell: ({ row }) => (
//               <div className="flex items-center space-x-2">
//                   {searchMode === 'online' && (
//                       <button
//                           onClick={() => handleRoomSelection(row.original)}
//                           className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 
//                                    flex items-center space-x-1"
//                       >
//                           <span>Select</span>
//                       </button>
//                   )}
//                   <button
//                       onClick={() => handleViewImages(row.original.images)}
//                       className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                       View Images
//                   </button>
//               </div>
//           )
//       }
//     ];

//     return (
//         <div className="space-y-4">
//             {/* Search Header */}
//             <div className="bg-white p-4 rounded-lg shadow">
//                 <div className="flex flex-col space-y-4">
//                     {/* Search Mode Toggle */}
//                     <div className="flex space-x-4">
//                         <button
//                             onClick={() => handleSearchModeChange('local')}
//                             className={`px-4 py-2 rounded transition-colors ${
//                                 searchMode === 'local'
//                                 ? 'bg-blue-500 text-white'
//                                 : 'bg-gray-100 hover:bg-gray-200'
//                         }`}
//                     >
//                         Local Database
//                     </button>
//                     <button
//                         onClick={() => handleSearchModeChange('online')}
//                         className={`px-4 py-2 rounded transition-colors ${
//                             searchMode === 'online'
//                                 ? 'bg-blue-500 text-white'
//                                 : 'bg-gray-100 hover:bg-gray-200'
//                         }`}
//                     >
//                         Online Search (eZee)
//                     </button>
//                 </div>

//                    {/* Hotel Selection Dropdown */}
//                    <div className="w-full">
//                         <div className="flex items-center space-x-2">
//                             <Building size={20} className="text-gray-400" />
//                             <select
//                                 name="hotelId"
//                                 value={searchParams.hotelId || ''}
//                                 onChange={handleHotelChange}
//                                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 required
//                                 disabled={searchMode === 'local'}
//                             >
//                                 <option value="">Select a Hotel</option>
//                                 {hotelsData?.data?.hotels?.map((hotel) => (
//                                     <option key={hotel._id} value={hotel._id}>
//                                         {hotel.name} - {hotel.address?.city}, {hotel.address?.country}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         {searchMode === 'online' && !searchParams.hotelId && (
//                             <p className="mt-1 text-sm text-red-500">
//                                 Please select a hotel for online search
//                             </p>
//                         )}
//                     </div>

//                 {/* Search Parameters */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                     <div className="flex items-center space-x-2">
//                         <Calendar size={20} className="text-gray-400" />
//                         <input
//                             type="date"
//                             name="checkInDate"
//                             value={searchParams.checkInDate}
//                             onChange={handleSearchParamChange}
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             min={new Date().toISOString().split('T')[0]}
//                             required
//                         />
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <Calendar size={20} className="text-gray-400" />
//                         <input
//                             type="date"
//                             name="checkOutDate"
//                             value={searchParams.checkOutDate}
//                             onChange={handleSearchParamChange}
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             min={searchParams.checkInDate || new Date().toISOString().split('T')[0]}
//                             required
//                         />
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <Users size={20} className="text-gray-400" />
//                         <select
//                             name="adults"
//                             value={searchParams.adults}
//                             onChange={handleSearchParamChange}
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         >
//                             {[1, 2, 3, 4].map(num => (
//                                 <option key={num} value={num}>{num} Adults</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <Users size={20} className="text-gray-400" />
//                         <select
//                             name="children"
//                             value={searchParams.children}
//                             onChange={handleSearchParamChange}
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         >
//                             {[0, 1, 2, 3].map(num => (
//                                 <option key={num} value={num}>{num} Children</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 {/* Error Alert */}
//                 {searchError && (
//                     <Alert variant="destructive" className="mt-2">
//                         <AlertCircle className="h-4 w-4" />
//                         <span className="ml-2">{searchError}</span>
//                     </Alert>
//                 )}

//                 {/* Search Button */}
//                 <div className="flex justify-end">
//                     <button
//                         onClick={handleSearch}
//                         disabled={isLocalLoading || isOnlineLoading}
//                         className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
//                                  disabled:bg-blue-300 disabled:cursor-not-allowed
//                                  flex items-center space-x-2 transition-colors"
//                     >
//                         <Search size={20} />
//                         <span>
//                             {isLocalLoading || isOnlineLoading ? 'Searching...' : 'Search Rooms'}
//                         </span>
//                     </button>
//                 </div>
//             </div>
//         </div>

//         {/* Results Table */}
//         <div className="bg-white rounded-lg shadow">
//             {/* Table Header Info */}
//             <div className="p-4 border-b">
//                 <h3 className="text-lg font-semibold">
//                     {searchMode === 'online' ? 'Online Room Listings' : 'Local Room Database'}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                     {searchMode === 'online'
//                         ? 'Real-time availability from eZee system'
//                         : 'Rooms from local database'}
//                 </p>
//             </div>

//             {/* Main Table */}
//             <DataTableRooms
//                 columns={columns}
//                 data={searchMode === 'online' ? onlineRooms : localRooms}
//                 loading={isLocalLoading || isOnlineLoading}
//                 emptyMessage={
//                     searchMode === 'online'
//                         ? "No online rooms available for the selected criteria"
//                         : "No rooms found in local database"
//                 }
//             />

//             {/* Pagination */}
//             {searchMode === 'local' && (
//                 <DataTableFooter
//                     currentPage={pagination.currentPage}
//                     totalPages={pagination.totalPages}
//                     totalItems={pagination.totalItems}
//                     pageSize={pagination.pageSize}
//                     onPageChange={(page) => dispatch(setPagination({ currentPage: page }))}
//                 />
//             )}
//         </div>

//         {/* Image Preview Modal */}
//         <ImagePreviewModal
//             images={selectedImages}
//             show={showImagePreview}
//             onClose={() => setShowImagePreview(false)}
//         />
//     </div>
// );
// };

// export default RoomListTable;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetRoomsQuery, useGetOnlineRoomsQuery, useSelectRoomMutation,useDeleteRoomMutation } from '../../../../../services/roomAPI';
import { 
    setSearchMode, 
    setSearchParams, 
    setPagination,
    setLocalRooms,
    setOnlineRooms 
} from '../../../../../Redux/reducers/roomReducer';
import DataTable from '../../../../../Common/DataTable/DataTable';
import DataTableHeader from '../../../../../Common/DataTableHeader/DataTableHeader';
import DataTableFooter from '../../../../../Common/DataTableFooter/DataTableFooter';
import ImagePreviewModal from '../../../../HotelsSettings/Components/HotelList/Components/ImagePreviewModal';
import { useGetHotelsQuery } from '../../../../../services/hotelAPI';
import { AddRoom, EditRoom } from './RoomForm';
import * as bootstrap from 'bootstrap';


const RoomListTable = () => {
    const dispatch = useDispatch();
    const {
        searchMode,
        searchParams,
        pagination,
        rooms: localRooms,
        onlineRooms
    } = useSelector(state => state.rooms);

    // State
    const [showImagePreview, setShowImagePreview] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchError, setSearchError] = useState(null);
    const [shouldFetchOnline, setShouldFetchOnline] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const [deleteRoom] = useDeleteRoomMutation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);

    // Add delete handlers
    const handleDelete = (roomId) => {
        setRoomToDelete(roomId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteRoom(roomToDelete).unwrap();
            setShowDeleteModal(false);
            setRoomToDelete(null);
            alert('Room deleted successfully');
        } catch (error) {
            console.error('Error deleting room:', error);
            alert('Failed to delete room');
        }
    };

    // API hooks
    const [selectRoom] = useSelectRoomMutation();
    const { data: hotelsData } = useGetHotelsQuery({
        page: 1,
        limit: 100
    });

    const { data: localRoomsData, isLoading: isLocalLoading } = useGetRoomsQuery(
        {
            page: pagination.currentPage,
            limit: pageSize,
            search: searchQuery,
            ...searchParams
        },
        { skip: searchMode === 'online' }
    );

    const { data: onlineRoomsData, isLoading: isOnlineLoading } = useGetOnlineRoomsQuery(
        {
            hotelId: searchParams.hotelId,
            params: {
                check_in_date: searchParams.checkInDate,
                check_out_date: searchParams.checkOutDate,
                number_adults: searchParams.adults,
                number_children: searchParams.children
            }
        },
        { skip: !shouldFetchOnline || searchMode !== 'online' || !searchParams.hotelId }
    );

    // Effects
    useEffect(() => {
        if (localRoomsData) {
            dispatch(setLocalRooms(localRoomsData.data.rooms));
            dispatch(setPagination({
                totalItems: localRoomsData.data.pagination.total,
                totalPages: localRoomsData.data.pagination.pages
            }));
        }
    }, [localRoomsData, dispatch]);

    useEffect(() => {
        if (onlineRoomsData) {
            dispatch(setOnlineRooms(onlineRoomsData.rooms || []));
        }
    }, [onlineRoomsData, dispatch]);

    // Handlers


    const handleEditClick = (room) => {
        // Dispatch a plain object action
        dispatch({
            type: 'rooms/setSelectedRoom',
            payload: room
        });
        
        // Using vanilla JS to open the offcanvas
        const offcanvas = new bootstrap.Offcanvas(document.getElementById('edit-room'));
        offcanvas.show();
    };

    const handleSearchModeChange = (mode) => {
        dispatch(setSearchMode(mode));
        setSearchError(null);
        setShouldFetchOnline(false);
        dispatch(setOnlineRooms([]));
    };

    const handleSearchParamChange = (e) => {
        const { name, value } = e.target;
        dispatch(setSearchParams({ [name]: value }));
    };

    const handleSearch = () => {
        const { checkInDate, checkOutDate, adults, hotelId } = searchParams;
        
        if (!checkInDate || !checkOutDate || !adults || (searchMode === 'online' && !hotelId)) {
            setSearchError('Please fill in all required search fields');
            return;
        }
        
        setSearchError(null);
        dispatch(setPagination({ currentPage: 1 }));

        if (searchMode === 'online') {
            setShouldFetchOnline(true);
        }
    };

    const handleHotelChange = (e) => {
        dispatch(setSearchParams({ hotelId: e.target.value }));
    };

    const handleRoomSelection = async (room) => {
        try {
            await selectRoom({
                hotelId: searchParams.hotelId,
                roomData: room
            }).unwrap();
            alert('Room successfully selected and saved');
        } catch (error) {
            console.error('Error selecting room:', error);
            alert('Failed to select room');
        }
    };

    const handleViewImages = (images) => {
        const imageUrls = searchMode === 'online'
            ? images.RoomImages?.map(img => img.image) || []
            : [images.mainImage, ...(images.additionalImages || [])];
        setSelectedImages(imageUrls);
        setShowImagePreview(true);
    };
    // Column definitions
    const columns = [
        {
            Header: 'Room Details',
            accessor: searchMode === 'online' ? 'Room_Name' : 'name',
            Cell: ({ row }) => (
                <div>
                    <div className="fw-bold">
                        {searchMode === 'online' ? row.original.Room_Name : row.original.name}
                    </div>
                    <small className="text-muted">
                        {searchMode === 'online' 
                            ? row.original.Room_Description 
                            : row.original.roomDescription}
                    </small>
                </div>
            )
        },
        {
            Header: 'Type',
            accessor: searchMode === 'online' ? 'Roomtype_Name' : 'type',
            Cell: ({ value }) => (
                <span className="badge bg-primary">
                    {value}
                </span>
            )
        },
        {
            Header: 'Capacity',
            accessor: 'capacity',
            Cell: ({ row }) => {
                const capacity = searchMode === 'online' 
                    ? {
                        adults: row.original.Room_Max_adult,
                        children: row.original.Room_Max_child
                    }
                    : row.original.capacity;

                return (
                    <div>
                        <i className="bi bi-people me-1"></i>
                        {`${capacity.adults} Adults, ${capacity.children} Children`}
                    </div>
                );
            }
        },
        {
            Header: 'Price',
            accessor: searchMode === 'online' ? 'room_rates_info' : 'pricing',
            Cell: ({ row }) => {
                const price = searchMode === 'online'
                    ? row.original.room_rates_info.totalprice_inclusive_all
                    : row.original.pricing.basePrice;

                return (
                    <div className="fw-bold text-success">
                        ₹{typeof price === 'number' ? price.toLocaleString() : price}
                    </div>
                );
            }
        },
        {
            Header: 'Images',
            accessor: 'images',
            Cell: ({ row }) => {
                const images = searchMode === 'online'
                    ? row.original.RoomImages
                    : row.original.images;
                const mainImage = searchMode === 'online'
                    ? row.original.room_main_image
                    : images?.mainImage;

                return (
                    <div className="d-flex align-items-center">
                        <div 
                            style={{
                                width: '50px',
                                height: '50px',
                                overflow: 'hidden',
                                borderRadius: '4px'
                            }}
                        >
                            <img 
                                src={mainImage}
                                alt="Room"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary ms-2"
                            onClick={() => handleViewImages(images)}
                        >
                            View All
                        </button>
                    </div>
                );
            }
        },
        // {
        //     Header: 'Actions',
        //     id: 'actions',
        //     Cell: ({ row }) => (
        //         <div className="d-flex gap-2">
        //             {searchMode === 'online' && (
        //                 <button
        //                     onClick={() => handleRoomSelection(row.original)}
        //                     className="btn btn-sm btn-success"
        //                 >
        //                     <i className="bi bi-plus-circle me-1"></i>
        //                     Select
        //                 </button>
        //             )}
        //             <button
        //                 onClick={() => handleViewImages(row.original)}
        //                 className="btn btn-sm btn-outline-primary"
        //             >
        //                 <i className="bi bi-images"></i>
        //             </button>
        //         </div>
        //     )
        // }
        {
            Header: 'Actions',
            id: 'actions',
            Cell: ({ row }) => (
                <div className="d-flex gap-2">
                    {searchMode === 'online' ? (
                        <button
                            onClick={() => handleRoomSelection(row.original)}
                            className="btn btn-sm btn-success"
                        >
                            <i className="bi bi-plus-circle me-1"></i>
                            Select
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditClick(row.original)}
                            >
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                                onClick={() => handleDelete(row.original._id)}
                                className="btn btn-sm btn-outline-danger"
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => handleViewImages(row.original)}
                        className="btn btn-sm btn-outline-primary"
                    >
                        <i className="bi bi-images"></i>
                    </button>
                </div>
            )
        }
    ];

    return (
        <>
         <div className="container-fluid">
            {/* Search Section */}
            <div className="card mb-4">
                <div className="card-body">
                    {/* Search Mode Toggle */}
                    <div className="mb-3">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className={`btn ${searchMode === 'local' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleSearchModeChange('local')}
                            >
                                Local Database
                            </button>
                            <button
                                type="button"
                                className={`btn ${searchMode === 'online' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleSearchModeChange('online')}
                            >
                                Online Search (eZee)
                            </button>
                        </div>
                    </div>

                    <div className="row g-3">
                        {/* Hotel Selection (for online mode) */}
                        {searchMode === 'online' && (
                            <div className="col-md-12">
                                <select
                                    name="hotelId"
                                    value={searchParams.hotelId || ''}
                                    onChange={handleHotelChange}
                                    className="form-select"
                                >
                                    <option value="">Select Hotel</option>
                                    {hotelsData?.data?.hotels?.map((hotel) => (
                                        <option key={hotel._id} value={hotel._id}>
                                            {hotel.name} - {hotel.address?.city}, {hotel.address?.country}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Search Parameters */}
                        <div className="col-md-3">
                            <input
                                type="date"
                                name="checkInDate"
                                value={searchParams.checkInDate}
                                onChange={handleSearchParamChange}
                                className="form-control"
                                min={new Date().toISOString().split('T')[0]}
                                placeholder="Check-in Date"
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="date"
                                name="checkOutDate"
                                value={searchParams.checkOutDate}
                                onChange={handleSearchParamChange}
                                className="form-control"
                                min={searchParams.checkInDate}
                                placeholder="Check-out Date"
                            />
                        </div>
                        <div className="col-md-2">
                            <select
                                name="adults"
                                value={searchParams.adults}
                                onChange={handleSearchParamChange}
                                className="form-select"
                            >
                                {[1, 2, 3, 4].map(num => (
                                    <option key={num} value={num}>{num} Adults</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select
                                name="children"
                                value={searchParams.children}
                                onChange={handleSearchParamChange}
                                className="form-select"
                            >
                                {[0, 1, 2, 3].map(num => (
                                    <option key={num} value={num}>{num} Children</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button
                                onClick={handleSearch}
                                className="btn btn-primary w-100"
                                disabled={isLocalLoading || isOnlineLoading}
                            >
                                <i className="bi bi-search me-1"></i>
                                {isLocalLoading || isOnlineLoading ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </div>

                    {searchError && (
                        <div className="alert alert-danger mt-3">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            {searchError}
                        </div>
                    )}
                </div>
            </div>

            {/* Table Section */}
            <div className="card">
                <div className="card-body">
                    <DataTableHeader 
                        pageSize={pageSize}
                        onPageSizeChange={size => setPageSize(size)}
                        searchQuery={searchQuery}
                        onSearch={setSearchQuery}
                    />

                    <DataTable 
                        columns={columns}
                        data={searchMode === 'online' ? onlineRooms : localRooms}
                    />

                    <DataTableFooter 
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        pageSize={pageSize}
                        onPageChange={(page) => dispatch(setPagination({ currentPage: page }))}
                    />
                </div>
            </div>

            <EditRoom 
    initialData={selectedRoom} 
    onClose={() => {
        setSelectedRoom(null);
        // Optional: Close the offcanvas using Bootstrap
        const offcanvasElement = document.getElementById('edit-room');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvas) {
            offcanvas.hide();
        }
    }} 
/>


<div 
                className={`modal fade ${showDeleteModal ? 'show' : ''}`} 
                id="deleteModal"
                tabIndex="-1"
                style={{ display: showDeleteModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={() => setShowDeleteModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this room?
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={handleConfirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showDeleteModal && <div className="modal-backdrop fade show"></div>}

            

            {/* Image Preview Modal */}
            <ImagePreviewModal
                images={selectedImages}
                show={showImagePreview}
                onClose={() => setShowImagePreview(false)}
            />
        </div>
        </>
    );
};

export default RoomListTable;
