import React from 'react'
import RoleCreateTable from './Components/RoleCreateTable'

const RoleCreate = () => {
  return (
        <div className="px-xl-5 px-lg-4 px-3 py-3 page-body">
            <div className="row g-3">
                <div className="col-sm-12">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <h3 className="fw-bold mb-0">Role Create List</h3>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <RoleCreateTable/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoleCreate