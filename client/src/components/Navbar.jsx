import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `nav__link ${isActive ? 'nav__link--active' : ''}`
    }
  >
    {children}
  </NavLink>
);

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="nav">
      <div className="nav__brand">
        <Link to="/">MERN Reliability Toolkit</Link>
      </div>
      <nav className="nav__menu">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/posts">Posts</NavItem>
        {isAuthenticated && <NavItem to="/posts/new">Create Post</NavItem>}
      </nav>
      <div className="nav__auth">
        {isAuthenticated ? (
          <>
            <span className="nav__user">Hi, {user?.username}</span>
            <button type="button" className="btn btn-secondary btn-sm" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavItem to="/login">Login</NavItem>
            <NavItem to="/register">Register</NavItem>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

