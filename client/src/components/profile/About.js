import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/IsEmpty";

class ProfileAbout extends Component {
  render() {
    console.log(this.props);
    const { profile } = this.props;

    // Skill list
    const instruments = profile.instruments.map((instrument, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check">{instrument}</i>
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center">
              {profile.user.firstName}
              's Bio
            </h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{profile.firstName} does not have a bio.</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center">Instrument Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {instruments}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
