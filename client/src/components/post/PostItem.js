import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

import { Icon } from "semantic-ui-react";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  likeClick(id) {
    this.props.addLike(id);
  }

  unLikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { user } = this.props;
    if (likes.filter(like => like.user === user.user.id).length > 0) {
      // if user liked post
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, user, showActions } = this.props;

    return (
      <div className="card card-body mb-3 postCard">
        <div className="row">
          <div className="col-md-2">
            <p>
              {post.firstName} {post.lastName}
            </p>
            <Icon size="huge" name="user circle" />
          </div>
          <div className="col-md-10">
            <p className="lead card card-body">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.likeClick.bind(this, post._id)}
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      // if user liked it then turn icon green
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.unLikeClick.bind(this, post._id)}
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {/* if user post is equal to user user id then show delete button */}
                {post.user === user.user.id ? (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={this.onDeleteClick.bind(this, post._id)}
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
