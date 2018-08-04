import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Loading from "../common/Loading";
import ProfileActions from "./ProfileActions";
import StepperInfo from "../common/Stepper";
import IsEmpty from "../../validation/IsEmpty";

class CreateWizard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    console.log(IsEmpty(this.props.profile));
    // if (!IsEmpty(this.props.profile.profile.favoritemusic)) {
    //   this.props.history.push("/dashboard");
    // }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // if (!IsEmpty(nextProps.profile.profile.favoritemusic)) {
    //   this.props.history.push("/dashboard");
    // }
  }

  render() {
    const { user } = this.props.user;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    // User is logged in but has no profile and needs to create one
    dashboardContent = (
      <div>
        <p className="lead text-muted">
          Welcome {user.firstName} {user.lastName}
        </p>
        <StepperInfo profile={profile} />
      </div>
    );

    return (
      <div className="creatWizard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

CreateWizard.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(CreateWizard);
