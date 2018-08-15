import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loading from "../common/Loading";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";
import SideNav from "../common/SideNav";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    console.log(this.props);

    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Loading />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
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
      <div className="profiles">
        <div className="col-md-2" style={styles.navBar}>
          <SideNav />
        </div>
        <div className="row">
          <div
            className="col-md-10"
            style={{ overflowY: "auto", fontSize: "14px" }}
          >
            <h1 className="display-4 text-center" style={{ color: "white" }}>
              Seattle Music Member Profiles
            </h1>
            <p className="lead text-center" style={{ color: "white" }}>
              Browse and connect with people who love music
            </p>
            {profileItems}
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
