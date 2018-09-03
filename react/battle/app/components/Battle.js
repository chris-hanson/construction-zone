const React = require('react');
const Link = require('react-router-dom').Link;
const PropTypes = require('prop-types');


class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.persist();

    this.setState(() => {
      return { username: event.target.value };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <input
          type="text"
          id={this.props.id}
          placeholder="enter github username"
          value={this.state.username}
          onChange={this.handleChange} />
        <button className="button" type="submit" disabled={!this.state.username}>Submit</button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};


class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(() => {
      return {
        [id + 'Name']: username,
        [id + 'Image']: `https://github.com/${username}.png?size=20`
      }
    });
  }

  render() {
    const {playerOneName, playerTwoName} = this.state;

    return (
      <div className="row">
        {!playerOneName && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmit} />}
        {!playerTwoName && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit} />}
      </div>
    )
  }
}


module.exports = Battle;