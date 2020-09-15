import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
    <Link to="/" className="navbar-brand">
      ExerciseTracker
    </Link>

    <div className="navbar-nav">
      <Link to="/create" className="nav-item nav-link">
        Add Exercise
      </Link>
    </div>
    <div className="navbar-nav">
      <Link to="/user" className="nav-item nav-link">
        Create User
      </Link>
    </div>
  </nav>
);

export default Navbar;
