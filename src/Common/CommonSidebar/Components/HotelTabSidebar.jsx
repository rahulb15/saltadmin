import React from 'react'
import { NavLink } from 'react-router-dom'

const HotelTabSidebar = ({iconColor}) => {
  return (
    <div className="tab-pane fade active show" id="tab_hotels" role="tabpanel">
        <h6 className="fl-title title-font ps-2 small text-uppercase text-muted" style={{"--dynamic-color": "var(--theme-color1)"}}>Universal</h6>
        <ul className={`list-unstyled mb-4 menu-list ${iconColor}`}>
            <li>
                <NavLink to="/dashboard" aria-label="Hotel Dashboard">
                    <svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                        <path d="M10 12h4v4h-4z"></path>
                    </svg>
                    <span className="mx-3">Dashboard</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/hotels" aria-label="Hotel Front">
                    <svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24"  viewBox="0 0 24 24"  stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 21l18 0" />
                        <path d="M4 21v-11l2.5 -4.5l5.5 -2.5l5.5 2.5l2.5 4.5v11" />
                        <path d="M12 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M9 21v-5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v5" />
                    </svg>
                    <span className="mx-3">Hotels</span>
                </NavLink>
            </li>
            {/* <li>
                <NavLink to="/transaction" aria-label="Transaction list">
                    <svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"></path>
                        <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4"></path>
                    </svg>
                    <span className="mx-3">Transaction</span>
                </NavLink>
            </li> */}
            <li>
                <a href="#RoomMenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" aria-label="Users">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-stroke" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M14 12v.01" />
                        <path d="M3 21h18" />
                        <path d="M6 21v-16a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v16" />
                    </svg>
                    <span className="mx-3">Room Book</span>
                </a>
                <ul className="collapse list-unstyled" id="RoomMenu">
                    <li><NavLink to="/room-booking-list" aria-label="Booking List">Booking List</NavLink></li>
                    {/* <li><NavLink to="/checkin-out" aria-label="Room Checkout">Room Checkout</NavLink></li> */}
                    <li><NavLink to="/room-status" aria-label="Room Status">Room Status</NavLink></li>
                </ul>
            </li>


            <li>
                <a href="#BlogMenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" aria-label="Users">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-stroke" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="7" cy="5" r="2" />
                        <circle cx="17" cy="5" r="2" />
                        <path d="M7 7v8a5 5 0 0 0 5 5h2a5 5 0 0 0 5 -5v-8" />
                        <path d="M12 19v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-1" />
                        <path d="M3 13a2 2 0 0 0 3 1h12" />
                        <path d="M4 17a2 2 0 0 0 3 1h10" />
                    </svg>
                    <span className="mx-3">Blog</span>
                </a>
                <ul className="collapse list-unstyled" id="BlogMenu">
                    <li><NavLink to="/blog-list" aria-label="Blog List">Blog List</NavLink></li>
                    {/* <li><NavLink to="/add-blog" aria-label="Add Blog">Add Blog</NavLink></li> */}
                </ul>
            </li>


            <li>
                <a href="#EventMenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" aria-label="Users">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-stroke" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <rect x="4" y="5" width="16" height="16" rx="2" />
                        <line x1="12" y1="3" x2="12" y2="7" />
                        <line x1="8" y1="3" x2="8" y2="7" />
                        <line x1="16" y1="3" x2="16" y2="7" />
                        <line x1="4" y1="11" x2="20" y2="11" />
                        <rect x="8" y="15" width="2" height="2" />
                        <rect x="14" y="15" width="2" height="2" />
                    </svg>
                    <span className="mx-3">Events</span>
                </a>
                <ul className="collapse list-unstyled" id="EventMenu">
                    <li><NavLink to="/event-categories" aria-label="Event List">Event List</NavLink></li>
                    {/* <li><NavLink to="/add-event" aria-label="Add Event">Add Event</NavLink></li> */}
                </ul>
            </li>

            {/* //banquet-halls */}
            <li>
                <a href="#BanquetMenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" aria-label="Users">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-stroke" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <rect x="4" y="5" width="16" height="16" rx="2" />
                        <line x1="12" y1="3" x2="12" y2="7" />
                        <line x1="8" y1="3" x2="8" y2="7" />
                        <line x1="16" y1="3" x2="16" y2="7" />
                        <line x1="4" y1="11" x2="20" y2="11" />
                        <rect x="8" y="15" width="2" height="2" />
                        <rect x="14" y="15" width="2" height="2" />
                    </svg>
                    <span className="mx-3">Banquet Halls</span>
                </a>
                <ul className="collapse list-unstyled" id="BanquetMenu">
                    <li><NavLink to="/banquet-halls" aria-label="Banquet Halls">Banquet Halls</NavLink></li>
                    {/* <li><NavLink to="/add-banquet-hall" aria-label="Add Banquet Hall">Add Banquet Hall</NavLink></li> */}
                </ul>
            </li>

            {/* featured */}
            <li>
                <a href="#FeaturedMenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" aria-label="Users">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-stroke" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <rect x="4" y="5" width="16" height="16" rx="2" />
                        <line x1="12" y1="3" x2="12" y2="7" />
                        <line x1="8" y1="3" x2="8" y2="7" />
                        <line x1="16" y1="3" x2="16" y2="7" />
                        <line x1="4" y1="11" x2="20" y2="11" />
                        <rect x="8" y="15" width="2" height="2" />
                        <rect x="14" y="15" width="2" height="2" />
                    </svg>
                    <span className="mx-3">Featured</span>
                </a>
                <ul className="collapse list-unstyled" id="FeaturedMenu">
                    <li><NavLink to="/featured-hotels" aria-label="Featured Hotels">Featured Hotels</NavLink></li>
                    {/* <li><NavLink to="/add-featured-hotel" aria-label="Add Featured Hotel">Add Featured Hotel</NavLink></li> */}
                </ul>
            </li>
            










            {/* <li>
                <a href="#RoomFacilitesMenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" aria-label="Users">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-stroke" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M7 3m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" />
                        <path d="M12 3v2" />
                        <path d="M10 15v.01" />
                        <path d="M10 18v.01" />
                        <path d="M14 18v.01" />
                        <path d="M14 15v.01" />
                    </svg>
                    <span className="mx-3">Room Facilites</span>
                </a>
                <ul className="collapse list-unstyled" id="RoomFacilitesMenu">
                    <li><NavLink to="/room-facilites-list" aria-label="Facilites List">Facilites List</NavLink></li>
                    <li><NavLink to="/facilites-details" aria-label="Facilites Details">Facilites Details</NavLink></li>
                    <li><NavLink to="/room-size" aria-label="Room Size">Room Size</NavLink></li>
                </ul>
            </li> */}
            {/* <li>
                <a href="#HousekeepingMenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" aria-label="Users">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-stroke" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M8.5 10a1.5 1.5 0 0 1 -1.5 -1.5a5.5 5.5 0 0 1 11 0v10.5a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2c0 -1.38 .71 -2.444 1.88 -3.175l4.424 -2.765c1.055 -.66 1.696 -1.316 1.696 -2.56a2.5 2.5 0 1 0 -5 0a1.5 1.5 0 0 1 -1.5 1.5z" />
                    </svg>
                    <span className="mx-3">House keeping</span>
                </a>
                <ul className="collapse list-unstyled" id="HousekeepingMenu">
                    <li><NavLink to="/housekeeping-assign-room" aria-label="Housekeeping All">Assign Room</NavLink></li>
                    <li><NavLink to="/housekeeping-roomcleaning" aria-label="Housekeeping Cleaning">Room Cleaning</NavLink></li>
                    <li><NavLink to="/housekeeping-checklist" aria-label="Housekeeping Checklist">Checklist</NavLink></li>
                    <li><NavLink to="/housekeeping-qrlist" aria-label="Housekeeping QR">QR List</NavLink></li>
                    <li><NavLink to="/housekeeping-report" aria-label="Housekeeping Reports">Cleaning Report</NavLink></li>
                </ul>
            </li> */}
            {/* <li>
                <a href="#CarbookingMenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" aria-label="Users">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-stroke" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                    </svg>
                    <span className="mx-3">Cab Facility</span>
                </a>
                <ul className="collapse list-unstyled" id="CarbookingMenu">
                    
                    <li><NavLink to="/cab-list" aria-label="Cab Details">Cab List</NavLink></li>
                    <li><NavLink to="/cab-booking" aria-label="Cab Booking">Cab Booking</NavLink></li>
                </ul>
            </li> */}
            {/* <li>
                <a href="#ItemsManageMenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" aria-label="Users">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-stroke" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M13 5h8" />
                        <path d="M13 9h5" />
                        <path d="M13 15h8" />
                        <path d="M13 19h5" />
                        <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                        <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                    </svg>
                    <span className="mx-3">Items Manage</span>
                </a>
                <ul className="collapse list-unstyled" id="ItemsManageMenu">
                    <li><NavLink to="/items-unit-list" aria-label="Items Unit List">Items Unit List</NavLink></li>
                    <li><NavLink to="/items-list" aria-label="Items List">Items List</NavLink></li>
                    <li><NavLink to="/items-destroyed-list" aria-label="Items Destroyed">Items Destroyed</NavLink></li>
                    <li><NavLink to="/items-category-list" aria-label="Items Category">Items Category</NavLink></li>
                    <li><NavLink to="/items-suppliers-list" aria-label="Items Suppliers">Items Suppliers</NavLink></li>
                </ul>
            </li> */}
            {/* <li>
                <a href="#PersonalisedMenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" aria-label="Users">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-stroke" width="24"  viewBox="0 0 24 24"  stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 8m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
                        <path d="M8 11a5 5 0 1 0 3.998 1.997" />
                        <path d="M12.002 19.003a5 5 0 1 0 3.998 -8.003" />
                    </svg>
                    <span className="mx-3">Personalised</span>
                </a>
                <ul className="collapse list-unstyled" id="PersonalisedMenu">
                    <li><NavLink to="/personalised-jacuzzi" aria-label="">Jacuzzi</NavLink></li>
                    <li><NavLink to="/personalised-swimmingpool" aria-label="">Swimming pool</NavLink></li>
                    <li><NavLink to="/personalised-spa" aria-label="">Spa</NavLink></li>
                    <li><NavLink to="/personalised-pedicure" aria-label="">Pedicure</NavLink></li>
                    <li><NavLink to="/personalised-theater" aria-label="">Theater</NavLink></li>
                    <li><NavLink to="/personalised-banquet" aria-label="">Banquet</NavLink></li>
                    <li><NavLink to="/personalised-settings" aria-label="">All Settings</NavLink></li>
                </ul>
            </li> */}
            <li className="py-2 mt-2">
                <h6 className="fl-title title-font ps-2 small text-uppercase text-muted" style={{"--dynamic-color": "var(--theme-color1)"}}>Reports</h6>
                <ul className="list-unstyled">
                    <li><NavLink to="/booking-report" aria-label="Booking Reports">Booking Reports</NavLink></li>
                    {/* <li><NavLink to="/purchase-report" aria-label="Purchase Report">Purchase Reports</NavLink></li> */}
                    {/* <li><NavLink to="/stock-report" aria-label="Stock Report">Stock Reports</NavLink></li> */}
                </ul>
            </li>
            <li className="py-2 mt-2">
                <h6 className="fl-title title-font ps-2 small text-uppercase text-muted" style={{"--dynamic-color": "var(--theme-color1)"}}>Rooms Settings</h6>
                <ul className="list-unstyled">
                    <li><NavLink to="/bed-list" aria-label="Bed List">Bed List</NavLink></li>
                    <li><NavLink to="/booking-type-list" aria-label="Booking Type List">Booking Type List</NavLink></li>
                    {/* <li><NavLink to="/commission-list" aria-label="Booking Commission ">Booking Commission </NavLink></li> */}
                    {/* <li><NavLink to="/complementary-list" aria-label="Complementary">Complementary List</NavLink></li> */}
                    {/* <li><NavLink to="/floor-plan-list" aria-label="Floor Plan List">Floor Plan List</NavLink></li> */}
                    <li><NavLink to="/room-list" aria-label="Room List">Room List</NavLink></li>
                    <li><NavLink to="/room-image" aria-label="Room Images">Room Images</NavLink></li>
                    <li><NavLink to="/promocode-list" aria-label="Promocode List">Promocode List</NavLink></li>
                    <li><NavLink to="/amenities-list" aria-label="Amenities List">Amenities List</NavLink></li>
                </ul>
            </li>
            <li className="py-2 mt-2">
                <h6 className="fl-title title-font ps-2 small text-uppercase text-muted" style={{"--dynamic-color": "var(--theme-color1)"}}>Hotel Settings</h6>
                <ul className="list-unstyled">
                    <li><NavLink to="/hotel-list" aria-label="Bed List">Hotel List</NavLink></li>
                </ul>
            </li>
        </ul>
    </div>
  )
}

export default HotelTabSidebar