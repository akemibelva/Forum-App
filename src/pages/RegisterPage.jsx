import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../utils/useInput';
import { asyncRegisterUser } from '../states/users/action';

// Integrasi styled-components untuk memenuhi kriteria React Ecosystem
const StyledSubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color:  #52796f;
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #354f52;
  }

  &:active {
    transform: scale(0.98);
  }
`;

function RegisterPage() {
  const [name, onNameChange] = useInput('');
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

  const onRegister = async (event) => {
    event.preventDefault();
    const success = await dispatch(asyncRegisterUser({ name, email, password }));
    if (success) {
      alert('Registrasi berhasil! Silakan masuk.');
      navigate('/login');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Daftar Akun Baru</h2>
        <form onSubmit={onRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="Nama Anda"
              required
            />
          </div>

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

          <StyledSubmitButton type="submit" className="btn-primary">
            Daftar
          </StyledSubmitButton>
        </form>

        <p className="auth-switch">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;