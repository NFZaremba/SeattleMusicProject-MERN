import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Header from "./Header";
import About from "./About";
import Music from "./Music";
import Loading from "../common/Loading";
import { getProfileByHandle } from "../../actions/profileActions";
import SideNav from "../common/SideNav";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      console.log(this.props);
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/notfound");
    }
  }

  render() {
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

    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Loading />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          {/* passing profile to components so we can use props */}
          <Header profile={profile} />
          <About profile={profile} />
          <Music favoritemusic={profile.favoritemusic} band={profile.band} />
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="col-md-2" style={styles.navBar}>
          <SideNav />
        </div>

        <div className="row">
          <div className="col-md-10" style={styles.dashboardContent}>
            {profileContent}
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
