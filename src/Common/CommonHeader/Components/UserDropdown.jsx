// import React from 'react'
// import { Link } from 'react-router-dom'


// const UserDropdown = () => {
//   return (
//         <div className="dropdown-menu dropdown-menu-end shadow p-2 p-xl-3 rounded-4">
//             <div className="bg-body p-3 rounded-3">
//                 <h4 className="mb-1 title-font text-gradient">Super Admin</h4>
//                 <p className="small text-muted">superadmin@gmail.com</p>
//                 <input type="text" className="form-control form-control-sm" placeholder="Update my status" />
//             </div>
//             <ul className="list-unstyled mt-3">
//                 <li><Link as='a' className="dropdown-item rounded-pill" aria-label="my profile" to="/my-profile">My Profile</Link></li>
//                 <li><Link as='a' className="dropdown-item rounded-pill" aria-label="common settings" to="/common-settings">Common Settings</Link></li>
//                 <li><Link as='a' className="dropdown-item rounded-pill" aria-label="account settings" to="/accounts-setting">Settings</Link></li>
//             </ul>
//             <Link as='a' className="btn py-2 btn-primary w-100 mt-3 rounded-pill" to="/signin" role="button">Logout</Link>
//             <div className="mt-3 text-center small">
//                 <a className="text-muted me-1" href="#">Privacy policy</a>•<a className="text-muted mx-1" href="#">Terms</a>•<a className="text-muted ms-1" href="#">Cookies</a>
//             </div>
//         </div>
//     )
// }

// export default UserDropdown


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here, for example:
    // Clear local storage
    localStorage.clear();
    // Clear session storage
    sessionStorage.clear();
    // Navigate to signin page
    navigate('/signin');
  };

  return (
    <div 
      className="dropdown-menu dropdown-menu-end shadow p-2 p-xl-3 rounded-4"
      aria-labelledby="userDropdown" // This matches the id in the trigger button
    >
      <div className="bg-body p-3 rounded-3">
        <h4 className="mb-1 title-font text-gradient">Super Admin</h4>
        <p className="small text-muted">superadmin@gmail.com</p>
        <input type="text" className="form-control form-control-sm" placeholder="Update my status" />
      </div>
      <ul className="list-unstyled mt-3">
        <li>
          <Link className="dropdown-item rounded-pill" to="/my-profile">
            My Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item rounded-pill" to="/common-settings">
            Common Settings
          </Link>
        </li>
        <li>
          <Link className="dropdown-item rounded-pill" to="/accounts-setting">
            Settings
          </Link>
        </li>
      </ul>
      <button 
        onClick={handleLogout}
        className="btn py-2 btn-primary w-100 mt-3 rounded-pill"
      >
        Logout
      </button>
      <div className="mt-3 text-center small">
        <a className="text-muted me-1" href="#">Privacy policy</a>•
        <a className="text-muted mx-1" href="#">Terms</a>•
        <a className="text-muted ms-1" href="#">Cookies</a>
      </div>
    </div>
  );
};

export default UserDropdown;