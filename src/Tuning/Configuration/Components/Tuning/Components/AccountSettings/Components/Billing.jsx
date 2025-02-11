import React from 'react'
import visaCard from '../../../../../../../assets/images/payment/visa-card.svg';
import masterCard from '../../../../../../../assets/images/payment/mastercard.svg';

const Billing = () => {
  return (
    <div className="tab-pane fade" id="setting-billing" role="tabpanel">
        <ul className="row g-3 list-unstyled li_animate mb-0">
            <li className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="alert alert-danger">
                            <i className="zmdi zmdi-info me-1"></i> You are near your API limits.
                        </div>
                        <div className="row align-items-center">
                            <div className="col">
                                <span className="text-muted">Current plan</span>
                                <h4 className="mb-0 mt-2">₹39/ per month</h4>
                            </div>
                            <div className="col-auto">
                                <a className="btn btn-sm btn-dark" href="#">Upgrade</a>
                            </div>
                        </div> 
                    </div>
                </div>
            </li>
            <li className="col-12 mb-4">
                <div className="card">
                    <div className="card-header">
                        <h6 className="card-title mb-0">Payment methods</h6>
                        <a className="btn btn-sm btn-primary" href="#">Add method</a>
                    </div>
                    <div className="card-body">
                        <div className="list-group list-group-flush my-2">
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <img className="img-fluid" src={visaCard} alt="..." style={{maxWidth: "38px"}}/>
                                    </div>
                                    <div className="col ml-n2">
                                        <h6 className="mb-0">Visa ending in 7878</h6>
                                        <small className="text-muted">Expires 08/2022</small>
                                    </div>
                                    <div className="col-auto mr-n3">
                                        <span className="badge bg-light text-dark">Default</span>
                                    </div>

                                    {/* <!--[ Dropdown ]--> */}
                                    <div className="col-auto">
                                        <a href="#" className="dropdown-toggle after-none" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-end shadow border-0 p-2 rounded-4">
                                            <li><a className="dropdown-item" href="#">File Info</a></li>
                                            <li><a className="dropdown-item" href="#">Copy to</a></li>
                                            <li><a className="dropdown-item" href="#">Move to</a></li>
                                            <li><a className="dropdown-item" href="#">Rename</a></li>
                                            <li><a className="dropdown-item" href="#">Block</a></li>
                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </div> 
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <img className="img-fluid" src={masterCard} alt="..." style={{maxWidth: "38px"}}/>                            
                                    </div>
                                    <div className="col ml-n2">
                                        <h6 className="mb-0">Mastercard ending in 2525</h6>
                                        <small className="text-muted">Expires 11/2024</small>
                                    </div>

                                    {/* <!--[ Dropdown ]--> */}
                                    <div className="col-auto">
                                        <a href="#" className="dropdown-toggle after-none" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-end shadow border-0 p-2 rounded-4">
                                            <li><a className="dropdown-item" href="#">File Info</a></li>
                                            <li><a className="dropdown-item" href="#">Copy to</a></li>
                                            <li><a className="dropdown-item" href="#">Move to</a></li>
                                            <li><a className="dropdown-item" href="#">Rename</a></li>
                                            <li><a className="dropdown-item" href="#">Block</a></li>
                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>

                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li className="col-12">
                <h5 className="fw-normal mb-0">Invoices</h5>
                <p className="text-muted">Showing data from</p>
                <div className="table-responsive">
                    <table className="table table-border table-hover table-nowrap mb-0">
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="font-size-base">
                            <tr>
                                <td><a href="#">Invoice #10022</a></td>
                                <td>Oct. 24, 2020</td>
                                <td>₹29.00</td>
                                <td><span className="badge bg-secondary">Outstanding</span></td>
                            </tr>
                            <tr>
                                <td><a href="#">Invoice #10012</a></td>
                                <td>Aug. 11, 2020</td>
                                <td>₹29.00</td>
                                <td><span className="badge bg-success">Paid</span></td>
                            </tr>
                            <tr>
                                <td><a href="#">Invoice #10043</a></td>
                                <td>July. 5, 2020</td>
                                <td>₹29.00</td>
                                <td><span className="badge bg-success">Paid</span></td>
                            </tr>
                            <tr>
                                <td><a href="#">Invoice #10045</a></td>
                                <td>Jun. 16, 2020</td>
                                <td>₹29.00</td>
                                <td><span className="badge bg-success">Paid</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </li>
            <li className="col-12">
                <small className="text-muted">Don’t need anymore? <a href="#">Cancel your account</a></small>
            </li>
        </ul> 
    </div>
  )
}

export default Billing