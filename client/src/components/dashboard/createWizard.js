import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Loading from "../common/Loading";
import ProfileActions from "./ProfileActions";
import StepperInfo from "../common/Stepper";
import SideNav from "../common/SideNav";

class CreateWizard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.user;
    const { profile, loading } = this.props.profile;

    let wizardContent;

    // User is logged in but has no profile and needs to create one
    wizardContent = (
      <div>
        <p className="lead text-muted">
          Welcome {user.firstName} {user.lastName}
        </p>
        <StepperInfo profile={profile} />
      </div>
    );

    const styles = {
      navBar: {
        paddingLeft: "0",
        float: "left",
        height: "160vh"
      }
    };

    return (
      <div className="creatWizard">
        <div className="col-md-2" style={styles.navBar}>
          <SideNav />
        </div>
        <div className="row">
          <div className="col-md-12">{wizardContent}</div>
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
