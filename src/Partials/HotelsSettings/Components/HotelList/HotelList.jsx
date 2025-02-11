// import {
//   useGetHotelsQuery,
//   useCreateHotelMutation,
//   useUpdateHotelMutation,
//   useDeleteHotelMutation,
// } from "../../../../services/hotelAPI";



// import React from "react";
// import HotelListTable from "./Components/HotelListTable";
// import AddHotel from "./Components/AddHotel";
// import EditHotel from "./Components/EditHotel";

// const HotelList = () => {
//   return (
//     <div className="px-xl-5 px-lg-4 px-3 py-3 page-body">
//       <div className="row g-3">
//         <div className="col-sm-12">
//           <div className="d-flex align-items-center justify-content-between flex-wrap">
//             <h3 className="fw-bold mb-0">Hotel List</h3>
//             <div className="col-auto d-flex w-sm-100">
//               <button
//                 type="button"
//                 className="btn btn-dark"
//                 data-bs-toggle="offcanvas"
//                 data-bs-target="#add-room"
//                 aria-controls="add-room"
//               >
//                 Add Room
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="col-sm-12">
//           <div className="card">
//             <div className="card-body">
//               <HotelListTable />
//             </div>
//           </div>
//         </div>
//       </div>
//       <AddHotel />
//       <EditHotel />
//     </div>
//   );
// };

// export default HotelList;




// Main HotelList.jsx
import React from 'react';
import HotelListTable from './Components/HotelListTable';
import AddHotel from './Components/AddHotel';

const HotelList = () => {
  return (
    <div className="px-xl-5 px-lg-4 px-3 py-3 page-body">
      <div className="row g-3">
        <div className="col-sm-12">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <h3 className="fw-bold mb-0">Hotel List</h3>
            <div className="col-auto d-flex w-sm-100">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="offcanvas"
                data-bs-target="#add-room"
                aria-controls="add-room"
              >
                Add Hotel
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <HotelListTable />
            </div>
          </div>
        </div>
      </div>
      <AddHotel />
    </div>
  );
};

export default HotelList;
