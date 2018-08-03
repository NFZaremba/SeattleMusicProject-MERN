import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Loading from "../common/Loading";
import ProfileActions from "./ProfileActions";
import { AlertModal } from "../common/Modal";
import Tab from "../common/Tabs";

class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props.user);
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    // destructoring
    const { user } = this.props.user;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Loading />;
    } else {
      // Check if logged in user has profile data
      // if Object.keys of profile is greater than 0, then that means there is a profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}>
                {user.firstName} {user.lastName}
              </Link>
            </p>
            <ProfileActions />

            <div style={{ marginBottom: "60px" }} />
            <button
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#deleteAccount"
              onClick={this.onDeleteClick.bind(this)}
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile and needs to create one
        // *** maybe create a modal for this ***
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome {user.firstName} {user.lastName}
            </p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              <Tab />
              {dashboardContent}
            </div>
          </div>
        </div>
        <AlertModal
          id="deleteAccount"
          title="Delete"
          body="Are you sure you want to delete? There is no turning back."
          dismiss="Cancel"
          action="Delete"
          actionFunction={this.onDeleteClick.bind(this)}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
