import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    // Logout of facebook
    // document.addEventListener(
    //   "FBObjectLogout",
    //   window.FB.XFBML.parse(
    //     window.FB.logout(function(response) {
    //       console.log("signed out of facebook");
    //     })
    //   )
    // );

    //clear profile user - set redux state profile to null
    this.props.clearCurrentProfile();
    // logout user
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.user;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/artists">
            Artists
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            {/* <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              title="You must have a Gravitar connected to your email to display an image"
              style={{ width: "25px", marginRight: "5px" }}
            /> */}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Seattle Music
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    Members
                  </Link>
                </li>
              </ul>
              {/* if isAuthenticated then show authLinks, else show guestLinks */}
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(withRouter(Navbar));
