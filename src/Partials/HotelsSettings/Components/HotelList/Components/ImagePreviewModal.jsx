// ImagePreviewModal.jsx
import React, { useState } from 'react';

const ImagePreviewModal = ({ images, show, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!show) return null;

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div 
        className={`modal fade ${show ? 'show' : ''}`}
        style={{ display: show ? 'block' : 'none' }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Hotel Images</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="position-relative">
                {/* Main Image */}
                <div 
                  style={{ 
                    height: '400px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <img
                    src={images[currentIndex]}
                    alt={`Hotel ${currentIndex + 1}`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-2"
                      onClick={handlePrevious}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                      className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-2"
                      onClick={handleNext}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="d-flex gap-2 mt-3 overflow-auto py-2">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      role="button"
                      onClick={() => setCurrentIndex(index)}
                      style={{
                        width: '80px',
                        height: '60px',
                        flexShrink: 0,
                        border: currentIndex === index ? '2px solid #0d6efd' : '2px solid transparent',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div 
        className={`modal-backdrop fade ${show ? 'show' : ''}`}
        style={{ display: show ? 'block' : 'none' }}
        onClick={onClose}
      ></div>
    </>
  );
};

export default ImagePreviewModal;
