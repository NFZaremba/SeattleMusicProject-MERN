import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Loading from "../common/Loading";
import { getPosts } from "../../actions/postActions";
