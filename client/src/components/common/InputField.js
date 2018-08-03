import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const LoginInput = ({
  type,
  name,
  value,
  onChange,
  icon,
  placeholder,
  error
}) => {
  return (
    <div className="input-group">
      <span className="input-group-prepend g-width-50 g-brd-secondary-light-v2 g-bg-secondary g-rounded-right-0">
        <div className="input-group-text justify-content-center w-100 g-bg-secondary g-brd-secondary-light-v2">
          <i className={icon} />
        </div>
      </span>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

LoginInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

LoginInput.defaultProps = {
  type: "text"
};

export default LoginInput;
