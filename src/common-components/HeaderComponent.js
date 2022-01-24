import React from 'react';
import { School } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function HeaderComponent({ showUser, showBackBtn }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const onLoginLogoutClick = () => {
    if (showUser) {
      navigate('/login', { state: { name: null } });
    } else if (showBackBtn) {
      navigate('/', { state: { name: 'Pooja Agarwal' } });
    } else {
      navigate('/login');
    }
  };

  const isLoginUrl = window.location.pathname === '/login' || window.location.pathname === '/register';
  return (
    <div className="header-main">
      <div className="university-heading">
        <div className="university-header-section">
          <School className="university-icon" />
          <div className="university-text">University Domain</div>
        </div>
        <div className="user-section">
          <div className="user-name">{state && state.name}</div>
          {!isLoginUrl && (
            <button className="login-logout-btn" onClick={onLoginLogoutClick}>
              {showUser ? 'Logout' : showBackBtn ? 'Back' : 'Log In'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
