// src/pages/FeaturedHotels/Components/HotelSelector.jsx
import React, { useState } from 'react';
import { useGetAllHotelsQuery } from '../../../../services/featuredHotelAPI';

const HotelSelector = ({ show, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: hotelsData, isLoading } = useGetAllHotelsQuery({
    page: currentPage,
    limit: pageSize,
    search: searchTerm,
    status: 'active'
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelect = (hotel) => {
    onSelect(hotel);
  };

  if (!show) return null;

  return (
    <>
      <div className="modal fade show" 
        tabIndex="-1" 
        role="dialog"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Hotel</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {/* Search Box */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search hotels..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              {/* Hotels List */}
              {isLoading ? (
                <div className="text-center py-4">Loading hotels...</div>
              ) : (
                <div className="list-group">
                  {hotelsData?.data?.hotels?.map(hotel => (
                    <button
                      key={hotel._id}
                      type="button"
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSelect(hotel)}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={hotel.mainImage || hotel.images[0]}
                          alt={hotel.name}
                          className="me-3 rounded"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className="mb-1">{hotel.name}</h6>
                          <p className="mb-1 small text-muted">{hotel.address?.city}, {hotel.address?.country}</p>
                          <div className="d-flex align-items-center">
                            <span className="badge bg-primary me-2">{hotel.type}</span>
                            <span className="badge bg-success">{hotel.rating} ★</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}

                  {hotelsData?.data?.hotels?.length === 0 && (
                    <div className="text-center py-4">
                      No hotels found matching your search.
                    </div>
                  )}
                </div>
              )}

              {/* Pagination */}
              {hotelsData?.data?.pagination?.pages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(prev => prev - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(hotelsData.data.pagination.pages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                       <li className={`page-item ${currentPage === hotelsData.data.pagination.pages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(prev => prev + 1)}
                          disabled={currentPage === hotelsData.data.pagination.pages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </>
  );
};

export default HotelSelector;