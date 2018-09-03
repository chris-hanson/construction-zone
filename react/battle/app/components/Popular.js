const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');

function SelectLangugage(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(lang => {
        return (
          <li 
            style={lang === props.selected ? { textDecoration: 'underline' } : null }
            onClick={() => props.update(lang)}
            key={lang}>{lang}
          </li>
        )
      })}
    </ul>
  );
}

SelectLangugage.propTypes = {
  selected: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired
}


function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => {
        return (
          <li className="popular-item" key={repo.name}>
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img src={repo.owner.avatar_url} className="avatar"/>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count}</li>
            </ul>
          </li>
        );
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};



class Popular extends React.Component {
  constructor(props) {
    super();

    this.state = {
      selected: 'All',
      repos: null
    };

    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update(this.state.selected)
  }

  update(lang) {
    this.setState(() => {
      return {
        selected: lang,
        repos: null
      };
    });

    api.fetchPopularRepos(lang).then(repos => this.setState({ repos }));
  }

  render() {
    return (
      <div>
        <SelectLangugage
          selected={this.state.selected} 
          update={this.update}/>

        { 
          this.state.repos 
            ? <RepoGrid repos={this.state.repos} /> 
            : <p>Loading..</p>
        }
      </div>
    )
  }
}

module.exports = Popular;