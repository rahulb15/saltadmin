import React from 'react'
import { Link } from 'react-router-dom'
import { personalisedData } from './Components/PersonalisedSwimmingpoolData'

const SwimmingPool = () => {
  return (
    <div className="px-xl-5 px-lg-4 px-3 py-3 page-body">
        <div className="row g-3">
            <div className="col-sm-12">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <h3 className="fw-bold mb-0">Swimming Pool Booking</h3>
                    <div className="col-auto d-flex w-sm-100">
                        <Link to="/personalised-settings" className="btn btn-dark btn-set-task w-sm-100">Settings</Link>
                    </div>
                </div>
            </div>
            <div className="col-sm-12">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6 col-lg-3">
                                <label className="form-label">Swimming Category </label>
                                <select className="form-select">
                                    <option selected="">Choose...</option>
                                    <option>Water Aerobics</option>
                                    <option>Pool Toys and Games</option>
                                    <option>Competitive Swimming</option>
                                    <option>Swimming Lessons</option>
                                </select>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <label className="form-label">Room Number</label>
                                <select className="form-select">
                                    <option selected="">Choose...</option>
                                    <option>A-101</option>
                                    <option>B-102</option>
                                    <option>C-103</option>
                                    <option>D-104</option>
                                    <option>E-105</option>
                                    <option>F-106</option>
                                    <option>G-107</option>
                                    <option>H-108</option>
                                    <option>I-109</option>
                                    <option>J-110</option>
                                </select>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <label className="form-label">Select Date</label>
                                <input type="date" className="form-control"/>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <label className="form-label">Select Time Slot</label>
                                <select className="form-select">
                                    <option selected="">Choose...</option>
                                    <option>10 to 12</option>
                                    <option>12 to 02</option>
                                    <option>04 to 06</option>
                                </select>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.A-109</span>
                                        <span className="mt-1 text-success">Booked 10 to 12</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Swimming Lessons</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.B-106</span>
                                        <span className="mt-1 text-success">Booked 02 to 04</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Water Aerobics</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.C-105</span>
                                        <span className="mt-1 text-success">Booked 10 to 12</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Swimming Lessons</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.D-106</span>
                                        <span className="mt-1 text-success">Booked 02 to 04</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Water Aerobics</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.E-109</span>
                                        <span className="mt-1 text-success">Booked 10 to 12</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Swimming Lessons</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.F-106</span>
                                        <span className="mt-1 text-success">Booked 02 to 04</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Water Aerobics</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.G-109</span>
                                        <span className="mt-1 text-success">Booked 10 to 12</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Swimming Lessons</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.H-106</span>
                                        <span className="mt-1 text-success">Booked 02 to 04</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Water Aerobics</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.I-109</span>
                                        <span className="mt-1 text-success">Booked 10 to 12</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Swimming Lessons</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.J-106</span>
                                        <span className="mt-1 text-success">Booked 02 to 04</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Water Aerobics</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.K-109</span>
                                        <span className="mt-1 text-success">Booked 10 to 12</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Swimming Lessons</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.L-106</span>
                                        <span className="mt-1 text-success">Booked 02 to 04</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Water Aerobics</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.M-109</span>
                                        <span className="mt-1 text-success">Booked 10 to 12</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Swimming Lessons</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="room-select border p-3 rounded">
                                    <div className="text-center">
                                        <span className="fw-bold d-block text-primary">Room No.N-106</span>
                                        <span className="mt-1 text-success">Booked 02 to 04</span>
                                        <span className="mt-1 text-uppercase text-gradient d-block">Water Aerobics</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 text-end">
                                <button type="button" className="btn btn-primary">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SwimmingPool