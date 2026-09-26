import React from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaChartBar, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

function Navigation({ authUser, onLogout }) {
  return (
    <header className="app-header">
      <div className="app-header__container">
        <h1 className="app-header__brand">
          <Link to="/">DICODING FORUM APP</Link>
        </h1>

        <nav className="app-nav">
          <Link to="/" className="app-nav__link">
            <FaComments />
            <span>Threads</span>
          </Link>
          <Link to="/leaderboards" className="app-nav__link">
            <FaChartBar />
            <span>Leaderboards</span>
          </Link>
        </nav>

        <div className="app-auth">
          {authUser ? (
            <div className="app-auth__user">
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="app-auth__avatar"
              />
              <span className="app-auth__name">{authUser.name}</span>
              <button
                type="button"
                className="btn-logout"
                onClick={onLogout}
                title="Keluar"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link to="/login" className="app-auth__login-btn">
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navigation;