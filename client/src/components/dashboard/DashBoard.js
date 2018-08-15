import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Loading from "../common/Loading";
import ProfileActions from "./ProfileActions";
import { AlertModal } from "../common/Modal";
import Tab from "../common/Tabs";
import IsEmpty from "../../validation/IsEmpty";
import SideNav from "../common/SideNav";

class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    e.preventDefault();
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
      if (Object.keys(profile).length > 0 || !IsEmpty(profile)) {
        dashboardContent = (
          <div>
            <h1 className="dashboardFont display-4">
              Dashboard{" "}
              <span className="lead text-muted">
                Welcome{" "}
                <Link to={`/profile/${profile.handle}`}>
                  {user.firstName} {user.lastName}
                </Link>
              </span>
            </h1>
            <button
              style={{ marginBottom: "10px" }}
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#deleteAccount"
            >
              Delete My Account
            </button>
            <Tab profile={profile} />
          </div>
        );
      } else {
        // User is logged in but has no profile and needs to create one
        dashboardContent = (
          <div>
            <h1 className="dashboardFont display-4">Dashboard</h1>
            <p className="lead text-muted">
              Welcome {user.firstName} {user.lastName}
            </p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/createWizard" className="btn btn-lg btn-info">
              Create profile
            </Link>
          </div>
        );
      }
    }

    const styles = {
      navBar: {
        paddingLeft: "0",
        float: "left",
        height: "160vh"
      },
      dashboardContent: {
        paddingTop: "20px",
        paddingRight: "20px",
        float: "right"
      }
    };

    return (
      <div className="dashboard">
        <div className="col-md-2" style={styles.navBar}>
          <SideNav />
        </div>
        <div className="row">
          <div className="col-md-10" style={styles.dashboardContent}>
            <div className="test">{dashboardContent}</div>
          </div>
        </div>

        <AlertModal
          id="deleteAccount"
          title="Delete"
          body="Are you sure you want to delete? There is no turning back."
          dismiss="Cancel"
          action="Delete"
          buttonType="btn btn-danger"
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
