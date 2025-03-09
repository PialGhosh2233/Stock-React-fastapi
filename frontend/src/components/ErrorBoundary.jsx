import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      this.setState({ error, errorInfo });
      console.error('Error occurred:', error);
      console.error('Error info:', errorInfo); 
    }
  
    render() {
      if (this.state.hasError) {
        return <h2>Something went wrong. Check the console for more details.</h2>;
      }
  
      return this.props.children;
    }
  }

export default ErrorBoundary; // Default export
