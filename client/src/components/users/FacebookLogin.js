import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../../node_modules/bootstrap-social";

class FacebookLogin extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount(props) {
    console.log(this.props);
    //facebook signin button render
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: 203729840294201,
        cookie: false, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: "v2.8" // use version 2.1
      });
    }.bind(this);

    // Broadcast an event when FB object is ready
    var fbInitEvent = new Event("FBObjectLogout");
    document.dispatchEvent(fbInitEvent);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=405042343330637&autoLogAppEvents=1";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  facebookLogin(response) {
    let fullName = response.name.split(" ");
    let firstName = fullName[0];
    let lastName = fullName[fullName.length - 1];

    let fbObject = {
      accountId: this.props.accountId,
      firstName: firstName,
      lastName: lastName,
      password: response.id,
      password2: response.id,
      email: response.email
      //location: response.picture.data.url
    };
    this.props.onSuccess(fbObject);
  }

  handleLogin() {
    // facbook login method
    window.FB.login(
      function(response) {
        if (response.status === "connected") {
          // connect to facebookk api
          window.FB.api(
            "/me",
            "GET",
            { fields: "id,name,email,picture" },
            function(response) {
              this.facebookLogin(response);
            }.bind(this)
          );
        } else {
          console.log("User is not connected to Facebook");
        }
      }.bind(this),
      { scope: "public_profile,email", return_scopes: true }
    );
  }

  render() {
    const { scope, width } = this.props;

    return (
      <div id="fb-root">
        <button
          type="button"
          className="btn btn-block btn-social btn-facebook"
          data-width={width}
          data-max-rows="1"
          data-size="large"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="false"
          data-scope={scope}
          onClick={this.handleLogin}
        >
          <i className="fab fa-facebook-f" /> Sign In with Facebook
        </button>
      </div>
    );
  }
}
FacebookLogin.defaultProps = {
  accountId: "Facebook",
  scope: "public_profile,email",
  width: 250
};

FacebookLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired
};

export default FacebookLogin;
