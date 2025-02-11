import React from 'react'
import { Link } from 'react-router-dom'

const PasswordReset = () => {
  return (
        <div className="px-xl-5 px-4 auth-body">
			<form>
				<ul className="row g-3 list-unstyled li_animate">
					<li className="col-12">
						<label className="form-label">Email address</label>
						<input type="email" className="form-control form-control-lg" placeholder="name@example.com"/>
						<small className="text-muted">An email will be sent to the above address with a link to set your new passwaord.</small>
					</li>
					<li className="col-12 my-lg-4">
						<Link className="btn btn-lg w-100 btn-primary text-uppercase mb-2" to="/two-step" title="">SUBMIT</Link>
					</li>
					<li className="col-12 text-center">
						<span className="text-muted"><Link to="/signin">Back to Sign in</Link></span>
					</li>
				</ul>
			</form>
		</div>
    )
}

export default PasswordReset