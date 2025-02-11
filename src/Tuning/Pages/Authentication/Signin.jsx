// import React from 'react'
// import { Link } from 'react-router-dom'

// const Signin = () => {
//   return (
//         <div className="px-xl-5 px-4 auth-body">
//             <form>
//                 <ul className="row g-3 list-unstyled li_animate">
                    
//                     <li className="col-12">
//                         <label className="form-label">Email</label>
//                         <input type="email" className="form-control form-control-lg" placeholder="" defaultValue="admin@Saltstayz.com"/>
//                     </li>
//                     <li className="col-12">
//                         <div className="form-label">
//                             <span className="d-flex justify-content-between align-items-center">
//                                 Password
//                                 <Link className="text-primary" to="/password-reset">Forgot Password?</Link>
//                             </span>
//                         </div>
//                         <input type="password" className="form-control form-control-lg" placeholder="" defaultValue="admin.Saltstayz"/>
//                     </li>
//                     <li className="col-12">
//                         <div className="form-check fs-5">
//                             <input className="form-check-input" type="checkbox" defaultValue="" id="Rememberme"/>
//                             <label className="form-check-label fs-6" htmlFor="Rememberme">Remeber this Device</label>
//                         </div>
//                     </li>
//                     <li className="col-12 my-lg-4">
//                         <Link className="btn btn-lg w-100 btn-primary text-uppercase mb-2" to="/index" title="sign in">SIGN IN</Link>
//                         <a className="btn btn-lg btn-secondary w-100" href="#">
//                             <i className="fa fa-google me-2"></i>
//                             <span> Sign in with Google</span>
//                         </a>
//                     </li>
//                     <li className="col-12 text-center">
//                         <span className="text-muted d-flex d-sm-inline-flex">New to Saltstayz <Link className="ms-2" to="/signup" title="">Sign up here</Link></span>
//                     </li>
//                 </ul>
//             </form>
//         </div>
//     )
// }

// export default Signin


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../services/authApi';
import { setCredentials } from '../../../Redux/reducers/authReducer';

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading, error }] = useLoginMutation();

    const [formData, setFormData] = useState({
        email: 'superadmin@yopmail.com',
        password: 'superadmin',
        rememberDevice: false
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prev => ({
            ...prev,
            [e.target.name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const userData = await login({
                email: formData.email,
                password: formData.password
            }).unwrap();
            console.log('Login successful:', userData);

            dispatch(setCredentials(userData));
            
            if (formData.rememberDevice) {
                localStorage.setItem('rememberDevice', 'true');
            }
            
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="px-xl-5 px-4 auth-body">
            <form onSubmit={handleSubmit}>
                <ul className="row g-3 list-unstyled li_animate">
                    <li className="col-12">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            className="form-control form-control-lg" 
                            placeholder="Enter your email" 
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </li>
                    <li className="col-12">
                        <div className="form-label">
                            <span className="d-flex justify-content-between align-items-center">
                                Password
                                <Link className="text-primary" to="/password-reset">Forgot Password?</Link>
                            </span>
                        </div>
                        <input 
                            type="password" 
                            name="password"
                            className="form-control form-control-lg" 
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </li>
                    <li className="col-12">
                        <div className="form-check fs-5">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                name="rememberDevice"
                                id="Rememberme"
                                checked={formData.rememberDevice}
                                onChange={handleChange}
                            />
                            <label className="form-check-label fs-6" htmlFor="Rememberme">
                                Remember this Device
                            </label>
                        </div>
                    </li>
                    
                    {error && (
                        <li className="col-12">
                            <div className="alert alert-danger">
                                {error?.data?.message || 'Login failed. Please try again.'}
                            </div>
                        </li>
                    )}
                    
                    <li className="col-12 my-lg-4">
                        <button 
                            type="submit"
                            className={`btn btn-lg w-100 btn-primary text-uppercase mb-2 ${isLoading ? 'disabled' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span>
                                    <i className="fa fa-spinner fa-spin me-2"></i>
                                    Signing in...
                                </span>
                            ) : 'SIGN IN'}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-lg btn-secondary w-100"
                            onClick={() => console.log('Google Sign In')} // Implement Google sign in
                        >
                            <i className="fa fa-google me-2"></i>
                            <span>Sign in with Google</span>
                        </button>
                    </li>
                    <li className="col-12 text-center">
                        <span className="text-muted d-flex justify-content-center align-items-center gap-2">
                            New to Saltstayz 
                            <Link className="text-primary" to="/signup">
                                Sign up here
                            </Link>
                        </span>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default Signin;