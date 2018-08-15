import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PostItem from "../post/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Loading from "../common/Loading";
import { getPost } from "../../actions/postActions";
