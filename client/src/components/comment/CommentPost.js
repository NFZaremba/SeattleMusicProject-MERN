import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PostItem from "../post/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Loading from "../common/Loading";
import { getPost } from "../../actions/postActions";
import SideNav from "../common/SideNav";

class CommentPost extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Loading />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    const styles = {
      navBar: {
        paddingLeft: "0",
        float: "left",
        height: "160vh"
      },
      content: {
        marginTop: "20px"
      }
    };

    return (
      <div className="commentPost">
        <div className="col-md-2" style={styles.navBar}>
          <SideNav />
        </div>
        <div className="row">
          <div className="col-md-10" style={styles.content}>
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

CommentPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(CommentPost);
