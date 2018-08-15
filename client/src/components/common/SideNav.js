import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

import { Icon, Menu, Sidebar } from "semantic-ui-react";

class SideNav extends Component {
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
    return (
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible
          width="thin"
        >
          <Menu.Item as="a">
            <Link to="/artist">
              <Icon name="user circle" size="big" />
              <div>Events</div>
            </Link>
          </Menu.Item>
          <Menu.Item as="a">
            <Link to="/events">
              <Icon name="calendar alternate outline" size="big" />
              <div>Events</div>
            </Link>
          </Menu.Item>
          <Menu.Item as="a">
            <Link to="/profiles">
              <Icon name="address book" size="big" />
              <div>Profiles</div>
            </Link>
          </Menu.Item>
          <Menu.Item as="a">
            <Link to="/feed">
              <Icon name="comment alternate" size="big" />
              <div>Post Feed</div>
            </Link>
          </Menu.Item>
          <Menu.Item as="a">
            <Link to="/dashboard">
              <Icon name="home" size="big" />
              <div>Dashboard</div>
            </Link>
          </Menu.Item>
          <Menu.Item as="a" onClick={this.onLogoutClick.bind(this)}>
            <Icon name="log out" />
            Logout
          </Menu.Item>
        </Sidebar>
      </Sidebar.Pushable>
    );
  }
}

SideNav.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutUser, clearCurrentProfile }
)(withRouter(SideNav));
