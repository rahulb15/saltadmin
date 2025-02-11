// src/pages/FeaturedHotels/index.jsx
import React from 'react';
import FeaturedHotelList from './Components/FeaturedHotelList';
import AddFeaturedHotel from './Components/AddFeaturedHotel';

const FeaturedHotels = () => {
  return (
    <div className="px-xl-5 px-lg-4 px-3 py-3 page-body">
      <div className="row g-3">
        <div className="col-sm-12">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <h3 className="fw-bold mb-0">Featured Hotels</h3>
            <div className="col-auto d-flex w-sm-100">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#add-featured-hotel"
              >
                Add Featured Hotel
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <FeaturedHotelList />
            </div>
          </div>
        </div>
      </div>
      <AddFeaturedHotel />
    </div>
  );
};

export default FeaturedHotels;
