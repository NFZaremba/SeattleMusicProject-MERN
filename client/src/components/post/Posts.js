import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Loading from "../common/Loading";
import { getPosts } from "../../actions/postActions";
import SideNav from "../common/SideNav";

class Posts extends Component {
  componentDidMount() {
    // Get posts
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;

    let postContent;

    if (posts === null || loading) {
      postContent = <Loading />;
    } else {
      postContent = <PostFeed posts={posts} />;
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
      <div className="feed">
        <div className="col-md-2" style={styles.navBar}>
          <SideNav />
        </div>
        <div className="row">
          <div className="col-md-10" style={styles.content}>
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
