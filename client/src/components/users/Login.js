import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser, registerUser, fbLogin } from "../../actions/authActions";
import InputField from "../common/InputField";
import FacebookLogin from "./FacebookLogin";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      loginForm: true,
      registerSuccess: false
      //recaptchaResponse: "",
      //captchaShow: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
    this.postRegister = this.postRegister.bind(this);
    this.onSubmitRegister_Success = this.onSubmitRegister_Success.bind(this);
    this.onFacebookSignin = this.onFacebookSignin.bind(this);
    //this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState((prevState, props) => ({
        errors: nextProps.errors
      }));
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //   onChange(value) {
  //     this.setState((prevState, props) => ({
  //       ...this.state,
  //       recaptchaResponse: value
  //     }));
  //   }

  onSubmitLogin(evt) {
    evt.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    // Dispatch login User
    this.props.loginUser(userData, this.props.history);
  }

  onSubmitRegister(evt) {
    evt.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // Dispatch registered User
    this.props.registerUser(newUser, this.onSubmitRegister_Success);
  }

  onSubmitRegister_Success() {
    this.setState(
      (prevState, props) => ({
        ...this.state,
        registerSuccess: true
      }),
      this.refreshForm
    );
  }

  postRegister() {
    //this.props.history.push("/");
    this.setState(
      (prevState, props) => ({
        ...this.state,
        loginForm: true
      }),
      this.refreshForm
    );
  }

  refreshForm() {
    this.setState((prevState, props) => ({
      ...this.state,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      loginError: false
      //captchaShow: true
    }));
  }

  onGoogleSignIn(googleUser) {
    this.props.thirdparty(googleUser);
  }

  onFacebookSignin(fbUser) {
    console.log(fbUser);
    this.props.fbLogin(fbUser);
  }

  render() {
    const {
      errors,
      firstName,
      lastName,
      email,
      password,
      password2,
      loginForm,
      registerSuccess
    } = this.state;

    let loginContent;

    if (!registerSuccess) {
      loginContent = (
        <div
          className="col-md-6 offset-3"
          style={{
            background: "rgba(0,0,0,0.5)",
            paddingTop: "15px",
            paddingBottom: "15px"
          }}
        >
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
                onClick={() =>
                  this.setState(
                    (prevState, props) => ({
                      ...this.state,
                      loginForm: true
                    }),
                    this.refreshForm
                  )
                }
                style={{ color: "white" }}
              >
                Sign in
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                onClick={() =>
                  this.setState(
                    (prevState, props) => ({
                      ...this.state,
                      loginForm: false
                    }),
                    this.refreshForm
                  )
                }
                style={{ color: "white" }}
              >
                Create Account
              </a>
            </li>
          </ul>
          <form className=" rounded g-px-0 g-py-0">
            <div id="signin">
              {!loginForm ? (
                <div className="g-mb-20">
                  <InputField
                    type="text"
                    name="firstName"
                    icon="fa fa-user"
                    placeholder="First Name"
                    value={firstName}
                    onChange={this.handleChange}
                    error={errors.firstName}
                  />
                  <br />
                </div>
              ) : null}
              {!loginForm ? (
                <div className="g-mb-20">
                  <InputField
                    type="text"
                    name="lastName"
                    icon="fa fa-user"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={this.handleChange}
                    error={errors.lastName}
                  />
                  <br />
                </div>
              ) : null}
              <div className="g-mb-20">
                <InputField
                  type="text"
                  name="email"
                  icon="fa fa-envelope"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange}
                  error={errors.email}
                />
                <br />
              </div>
              <div className="g-mb-20">
                <InputField
                  type="password"
                  name="password"
                  icon="fa fa-lock"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                  error={errors.password}
                />
                <br />
              </div>
              {!loginForm ? (
                <div className="g-mb-10">
                  <InputField
                    type="password"
                    name="password2"
                    icon="fa fa-lock"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={this.handleChange}
                    error={errors.password2}
                  />
                  <br />
                </div>
              ) : null}
              {/* <div>
                    {!captchaShow && (
                      <ReCAPTCHA
                        ref="recaptcha"
                        sitekey="6Ld5VFsUAAAAAPqG-lnAhfOqf5pTSYl0PKEKJcPo"
                        onChange={this.onChange.bind(this)}
                      />
                    )}
                  </div> */}
              <div style={{ paddingBottom: "10px" }}>
                {loginForm ? (
                  <button
                    type="button"
                    className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-font-size-default rounded g-px-25 g-py-7"
                    style={{
                      width: "100%",
                      backgroundColor: "#007bff",
                      color: "white"
                    }}
                    onClick={this.onSubmitLogin}
                  >
                    Sign in
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-font-size-default rounded g-px-25 g-py-7"
                    style={{
                      width: "100%",
                      backgroundColor: "#007bff",
                      color: "white"
                    }}
                    onClick={this.onSubmitRegister}
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          </form>

          <div style={{ color: "white" }} className="hr-sect color">
            OR
          </div>

          {/* THIRD PARTY LOGINS */}
          <div style={{ paddingBottom: "10px" }}>
            {/* <div style={{ paddingBottom: "10px" }}>
                  <LinkedInSignIn />
                </div>
                <div style={{ paddingBottom: "10px" }}>
                  <GoogleSignIn
                    style={{ display: "inline-block" }}
                    clientId="450768390969-rc5n2m9miqvd9s4m7rlgcp8jepoefvpp"
                    onSuccess={this.onGoogleSignIn}
                    width="510"
                  />
                </div> */}
            <div style={{ paddingBottom: "10px" }}>
              <FacebookLogin onSuccess={this.onFacebookSignin} />
            </div>
          </div>
        </div>
      );
    } else {
      loginContent = (
        <div className="alert alert-primary" role="alert">
          <h2>Thanks for registering! Please log in.</h2>

          <button
            type="button"
            className="btn btn-info"
            onClick={() => {
              this.setState({
                ...this.state,
                registerSuccess: false,
                loginForm: true
              });
            }}
          >
            Okay
          </button>
        </div>
      );
    }

    return (
      <div className="g-bg-img-hero g-bg-pos-top-center">
        <div className="container g-pt-100 g-pb-100 g-pb-130--lg">
          <div className="g-pos-rel">{loginContent}</div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  fbLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { loginUser, registerUser, fbLogin }
)(withRouter(Login));
