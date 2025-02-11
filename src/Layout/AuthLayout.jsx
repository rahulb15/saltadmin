import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'

import Signin from '../Tuning/Pages/Authentication/Signin';
import Signup from '../Tuning/Pages/Authentication/Signup';
import PasswordReset from '../Tuning/Pages/Authentication/PasswordReset';
import TwoStep from '../Tuning/Pages/Authentication/TwoStep';
import Lockscreen from '../Tuning/Pages/Authentication/Lockscreen';
import Maintenance from '../Tuning/Pages/Authentication/Maintenance';
import NoPageFound from '../Tuning/Pages/Authentication/NoPageFound';

const AuthLayout = () => {

    const location = useLocation();
    const pathname = location.pathname;
 
    const authTitleMapping = {
        "/signin": "Signin",
        "/signup": "Signup",
        "/password-reset": "PasswordReset",
        "/two-step": "TwoStep",
        "/lockscreen": "Lockscreen",
        "/maintenance": "Maintenance",
        "/404": "NoPage",
    };
    const authTitle = authTitleMapping[pathname] || "";

    const authComponents = {
        Signin: <Signin />,
        Signup: <Signup />,
        PasswordReset: <PasswordReset />,
        TwoStep: <TwoStep />,
        Lockscreen: <Lockscreen />,
        Maintenance: <Maintenance />,
        NoPage: <NoPageFound />,
    };

  return (
        <div data-ha="theme-PurpleHeart" className="svgstroke-a auth bg-gradient">  
            <main className="container-fluid px-0">

                {/* <!-- start: project logo --> */}
                <div className="px-xl-5 px-4 auth-header" data-bs-theme="none">
                    <Link to="/index" className="brand-icon text-decoration-none d-flex align-items-center" title="Saltstayz Admin Template">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 8l0 8"></path>
                            <path d="M9 12l6 0"></path>
                            <path d="M15 8l0 8"></path>
                        </svg> */}
                        <span className="fw-bold ps-2 fs-5 text-gradient">Saltstayz</span>
                    </Link>
                </div>

                {/* <!-- start: page body area --> */}
                {authComponents[authTitle]}

                {/* <!-- start: page footer --> */}
                <footer className="px-xl-5 px-4">
                    <p className="mb-0 text-muted">© 2024 <a href="#" target="_blank" title="Saltstayz">Saltstayz</a>, All Rights Reserved.</p>
                </footer>

            </main>
        </div>
    )
}

export default AuthLayout