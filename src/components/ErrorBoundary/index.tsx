import React from 'react';
import styles from './ErrorBoundary.module.scss';

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<object>,
  {
    hasError: boolean;
    error: null | { message: string };
  }
> {
  constructor(props: object) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error: { message: string }) {
    console.error('ErrorBoundary caught an error:', error.message);
    this.setState({ hasError: true, error: error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
