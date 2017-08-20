var React = require('react');
var PropTypes = require('prop-types');
var api = require("../utils/api")
var Loading = require("./Loading");

function RepoGrid(props) {
	return(
		<ul className="popular-list">
			{props.repos.map(function(repo, index) {
				return(
					<li key={repo.name} className="popular-item">
						<div className="popular-rank">#{index + 1}</div>
						<ul className="space-list-items">
							<li>
								<img 
									className="avatar" 
									src={repo.owner.avatar_url}
									alt={repo.owner.login + " Avatar"}
								/>
							</li>
							<li><a href={repo.html_url}>{repo.name}</a></li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} stars</li>
						</ul>
					</li>
				)
			})}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

function SelectLanguage(props) {
	var languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

	return(
		<ul className="languages">
			{languages.map(function(language) {
				return (
					<li 
					className={language == props.selectedLanguage ? "selected" : null}
					onClick={props.onSelect.bind(this, language)} 
					key={language}>
						{language}
					</li>
				)
			})}
		</ul>
	)
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
	constructor(props) {
		super();
		this.state = {
			selectedLanguage: "All",
			repos: null
		}
		this.updateLanguage = this.updateLanguage.bind(this)
	}
	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage)
	}
	updateLanguage(language) {
		this.setState(function() {
			return {
				selectedLanguage: language,
				repos: null
			}
		})

		api.fetchPopularRepos(language).then(function(repos) {
			this.setState(function() {
				return {
					repos: repos
				}
			})
		}.bind(this))
	}
	render() {
		return(
			<div>
				<SelectLanguage 
					selectedLanguage = {this.state.selectedLanguage}
					onSelect = {this.updateLanguage}
				/>
				{!this.state.repos
					? <Loading />
					: <RepoGrid repos={this.state.repos} />
				}
			</div>
		)
	}
}

module.exports = Popular;