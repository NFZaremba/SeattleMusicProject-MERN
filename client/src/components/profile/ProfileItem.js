import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/IsEmpty";

import { Icon } from "semantic-ui-react";

class ProfileItem extends Component {
  render() {
    console.log("test");
    const { profile } = this.props;

    return (
      <div className="card card-body bt-light mb-3">
        <div className="row">
          <Icon size="massive" name="user circle" />

          <div className="col-md-2">
            <h3>
              {profile.user.firstName} {profile.user.lastName}
            </h3>
            <p>
              {/* if company is empty show nothing */}
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company} </span>
              )}
            </p>
            <p>
              {/* if profile.location is empty, show nothing */}
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none-block">
            <h4>Instruments</h4>
            <ul className="list-group">
              {profile.instruments.slice(0, 4).map((music, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {music}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4 d-none-block">
            <h4>Favorite Music</h4>
            <ul className="list-group">
              {profile.favoritemusic.map((music, index) => (
                <div key={index}>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    {music.song}
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    {music.album}
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    {music.artist}
                  </li>
                  <li className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    {music.genre}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
