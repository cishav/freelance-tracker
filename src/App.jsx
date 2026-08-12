import { lazy, Suspense, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import ToastContext from "./context/ToastContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ThemeContext from "./context/ThemeContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const AddClientPage = lazy(() => import("./pages/AddClientPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ClientDetailPage = lazy(() => import("./pages/ClientDetailPage"));

function App() {
  const { message } = useContext(ToastContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  function handleToggle(){
    toggleTheme();
  }

  return (
    <>
      {message && <div className="toast">{message}</div>}
      <Header subtitle="Your Client Finder" />
      <div className={theme === 'dark' ? 'dark-mode' : '' }>
        <nav className="app-nav">
          <div className="container nav-inner">
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/add-client">Add Client</Link>
              <Link to="/about">About</Link>
            </div>

            <label className="toggle-switch">
              <input type="checkbox" role="switch" checked={theme === 'dark'} onChange={handleToggle}/>
              <span className="slider"></span>
            </label>
          </div>
        </nav>
        <div className="container">
          <ErrorBoundary>
            <Suspense fallback={<p>Loading page...</p>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-client" element={<AddClientPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path='/clients/:addedAt' element={<ClientDetailPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

export default App;