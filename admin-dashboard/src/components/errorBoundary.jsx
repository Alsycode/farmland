// path: src/components/ErrorBoundary.jsx
import React from 'react';

/**
 * Minimal ErrorBoundary - catches render errors and displays fallback UI
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, err: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, err: error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <div className="mb-4 text-sm text-gray-600">{this.state.err?.message}</div>
          <button onClick={() => window.location.reload()} className="px-3 py-1 bg-indigo-600 text-white rounded">Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}
