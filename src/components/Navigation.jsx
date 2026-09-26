import React from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaChartBar, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Integrasi styled-components untuk memenuhi kriteria React Ecosystem
const StyledLogoutButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background-color: #ef4444;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;

  &:hover {
    background-color: #dc2626;
  }

  &:active {
    transform: scale(0.97);
  }

  svg {
    margin-left: 2px;
  }
`;

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

              {/* Menggunakan StyledLogoutButton tetapi tetap mempertahankan class .btn-logout untuk Cypress E2E */}
              <StyledLogoutButton
                type="button"
                className="btn-logout"
                onClick={onLogout}
                title="Keluar"
              >
                <FaSignOutAlt />
              </StyledLogoutButton>
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

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;