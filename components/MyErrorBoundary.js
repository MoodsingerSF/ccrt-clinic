import React from "react";
import PropTypes from "prop-types";
import ErrorComponent from "./misc/ErrorComponent";
class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      <ErrorComponent />;
    }

    return this.props.children;
  }
}

MyErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default MyErrorBoundary;
