// import React from 'react'
// import AmenitiesListTable from './Components/AmenitiesListTable'
// import AddAmenities from './Components/AddAmenities'
// import EditAmenities from './Components/EditAmenities'

// const AmenitiesList = () => {
//   return (
//     <div className="px-xl-5 px-lg-4 px-3 py-3 page-body">
//         <div className="row g-3">
//             <div className="col-sm-12">
//                 <div className="d-flex align-items-center justify-content-between flex-wrap">
//                     <h3 className="fw-bold mb-0">Amenities List</h3>
//                     <div className="col-auto d-flex w-sm-100">
//                         <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#add-complementary">Add Amenities</button>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-sm-12">
//                 <div className="card">
//                     <div className="card-body">
//                         <AmenitiesListTable/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <AddAmenities/>
//         <EditAmenities/>
//     </div>
//   )
// }

// export default AmenitiesList


import React from 'react';
import AmenitiesListTable from './Components/AmenitiesListTable';
import AddAmenities from './Components/AddAmenities';

const AmenitiesList = () => {
  return (
    <div className="px-xl-5 px-lg-4 px-3 py-3 page-body">
      <div className="row g-3">
        <div className="col-sm-12">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <h3 className="fw-bold mb-0">Amenities List</h3>
            <div className="col-auto d-flex w-sm-100">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#add-complementary"
              >
                Add Amenities
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <AmenitiesListTable />
            </div>
          </div>
        </div>
      </div>
      <AddAmenities />
    </div>
  );
};

export default AmenitiesList;