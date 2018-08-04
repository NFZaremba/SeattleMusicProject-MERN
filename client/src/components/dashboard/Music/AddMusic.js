import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextField from "../../common/TextField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMusic } from "../../../actions/profileActions";

class AddMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: "",
      album: "",
      artist: "",
      genre: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // listen to see if nexProps contain errors
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const musicData = {
      song: this.state.song,
      album: this.state.album,
      artist: this.state.artist,
      genre: this.state.genre,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addMusic(musicData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-music">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Favorite Music</h1>
              <p className="lead text-center">
                Just so we get to know you better!
              </p>
              <small className="d-block pb-3">* + required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="* Favorite song"
                  name="song"
                  value={this.state.song}
                  onChange={this.onChange}
                  error={errors.song}
                />
                <TextField
                  placeholder="*Favroite Album"
                  name="album"
                  value={this.state.album}
                  onChange={this.onChange}
                  error={errors.album}
                />
                <TextField
                  placeholder="Favorite artist"
                  name="artist"
                  value={this.state.artist}
                  onChange={this.onChange}
                  error={errors.artist}
                />
                <TextField
                  placeholder="Favorite Genre"
                  name="genre"
                  value={this.state.genre}
                  onChange={this.onChange}
                  error={errors.genre}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddMusic.propTypes = {
  addMusic: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addMusic }
)(withRouter(AddMusic));
