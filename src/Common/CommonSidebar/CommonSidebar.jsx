import React from 'react'

import HotelTabSidebar from './Components/HotelTabSidebar'
import HRTabSidebar from './Components/HRTabSidebar'
import TuningSidebar from './Components/TuningSidebar'

import profile_av from '../../assets/images/220Pixels/Size=XXL (2048px), ⭐️ Avatar=male 18, ⭐️ Round=yes.png'

const CommonSidebar = ({iconColor}) => {
  return (
    	<aside className="ps-xl-5 ps-lg-4 ps-3 pe-2 py-3 sidebar sticky-top" id='sidebarDark' data-bs-theme="none">
			<nav className="navbar navbar-expand-xl py-0">
				<div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvas_Navbar">
					<div className="offcanvas-header">
						<span className="fw-bold fs-5 text-gradient">Saltstayz</span>
						<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
					</div>
					<div className="offcanvas-body flex-column custom_scroll ps-4 ps-xl-0">
						<div className="d-flex align-items-start mb-4">
							<img className="avatar lg rounded-circle border border-3" src={profile_av} alt="avatar"/>
							<div className="ms-3 mt-1">
								<h4 className="mb-0 text-gradient title-font">Super Admin</h4>
								{/* <span className="text-muted">Super Admin</span> */}
							</div>
						</div>
						{/* <!-- start: Menu tab --> */}
						<ul className="nav nav-tabs tab-dynamic px-0 mb-4" role="tablist" style={{"--dynamic-color": "var(--accent-color)"}}>
							<li className="nav-item" role="presentation"><a className="ps-2 pe-3 nav-link active" data-bs-toggle="tab" href="#tab_hotels" role="tab" aria-selected="false" tabIndex="-1">HOTELS</a></li>
              				{/* <li className="nav-item" role="presentation"><a className="ps-2 pe-3 nav-link" data-bs-toggle="tab" href="#tab_hrms" role="tab" aria-selected="true">HRMS</a></li> */}
							{/* <li className="nav-item" role="presentation"><a className="ps-2 pe-3 nav-link" data-bs-toggle="tab" href="#tab_settings" role="tab" aria-selected="false" tabIndex="-1">TUNING</a></li> */}
            			</ul>
						{/* <!-- start: Menu content --> */}
						<div className="tab-content">
							<HotelTabSidebar iconColor={iconColor}/>
							{/* <HRTabSidebar iconColor={iconColor}/> */}
							{/* <TuningSidebar iconColor={iconColor}/> */}
						</div>
					</div>
				</div>
			</nav>
		</aside>
  	)
}

export default CommonSidebar