import React from 'react'
import EditAttendance from './Components/EditAttendance'

const Attendance = () => {
  return (
    <div className="px-xl-5 px-lg-4 px-3 py-3 page-body">
        <div className="row g-3">
            <div className="col-sm-12">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <h3 className="fw-bold mb-0">Attendance</h3>
                    <div className="col-auto d-flex mt-1 mt-sm-0">
                        <button type="button" className="btn btn-dark w-sm-100 me-2" data-bs-toggle="modal" data-bs-target="#editattendance">Edit Attendance</button>
                        <button className="btn btn-primary dropdown-toggle" type="button" id="btn_Filter" data-bs-toggle="dropdown" aria-expanded="false">Filter</button>
                        <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="btn_Filter">
                            <li><a className="dropdown-item" href="#">All</a></li>
                            <li><a className="dropdown-item" href="#">Today Absent</a></li>
                            <li><a className="dropdown-item" href="#">Week Absent</a></li>
                            </ul>
                    </div>
                </div>
            </div>
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <ul className="nav nav-tabs px-0" role="tablist">
                            <li className="nav-item dropdown">
                                <a className="nav-link gray-6 active dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">Month</a>
                                <ul className="dropdown-menu border-0 shadow py-3 px-2" data-popper-placement="top-start" style={{position: "absolute", "inset": "auto auto 0px 0px", margin: "0px", transform: "translate(0px, -44px)"}}>
                                    <li><a className="dropdown-item py-1 rounded active" href="#">Jan 2023</a></li>
                                    <li><a className="dropdown-item py-1 rounded" href="#">Feb 2023</a></li>
                                    <li><a className="dropdown-item py-1 rounded" href="#">March 2023</a></li>
                                    <li><a className="dropdown-item py-1 rounded" href="#">Apr 2023</a></li>
                                    <li><a className="dropdown-item py-1 rounded" href="#">May 2023</a></li>
                                </ul>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link gray-6" data-bs-toggle="tab" href="#nav-week1" role="tab" aria-selected="true">
                                    <i className="bi bi-check2 text-success me-1"></i>
                                    <span>Full Day Present</span>
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link gray-6" data-bs-toggle="tab" href="#nav-week1" role="tab" aria-selected="false" tabIndex="-1">
                                    <i className="bi bi-clock text-warning me-1"></i>
                                    <span>Half Day Present</span>
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link gray-6" data-bs-toggle="tab" href="#nav-week1" role="tab" aria-selected="false" tabIndex="-1">
                                    <i className="bi bi-x text-danger me-1"></i>
                                    <span>Full Day Absence</span>
                                </a>
                            </li>
                        </ul>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0 w-100">
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>1</th>
                                        <th>2</th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                        <th>7</th>
                                        <th>8</th>
                                        <th>9</th>
                                        <th>10</th>
                                        <th>11</th>
                                        <th>12</th>
                                        <th>13</th>
                                        <th>14</th>
                                        <th>15</th>
                                        <th>16</th>
                                        <th>17</th>
                                        <th>18</th>
                                        <th>19</th>
                                        <th>20</th>
                                        <th>21</th>
                                        <th>22</th>
                                        <th>23</th>
                                        <th>24</th>
                                        <th>25</th>
                                        <th>27</th>
                                        <th>28</th>
                                        <th>29</th>
                                        <th>30</th>
                                        <th>31</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Joan Dyer</td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Ryan Randall</td>
                                        <td><i className="bi bi-x text-danger"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-x text-danger"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-x text-danger"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Phil Glover</td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Victor Rampling</td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Sally Graham</td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Robert Anderson</td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Ryan Stewart</td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Ryan Randall</td>
                                        <td><i className="bi bi-x text-danger"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-x text-danger"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-x text-danger"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Phil Glover</td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Victor Rampling</td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Sally Graham</td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-clock text-warning"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Robert Anderson</td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                        <td><i className="bi bi-check2 text-success"></i></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <EditAttendance/>
    </div>
  )
}

export default Attendance