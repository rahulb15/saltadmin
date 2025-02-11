import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const Flatpickrc = () => {
    useEffect(() => {
        // Initialize Flatpickr
        const basicPicker = flatpickr('.f-basic', {
          enableTime: true,
          dateFormat: 'Y-m-d H:i',
        });
    
        const hfdPicker = flatpickr('.f-hfd', {
          altInput: true,
          altFormat: 'F j, Y',
          dateFormat: 'Y-m-d',
        });
    
        const dateDisablePicker = flatpickr('.f-date-disable', {
          disable: ['2023-04-24', '2023-05-17', '2025-03-08', new Date(2025, 4, 9)],
          dateFormat: 'Y-m-d',
        });
    
        return () => {
          // Destroy Flatpickr instances when the component unmounts
          basicPicker.destroy();
          hfdPicker.destroy();
          dateDisablePicker.destroy();
        };
      }, []); // Empty dependency array to run this effect only once
     
    const flatpickrCode = `
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.min.css';

    const basicPicker = flatpickr('.f-basic', {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
    });

    return (
    	<input type="text" className="form-control f-basic flatpickr-input" placeholder="Select Date.." readOnly="readonly"/>
    )
  `;
    
  return (
        <div className="content px-xl-5 px-lg-4 px-3 py-3 page-body bg-card">
			<div className="card border-0 bg-transparent">
				<div className="card-body p-0">
                    <div className="row g-xl-4 g-3 mb-4">
                        <div className="col-12">
						    <h4 className="mb-4">Flatpickr</h4>
							<p className="lead">Flatpickr is a lightweight and powerful datetime picker.</p>
                            <div className="rounded-4 " data-lang="html">
                                <pre className='h6 language-html text-primary'><code>{flatpickrCode}</code></pre>
                            </div>
                        </div>
						<div className="col-12">
							<label className="form-label">flatpickr without any config</label>
							<input type="text" className="form-control f-basic flatpickr-input" placeholder="Select Date.." readOnly="readonly"/>
						</div>
						<div className="col-12">
							<h5>Human-friendly Dates</h5>
							<p>altInput hides your original input and creates a new one.</p>
							<p>Upon date selection, the original input will contain a Y-m-d... string, while the altInput will display the date in a more legible, customizable format.</p>
							<p className="mb-4">Enabling this option is highly recommended.</p>
							<label className="form-label">flatpickr without any config</label>
							<input type="text" className="form-control f-hfd flatpickr-input" placeholder="Select Date.." readOnly="readonly"/>
						</div>
						<div className="col-12">
							<h5>Disabling dates</h5>
							<p>If you’d like to make certain dates unavailable for selection, there are multiple methods of doing so.</p>
							<ul>
								<li>Disabling specific date</li>
								<li>Disabling a date range</li>
								<li>Disabling dates using a function</li>
							</ul>
							<p className="mb-5">All of those are possible with the disable option</p>
							<label className="form-label">flatpickr without any config</label>
							<input type="text" className="form-control f-date-disable flatpickr-input" placeholder="Select Date.." readOnly="readonly"/>
						</div>
                    </div>
				</div>
			</div>
		</div>
    )
}

export default Flatpickrc