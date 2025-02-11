import React from 'react'

const Progressbar = () => {

	const progressbarCode = `<div className="progress mb-2">
  <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div className="progress mb-2">
  <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div className="progress mb-2">
  <div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div className="progress mb-2">
  <div className="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div className="progress mb-2">
  <div className="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div>`;

  return (
    <div className="content px-xl-5 px-lg-4 px-3 py-3 page-body bg-card">
			<div className="card-body p-0">
				<h4 className="mb-4">Progress bar</h4>
				<p className="lead">Progress components are built with two HTML elements, some CSS to set the width, and a few attributes. We don’t use <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress">the HTML5 <code>&lt;progress&gt;</code> element</a>, ensuring you can stack progress bars, animate them, and place text labels over them.</p>
				<div className="row g-4">
					<div className="col-12">							
						<ul className="lh-lg mb-5">
							<li>We use the <code>.progress</code> as a wrapper to indicate the max value of the progress bar.</li>
							<li>We use the inner <code>.progress-bar</code> to indicate the progress so far.</li>
							<li>The <code>.progress-bar</code> requires an inline style, utility class, or custom CSS to set their width.</li>
							<li>The <code>.progress-bar</code> also requires some <code>role</code> and <code>aria</code> attributes to make it accessible.</li>
						</ul>
						<div className="rounded-4" data-lang="html">
							<pre className='h6 language-html text-primary'><code>{progressbarCode}</code></pre>
						</div>
					</div>
					<div className="col-12">
						<h6>Basic Example</h6>
						<div className="progress mb-2">
							<div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2">
							<div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2">
							<div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2">
							<div className="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2">
							<div className="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
					<div className="col-12">
						<div className="card">
							<div className="card-footer">
								<h5>Labels</h5>
								<p>Add labels to your progress bars by placing text within the <code>.progress-bar</code>.</p>
								<div className="progress">
									<div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
								</div>
							</div>
							<div className="card-footer">
								<h5>Height</h5>
								<p>We only set a <code>height</code> value on the <code>.progress</code>, so if you change that value the inner <code>.progress-bar</code> will automatically resize accordingly.</p>
								<div className="progress mb-2" style={{height: "1px"}}>
									<div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div className="progress mb-2" style={{height: "8px"}}>
									<div className="progress-bar" role="progressbar" style={{width: "55%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div className="progress mb-2" style={{height: "16p"}}>
									<div className="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div className="progress mb-2" style={{height: "20p"}}>
									<div className="progress-bar" role="progressbar" style={{width: "85%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
							</div>
							<div className="card-footer">
								<h5>Backgrounds</h5>
								<p>Use background utility classes to change the appearance of individual progress bars.</p>
								<div className="progress mb-2">
									<div className="progress-bar bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div className="progress mb-2">
									<div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div className="progress mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div className="progress mb-2">
									<div className="progress-bar bg-danger" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
							</div>
							<div className="card-footer">
								<h5>Striped</h5>
								<p>Add <code>.progress-bar-striped</code> to any <code>.progress-bar</code> to apply a stripe via CSS gradient over the progress bar’s background color.</p>
								<div className="progress mb-2">
									<div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "10%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div className="progress mb-2">
									<div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div className="progress mb-2">
									<div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div className="progress mb-2">
									<div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div className="progress mb-2">
									<div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
							</div>
							<div className="card-footer">
								<h5>Animated stripes</h5>
								<p>The striped gradient can also be animated. Add <code>.progress-bar-animated</code> to <code>.progress-bar</code> to animate the stripes right to left via CSS3 animations.</p>
								<div className="progress">
									<div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}></div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12">
						<h5>Progress bar with bvite Theme color</h5>
						<h6>Basic Example</h6>
						<p>Add class <code>.progress-bar</code> with <code>.bg-primary</code>, <code>.theme-color1</code>,<code>.theme-color2</code>,<code>.theme-color3</code>,<code>.theme-color3</code></p>
						<div className="progress mb-2">
							<div className="progress-bar bg-primary" role="progressbar" style={{width: "25%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2">
							<div className="progress-bar bg-primary" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
						</div>
						<div className="progress mb-2" style={{height: "1px"}}>
							<div className="progress-bar bg-primary" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2" style={{height: "8px"}}>
							<div className="progress-bar bg-primary" role="progressbar" style={{width: "55%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2" style={{height: "16px"}}>
							<div className="progress-bar bg-primary" role="progressbar" style={{width: "75%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2" style={{height: "20px"}}>
							<div className="progress-bar bg-primary" role="progressbar" style={{width: "85%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
					<div className="col-12">
						<h5>Theme Backgrounds color</h5>
						<div className="progress mb-2">
							<div className="progress-bar theme-color1" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2">
							<div className="progress-bar theme-color2" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2">
							<div className="progress-bar theme-color3" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2">
							<div className="progress-bar theme-color4" role="progressbar" style={{width: "63%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2">
							<div className="progress-bar theme-color5" role="progressbar" style={{width: "77%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<div className="progress mb-2">
							<div className="progress-bar theme-color6" role="progressbar" style={{width: "58%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Progressbar