import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextField from "../common/TextField";
import TextAreaField from "../common/TextAreaField";
import InputField from "../common/InputField";
import SelectListField from "../common/SelectListField";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import IsEmpty from "../../validation/IsEmpty";
import { AlertModal } from "../common/Modal";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      instruments: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.profile.profile) {
      const profile = this.props.profile.profile;
      // take array join it into a string
      const instrumentsArr = profile.instruments.join(",");

      // if profile field doesn't exist, make empty string
      profile.company = !IsEmpty(profile.company) ? profile.company : "";
      profile.website = !IsEmpty(profile.website) ? profile.website : "";
      profile.location = !IsEmpty(profile.location) ? profile.location : "";
      profile.bio = !IsEmpty(profile.bio) ? profile.bio : "";
      profile.social = !IsEmpty(profile.social) ? profile.social : {};
      profile.facebook = !IsEmpty(profile.facebook) ? profile.facebook : "";
      profile.linkedin = !IsEmpty(profile.linkedin) ? profile.linkedin : "";
      profile.youtube = !IsEmpty(profile.youtube) ? profile.youtube : "";
      profile.instagram = !IsEmpty(profile.instagram) ? profile.instagram : "";

      // Set component  fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        instruments: instrumentsArr,
        bio: profile.bio,
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        linkedin: profile.social.linkedin,
        youtube: profile.social.youtube,
        instagram: profile.social.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      instruments: this.state.instruments,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    // toggle(show/hide) Social Network Links
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputField
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputField
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputField
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputField
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputField
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: "* Select Status", value: 0 },
      { label: "Musician", value: "Musician" },
      { label: "Aspiring Musician", value: "Aspiring Musician" },
      { label: "Professional Musician", value: "Professional Musician" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Just Loves Music", value: "Just Loves Music" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="edit-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL, Your full name, company name, nickname"
                />
                <SelectListField
                  placeholder="status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextField
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextField
                  placeholder="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or company one"
                />
                <TextField
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or state"
                />
                <TextField
                  placeholder="Instruments"
                  name="instruments"
                  value={this.state.instruments}
                  onChange={this.onChange}
                  error={errors.instruments}
                  info="Please use comma seprated values (eg. Piano, Guitar, Drums, Flute)"
                />
                <TextAreaField
                  placeholder="Short bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInputs}
                <input
                  className="btn btn-info btn-block mt-4"
                  type="submit"
                  value="submit"
                />
                <AlertModal
                  id="edit"
                  title="Success"
                  body="Profile Edit was a Success!"
                  dismiss="Cancel"
                  action="Okay"
                  buttonType="btn btn-info"
                  actionFunction={this.postRegister}
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
