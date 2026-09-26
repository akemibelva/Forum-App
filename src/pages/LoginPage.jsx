import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../utils/useInput';
import { asyncSetAuthUser } from '../states/authuser/action';

// Membuat Styled Component menggunakan styled-components
const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color:  #52796f;
  color: #ffffff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #354f52;
  }
`;

function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Masuk ke Forum</h2>
        <form onSubmit={onLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={onEmailChange}
              placeholder="nama@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="Minimal 6 karakter"
              required
            />
          </div>

          {/* Menggunakan StyledButton dari styled-components */}
          <StyledButton type="submit" className="btn-primary">
            Masuk
          </StyledButton>
        </form>

        <p className="auth-switch">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;