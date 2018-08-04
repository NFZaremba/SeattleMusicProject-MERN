import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "../../common/TextField";
import TextAreaField from "../../common/TextAreaField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBand } from "../../../actions/profileActions";

class AddBand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      from: "",
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
    const bandData = {
      name: this.state.name,
      genre: this.state.genre,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addBand(bandData, this.props.callBack());
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
    // destructoring
    const { errors } = this.state;
    return (
      <div className="add-band">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Band (optional)</h1>
              <p className="lead text-center">
                Add your Band info if you are in one!
              </p>
              <small className="d-block pb-3">* + required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="*Name of Band"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextField
                  placeholder="* Genre"
                  name="genre"
                  value={this.state.genre}
                  onChange={this.onChange}
                  error={errors.genre}
                />
                <h6>From Date</h6>
                <TextField
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextField
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <TextAreaField
                  placeholder="Band Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about yout band"
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

AddBand.propTypes = {
  addBand: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBand }
)(AddBand);
