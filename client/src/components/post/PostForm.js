import React, {
  Component
} from "react";
import PropTypes from "prop-types";
import {
  connect
} from "react-redux";
import TextAreaField from "../common/TextAreaField";
import {
  addPost
} from "../../actions/postActions";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  componentWillReceiveProps() {
    if (newProps.errors) {
      this.setState((prevState, props) => ({
        errors: newProps.errors
      }));
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      user
    } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name
    }
  }

  render() {
    return ( <
      div className = "post-form mb-3" >
      <
      div className = "card card-info" >
      <
      div className = "card-header bg-info text-white" > Say Somthing... < /div> <
      div className = "card-body" >
      <
      form onSubmit = {
        this.onSubmit
      } >
      <
      div className = "form-group" >
      <
      TextAreaFieldGroup placeholder = "Create a post"
      name = "text"
      value = {
        this.state.text
      }
      onChange = {
        this.onChange
      }
      error = {
        errors.text
      }
      /> <
      /div> <
      button type = "submit"
      className = "btn btn-dark" >
      Submit <
      /button> <
      /form> <
      /div> <
      /div> <
      /div>
    );
  }
}