import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";

import { Icon } from "semantic-ui-react";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, user } = this.props;
    console.log(this.props);

    return (
      <div className="card card-body mb-3 commentCard">
        <div className="row">
          <div className="col-md-2">
            <p>
              {comment.firstName} {comment.lastName}
            </p>
            <Icon size="huge" name="user circle" />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === user.user.id ? (
              <button
                style={{ float: "right" }}
                type="button"
                className="btn btn-danger mr-1"
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
