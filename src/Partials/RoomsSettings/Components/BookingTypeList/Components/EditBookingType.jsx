import React from 'react'

const EditBookingType = () => {
  return (
    <div className="modal fade" id="edit-bookingtype" tabIndex="-1"  aria-hidden="true">
		<div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">Booking Type Edit</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label className="form-label text-muted">Booking Type Name</label>
                            <input type="text" className="form-control" defaultValue="Advance" />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Update changes</button>
                </div>
            </div>
		</div>
	</div>
  )
}

export default EditBookingType