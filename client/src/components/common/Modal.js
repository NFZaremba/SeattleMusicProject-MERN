import React from "react";
import PropTypes from "prop-types";

export const AlertModal = ({
  id,
  title,
  dismiss,
  action,
  actionFunction,
  body,
  buttonType
}) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundColor: "#007bff", color: "white" }}
          >
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ color: "black" }}>
            {body}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              {dismiss}
            </button>
            {action ? (
              <button
                type="button"
                className={buttonType}
                data-dismiss="modal"
                onClick={actionFunction}
              >
                {action}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

AlertModal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dismiss: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};
