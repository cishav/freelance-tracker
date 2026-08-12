// Import Component - the OLD, pre-hooks way of building React components.
// Error Boundaries are the one case where React still requires this style.
import { Component } from "react";

// "class ErrorBoundary extends Component" means:
// this component INHERITS special class-component abilities from React
// (like this.state, and the two error-catching methods used below).
class ErrorBoundary extends Component {

  // constructor runs ONCE, when this component is first created.
  // It's the class-component equivalent of setting up useState at the top
  // of a function component.
  constructor(props) {
    // super(props) is required boilerplate — hands props up to React's
    // built-in Component class so it can set things up internally.
    super(props);

    // this.state holds ALL state for a class component in one object.
    // hasError starts as false — meaning "no error has occurred yet".
    this.state = { hasError: false };
  }

  // A SPECIAL method with a required exact name.
  // React automatically calls this whenever a CHILD of this ErrorBoundary
  // throws an error DURING RENDERING.
  // Its job: return what the new state should become.
  static getDerivedStateFromError(error) {
    // Tell React: "update state so hasError becomes true".
    return { hasError: true };
  }

  // Another SPECIAL method React automatically calls after catching an error.
  // Used for SIDE EFFECTS (like logging) — not for updating state.
  componentDidCatch(error, errorInfo) {
    // Print the real error to the console, so YOU can still debug it,
    // even though the user only sees the friendly fallback message.
    console.error("Error caught by boundary:", error, errorInfo);
  }

  // Every class component MUST have a render() method.
  // This is the class-component equivalent of "return (...)" in a
  // function component — it decides what actually shows on screen.
  render() {
    // If an error was caught (hasError is true)...
    if (this.state.hasError) {
      // ...show a friendly fallback message instead of crashing.
      return (
        <div className="client-card">
          <p>Something went wrong. Please refresh the page.</p>
        </div>
      );
    }

    // If no error occurred, just render whatever was placed INSIDE
    // <ErrorBoundary>...</ErrorBoundary> normally, unchanged.
    // this.props.children works exactly like {children} in Context Providers.
    return this.props.children;
  }
}

// Export so it can be imported and used to wrap other components in App.jsx.
export default ErrorBoundary;