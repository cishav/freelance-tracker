import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";

const HomePage = lazy(() => import("./pages/HomePage"));
const AddClientPage = lazy(() => import("./pages/AddClientPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

function App() {
  return (
    <>
      <Header subtitle="Your Client Finder" />
      <nav className="app-nav">
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/add-client">Add Client</Link>
        {" | "}
        <Link to="/about">About</Link>
      </nav>
      <div className="container">
        <Suspense fallback={<p>Loading page...</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-client" element={<AddClientPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;