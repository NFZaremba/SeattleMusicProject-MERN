import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Login from "../users/Login";

class Landing extends Component {
  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    // // if there are errors from incoming props, then set errors to the states
    if (nextProps.user.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Seattle Music</h1>
                <p className="lead">
                  Create a profile/portfolio, share posts, music and connect
                  with others who share the same passion.
                </p>
                <hr />
                <Login />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Landing);
