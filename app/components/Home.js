var React = require('react');
var Link = require('react-router-dom').Link;

function Home() {
	return(
		<div className="home-container">
			<h1 className="bottom-buffer">Welcome to Github Battle</h1>
			<p>View the most popular repos on github or go head to head aginst another github user to see who is victoriouis!</p>

			<p className="small">
				Thanks to <a target="_blank" href="https://twitter.com/tylermcginnis">@tylermcginnis</a> for the tutorial!
			</p>

			<Link className="button top-buffer" to="/battle">Let's Go!</Link>
		</div>
	)
}

module.exports = Home;