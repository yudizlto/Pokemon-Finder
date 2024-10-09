import React from "react";

class ErrorBoundary extends React.Component {
  // Initialize state to track if an error has occurred
  state = {
    // Initially, there is no error
    hasError: false,
  };

  // Lifecycle method to update state when an error is caught
  static getDerivedStateFromError(error) {
    // Set hasError to true to indicate an error has occurred
    return { hasError: true };
  }

  // Lifecycle method that is called when an error is thrown
  componentDidCatch(error, info) {
    console.log(error, info);
  }

  // Render method to display content
  render() {
    /**
     * If an error has occurred, render the fallback UI
     * If no error, render the child components
     */

    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
